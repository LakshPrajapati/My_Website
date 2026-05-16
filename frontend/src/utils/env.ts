import { z } from 'zod';

const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().min(1),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  VITE_FIREBASE_APP_ID: z.string().min(1),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().optional(),
  VITE_GROQ_API_KEY: z.string().min(1),
  VITE_RECAPTCHA_SITE_KEY: z.string().optional(),
});

// Vite only inlines VITE_* when each key is accessed directly — not via import.meta.env as a whole object.
const rawEnv = {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  VITE_GROQ_API_KEY: import.meta.env.VITE_GROQ_API_KEY,
  VITE_RECAPTCHA_SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
};

const _env = envSchema.safeParse(rawEnv);

if (!_env.success) {
  const formatted = _env.error.format();
  console.error('Critical Error: Invalid or missing environment variables:', formatted);
  
  if (import.meta.env.PROD) {
    console.error('ACTION REQUIRED: Ensure all required VITE_* variables are set in your hosting provider (Vercel, GitHub, Firebase).');
  }
  
  throw new Error('Environment configuration failed. Check console for missing keys.');
}

export const env = _env.data;
