import http from "node:http";
import { URL } from "node:url";
import crypto from "node:crypto";

function parseDotEnv(dotEnvText) {
  const out = {};
  for (const rawLine of dotEnvText.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

async function loadEnv() {
  // Node doesn't load .env by default; implement a minimal loader (no deps).
  const fs = await import("node:fs/promises");
  try {
    const text = await fs.readFile(new URL("./.env", import.meta.url), "utf8");
    const parsed = parseDotEnv(text);
    for (const [k, v] of Object.entries(parsed)) {
      if (process.env[k] == null) process.env[k] = v;
    }
  } catch {
    // ok if missing (we'll error on required vars later)
  }
}

function json(res, statusCode, data, extraHeaders = {}) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    ...extraHeaders
  });
  res.end(body);
}

function corsHeaders(req) {
  const origin = req.headers.origin || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}

function readJsonBody(req, limitBytes = 50_000) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limitBytes) {
        reject(Object.assign(new Error("Payload too large"), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(Object.assign(new Error("Invalid JSON"), { statusCode: 400 }));
      }
    });
    req.on("error", reject);
  });
}

function normalizeText(s, maxLen) {
  if (typeof s !== "string") return "";
  const t = s.trim().replace(/\s+/g, " ");
  return t.length > maxLen ? t.slice(0, maxLen) : t;
}

function validateContact(payload) {
  const name = normalizeText(payload?.name, 80);
  const email = normalizeText(payload?.email, 160);
  const subject = normalizeText(payload?.subject, 140);
  const message = typeof payload?.message === "string" ? payload.message.trim() : "";

  const errors = [];
  if (!name) errors.push("name is required");
  if (!email) errors.push("email is required");
  if (!subject) errors.push("subject is required");
  if (!message) errors.push("message is required");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
  if (email && !emailOk) errors.push("email is invalid");
  if (message && message.length > 4000) errors.push("message is too long");

  if (errors.length) return { ok: false, errors };
  return { ok: true, data: { name, email, subject, message } };
}

async function sendEmailViaResend({ to, from, apiKey, subject, html, replyTo }) {
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      reply_to: replyTo
    })
  });

  const text = await resp.text();
  if (!resp.ok) {
    throw Object.assign(new Error(`Resend error: ${resp.status} ${text}`), { statusCode: 502 });
  }
  return text;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildContactEmailHtml({ name, email, subject, message }) {
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message).replaceAll("\n", "<br/>")
  };

  return `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
      <h2 style="margin:0 0 12px">New message from your website</h2>
      <p style="margin:0 0 10px"><b>Name:</b> ${safe.name}</p>
      <p style="margin:0 0 10px"><b>Email:</b> ${safe.email}</p>
      <p style="margin:0 0 10px"><b>Subject:</b> ${safe.subject}</p>
      <div style="margin-top:14px;padding:14px;border:1px solid rgba(0,0,0,0.1);border-radius:10px;background:#fafafa">
        ${safe.message}
      </div>
      <p style="margin:14px 0 0;color:#666;font-size:12px">
        Sent from your portfolio contact form.
      </p>
    </div>
  `;
}

await loadEnv();

const PORT = Number(process.env.PORT || 5000);
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const TO_EMAIL = process.env.TO_EMAIL || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "";

const requiredMissing = [];
if (!RESEND_API_KEY) requiredMissing.push("RESEND_API_KEY");
if (!TO_EMAIL) requiredMissing.push("TO_EMAIL");
if (!FROM_EMAIL) requiredMissing.push("FROM_EMAIL");

const RATE = new Map(); // ip -> { count, resetAt }
function rateLimit(ip) {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 6;
  const entry = RATE.get(ip);
  if (!entry || entry.resetAt <= now) {
    RATE.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (entry.count >= max) return { ok: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  entry.count += 1;
  return { ok: true };
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  // Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders(req));
    res.end();
    return;
  }

  if (u.pathname === "/health") {
    json(res, 200, { ok: true }, corsHeaders(req));
    return;
  }

  if (u.pathname === "/api/contact" && req.method === "POST") {
    const ip = req.socket.remoteAddress || "unknown";
    const rl = rateLimit(ip);
    if (!rl.ok) {
      json(res, 429, { ok: false, error: "Too many requests. Try later." }, {
        ...corsHeaders(req),
        "Retry-After": String(rl.retryAfterSec)
      });
      return;
    }

    if (requiredMissing.length) {
      json(res, 500, { ok: false, error: `Backend not configured. Missing: ${requiredMissing.join(", ")}` }, corsHeaders(req));
      return;
    }

    try {
      const payload = await readJsonBody(req);
      const v = validateContact(payload);
      if (!v.ok) {
        json(res, 400, { ok: false, error: "Validation failed", details: v.errors }, corsHeaders(req));
        return;
      }

      const { name, email, subject, message } = v.data;
      const requestId = crypto.randomUUID();

      await sendEmailViaResend({
        apiKey: RESEND_API_KEY,
        to: TO_EMAIL,
        from: FROM_EMAIL,
        replyTo: email,
        subject: `Portfolio: ${subject}`,
        html: buildContactEmailHtml({ name, email, subject, message })
      });

      json(res, 200, { ok: true, requestId }, corsHeaders(req));
    } catch (err) {
      const status = err?.statusCode && Number.isFinite(err.statusCode) ? err.statusCode : 500;
      json(res, status, { ok: false, error: "Failed to send email" }, corsHeaders(req));
    }
    return;
  }

  json(res, 404, { ok: false, error: "Not found" }, corsHeaders(req));
});

server.listen(PORT, () => {
  console.log(`[backend] listening on http://localhost:${PORT}`);
  console.log(`[backend] health: http://localhost:${PORT}/health`);
  console.log(`[backend] contact: POST http://localhost:${PORT}/api/contact`);
});

