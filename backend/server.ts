import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { env } from './config/env';
import { logger } from './utils/logger';
import chatRoutes from './routes/chat.routes';

const app = express();

// Security Middleware
app.use(cors({
  origin: env.FRONTEND_URL,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Tactical System Logger Middleware
app.use((req, res, next) => {
  logger.system(`${req.method} ${req.url} [SIGNAL_RECEIVED]`);
  next();
});

// Routes
app.use('/api/chat', chatRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'NOMINAL', system: 'LAKSH.OS_KERNEL', timestamp: new Date().toISOString() });
});

// Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error("KERNEL_PANIC: SYSTEM_FAILURE", err);
  res.status(500).json({
    status: 'ERROR',
    code: 'KERNEL_PANIC',
    message: '> CRITICAL SYSTEM FAILURE DETECTED\n> REBOOTING RESPONSE CHANNELS'
  });
});

app.listen(env.PORT, () => {
  logger.system(`LAKSH.OS INTELLIGENCE KERNEL ONLINE`);
  logger.system(`ACCESS POINT: http://localhost:${env.PORT}`);
  logger.system(`ENVIRONMENT: ${env.NODE_ENV}`);
});
