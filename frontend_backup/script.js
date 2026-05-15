/* ============================================================
   SCRIPT.JS
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

    /* ──────────────────────────────────────
       1. GALAXY CANVAS
    ────────────────────────────────────── */
    const canvas = document.getElementById('galaxy-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, stars = [];

        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', () => { resize(); initStars(); });

        class Star {
            constructor() { this.reset(true); }
            reset(init) {
                this.x  = Math.random() * W;
                this.y  = init ? Math.random() * H : (Math.random() < 0.5 ? 0 : Math.random() * H);
                this.r  = Math.random() * 1.5 + 0.3;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
                this.a  = Math.random() * 0.8 + 0.2;
                this.da = (Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1);
                this.cyan = Math.random() > 0.6;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                this.a += this.da;
                if (this.a <= 0.1 || this.a >= 1) this.da *= -1;
                if (this.x < -5 || this.x > W + 5 || this.y < -5 || this.y > H + 5) this.reset(false);
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = this.cyan
                    ? `rgba(0,242,254,${this.a})`
                    : `rgba(255,255,255,${this.a * 0.75})`;
                ctx.fill();
            }
        }

        // Occasional shooting star
        let shootX, shootY, shootDx, shootDy, shootA = 0;
        let shooting = false;
        function triggerShoot() {
            if (!shooting) {
                shooting = true;
                shootX = Math.random() * W * 0.6;
                shootY = Math.random() * H * 0.4;
                shootDx = 6; shootDy = 3; shootA = 1;
            }
        }
        setInterval(triggerShoot, 4000);

        function initStars() {
            const n = Math.floor((W * H) / 4500);
            stars = Array.from({ length: n }, () => new Star());
        }

        function loop() {
            ctx.clearRect(0, 0, W, H);
            stars.forEach(s => { s.update(); s.draw(); });

            if (shooting) {
                ctx.save();
                ctx.strokeStyle = `rgba(0,242,254,${shootA})`;
                ctx.lineWidth   = 1.8;
                ctx.shadowColor = '#00f2fe';
                ctx.shadowBlur  = 10;
                ctx.beginPath();
                ctx.moveTo(shootX, shootY);
                ctx.lineTo(shootX - 100, shootY - 50);
                ctx.stroke();
                ctx.restore();
                shootX  += shootDx; shootY  += shootDy;
                shootA  -= 0.025;
                if (shootA <= 0 || shootX > W || shootY > H) shooting = false;
            }
            requestAnimationFrame(loop);
        }
        initStars();
        loop();
    }

    /* ──────────────────────────────────────
       2. NAVBAR
    ────────────────────────────────────── */
    const navbar     = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksEl = document.querySelector('.nav-links');
    const backToTop  = document.getElementById('backToTop');
    const navAnchors = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinksEl) {
        menuToggle.addEventListener('click', () => navLinksEl.classList.toggle('active'));
    }
    navAnchors.forEach(a => {
        a.addEventListener('click', () => navLinksEl && navLinksEl.classList.remove('active'));
    });

    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        if (navbar)    navbar.classList.toggle('scrolled', sy > 50);
        if (backToTop) backToTop.style.display = sy > 300 ? 'block' : 'none';

        let current = '';
        document.querySelectorAll('section[id], header[id]').forEach(sec => {
            if (sy >= sec.offsetTop - sec.clientHeight / 3) current = sec.id;
        });
        navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ──────────────────────────────────────
       3. SCROLL REVEAL + SKILL BARS
    ────────────────────────────────────── */
    const revealEls  = document.querySelectorAll('.reveal');
    const skillFills = document.querySelectorAll('.skill-fill');
    let skillsDone   = false;

    function runReveal() {
        const vh = window.innerHeight;
        revealEls.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < vh - 60) el.classList.add('active');
        });

        // Skill bars — trigger when skills section is visible
        if (!skillsDone) {
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                const top = skillsSection.getBoundingClientRect().top;
                if (top < vh - 60) {
                    skillsDone = true;
                    skillFills.forEach(fill => {
                        fill.style.width = fill.dataset.width || '0%';
                    });
                }
            }
        }
    }

    // Run on scroll and immediately after a short paint delay
    window.addEventListener('scroll', runReveal, { passive: true });
    // Double-trigger: once right away, once after first paint
    runReveal();
    requestAnimationFrame(() => { runReveal(); });
    setTimeout(runReveal, 200);

    /* ──────────────────────────────────────
       4. TYPEWRITER
    ────────────────────────────────────── */
    const typedSpan  = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');

    if (typedSpan && cursorSpan) {
        const lines = [
            'A B.Tech CSE Student.',
            'An Aspiring AI/ML Engineer.',
            'A Passionate Developer.',
            'A Creative Problem Solver.'
        ];
        const TYPING  = 95;
        const ERASING = 45;
        const PAUSE   = 2200;
        let li = 0, ci = 0;

        function type() {
            cursorSpan.classList.add('typing');
            if (ci < lines[li].length) {
                typedSpan.textContent += lines[li][ci++];
                setTimeout(type, TYPING);
            } else {
                cursorSpan.classList.remove('typing');
                setTimeout(erase, PAUSE);
            }
        }
        function erase() {
            cursorSpan.classList.add('typing');
            if (ci > 0) {
                typedSpan.textContent = lines[li].substring(0, --ci);
                setTimeout(erase, ERASING);
            } else {
                cursorSpan.classList.remove('typing');
                li = (li + 1) % lines.length;
                setTimeout(type, 500);
            }
        }
        setTimeout(type, 1000);
    }

    /* ──────────────────────────────────────
       5. CHATBOT
    ────────────────────────────────────── */
    const chatToggle    = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chatbot-container');
    const closeChat     = document.getElementById('close-chat');
    const sendChat      = document.getElementById('send-chat');
    const chatInput     = document.getElementById('chat-input');
    const chatMessages  = document.getElementById('chatbot-messages');

    if (chatToggle && chatContainer && closeChat && sendChat && chatInput && chatMessages) {

        chatToggle.addEventListener('click', () => {
            chatContainer.classList.add('show');
            chatToggle.style.display = 'none';
            chatInput.focus();
        });
        closeChat.addEventListener('click', () => {
            chatContainer.classList.remove('show');
            chatToggle.style.display = 'block';
        });

        function addMsg(html, type) {
            const d = document.createElement('div');
            d.className = 'msg ' + type + '-msg';
            d.innerHTML = html;
            chatMessages.appendChild(d);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        const KB = [
            [/\b(who|about|yourself|introduce|laksh)\b/,   'I am <b>Laksh Prajapati</b> — a B.Tech CSE student at LPU (Semester 2), passionate about AI/ML and full-stack web development. 🚀'],
            [/\b(skill|know|language|tech|stack|program)\b/, 'Skills: <b>C++, Java, Python, HTML/CSS, JavaScript, Django, MongoDB</b>, and currently learning Machine Learning. 💻'],
            [/\b(project|build|made|work|glass)\b/,         'Projects: <b>Smart Blind Glasses</b> (obstacle detection with ultrasonic sensors) and this <b>Portfolio Website</b> (liquid glass UI + AI chatbot). 🛠️'],
            [/\b(cert|certificate|course|award|udemy|coursera)\b/, 'Certificates: <b>Machine Learning (Coursera)</b>, <b>Data Structures in C++ (Udemy)</b>, and a Leadership certificate from LPU. 🏆'],
            [/\b(contact|email|phone|reach|call|message)\b/, 'Email: <b>lpispwr@gmail.com</b> | Phone: <b>+91 8958440263</b> — based in Jalandhar, Punjab. 📧'],
            [/\b(where|location|city|state|india|punjab|jalandhar)\b/, 'Based in <b>Jalandhar, Punjab, India</b> — studying at LPU. 📍'],
            [/\b(lpu|university|college|study|lovely)\b/,    'Studying at <b>Lovely Professional University (LPU)</b> — one of India\'s largest private universities. 🎓'],
            [/\b(ai|ml|machine|learn|neural|deep)\b/,        'Deeply interested in <b>AI/ML</b> — building a foundation through coursework, Coursera certifications, and personal projects. 🤖'],
            [/\b(hi|hello|hey|hola|sup|yo)\b/,              'Hello! 👋 Nice to meet you. Ask me about Laksh\'s <i>skills, projects, certificates</i>, or how to <i>contact</i> him!'],
            [/\b(help|what|how|ask|can|query)\b/,           'You can ask me: <i>who is Laksh, skills, projects, certificates, contact info, location, AI/ML</i> 💡'],
        ];

        function getResponse(text) {
            const t = text.toLowerCase();
            for (const [re, ans] of KB) {
                if (re.test(t)) return ans;
            }
            return "🤔 I'm not sure about that! Try asking: <i>skills, projects, contact, certificates, or location</i>.";
        }

        function handleChat() {
            const text = chatInput.value.trim();
            if (!text) return;
            addMsg(text, 'user');
            chatInput.value = '';

            const typing = document.createElement('div');
            typing.className = 'msg bot-msg';
            typing.innerHTML = '&#x2022;&nbsp;&#x2022;&nbsp;&#x2022;';
            chatMessages.appendChild(typing);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                chatMessages.removeChild(typing);
                addMsg(getResponse(text), 'bot');
            }, 750);
        }

        sendChat.addEventListener('click', handleChat);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleChat();
        });
    }

    /* ──────────────────────────────────────
       6. CUSTOM CURSOR (desktop only)
    ────────────────────────────────────── */
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (dot && ring && window.matchMedia('(pointer:fine)').matches) {
        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let rx = mx, ry = my;

        window.addEventListener('mousemove', function(e) {
            mx = e.clientX; my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top  = my + 'px';
        });

        (function animRing() {
            rx += (mx - rx) * 0.13;
            ry += (my - ry) * 0.13;
            ring.style.left = rx + 'px';
            ring.style.top  = ry + 'px';
            requestAnimationFrame(animRing);
        })();

        document.querySelectorAll('a, button, input, textarea, .glassmorphism').forEach(function(el) {
            el.addEventListener('mouseenter', function() { ring.classList.add('hover'); });
            el.addEventListener('mouseleave', function() { ring.classList.remove('hover'); });
        });
    }

    /* ──────────────────────────────────────
       7. CONTACT FORM → BACKEND EMAIL API
    ────────────────────────────────────── */
    const contactForm = document.getElementById('contactForm');
    const sendBtn = document.getElementById('send-btn');

    function toast(message, type) {
        const t = document.createElement('div');
        t.className = 'toast toast-' + (type || 'info');
        t.textContent = message;
        document.body.appendChild(t);
        requestAnimationFrame(() => t.classList.add('show'));
        setTimeout(() => {
            t.classList.remove('show');
            setTimeout(() => t.remove(), 250);
        }, 3200);
    }

    async function postContact(payload) {
        // Local dev backend. If you deploy, change this to your domain.
        const url = 'http://localhost:5000/api/contact';
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) {
            const msg = data && (data.error || (Array.isArray(data.details) ? data.details.join(', ') : 'Request failed'));
            throw new Error(msg || 'Request failed');
        }
        return data;
    }

    if (contactForm && sendBtn) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const payload = {
                name: document.getElementById('contact-name')?.value || '',
                email: document.getElementById('contact-email')?.value || '',
                subject: document.getElementById('contact-subject')?.value || '',
                message: document.getElementById('contact-msg')?.value || ''
            };

            const originalHtml = sendBtn.innerHTML;
            sendBtn.disabled = true;
            sendBtn.classList.add('btn-loading');
            sendBtn.innerHTML = '<span class="btn-spinner" aria-hidden="true"></span> Sending...';

            try {
                await postContact(payload);
                sendBtn.innerHTML = '<i class="fa-solid fa-check"></i>&nbsp; Sent!';
                sendBtn.classList.add('btn-success');
                toast('Message sent to your email.', 'success');
                contactForm.reset();
                setTimeout(() => {
                    sendBtn.classList.remove('btn-success');
                    sendBtn.innerHTML = originalHtml;
                }, 2200);
            } catch (err) {
                sendBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>&nbsp; Failed';
                sendBtn.classList.add('btn-danger');
                toast((err && err.message) ? err.message : 'Failed to send message', 'error');
                setTimeout(() => {
                    sendBtn.classList.remove('btn-danger');
                    sendBtn.innerHTML = originalHtml;
                }, 2600);
            } finally {
                sendBtn.classList.remove('btn-loading');
                sendBtn.disabled = false;
            }
        });
    }

}); // end DOMContentLoaded
