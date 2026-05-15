# Backend (Email Sender)

This backend exposes a small API used by the portfolio contact form to send you an email.

## Setup

1. Copy variables into `backend/.env` (or edit it directly).
   - `RESEND_API_KEY`: your Resend API key
   - `TO_EMAIL`: your email (where you receive messages)
   - `FROM_EMAIL`: a verified sender in Resend

## Run

From the project root:

```bash
node backend/server.mjs
```

Health check:

- `GET http://localhost:5000/health`

Send email:

- `POST http://localhost:5000/api/contact`

