import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import type { Server } from 'node:http';
import { env } from './config/env';
import { connectToDatabase, disconnectFromDatabase } from './config/database';
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

let server: Server | undefined;
let isShuttingDown = false;

async function shutdown(signal: string): Promise<void> {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  logger.info(`SHUTDOWN_SIGNAL_RECEIVED: ${signal}`);

  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server?.close((error) => (error ? reject(error) : resolve()));
      });
    }

    await disconnectFromDatabase();
    logger.success('SERVER_SHUTDOWN_COMPLETE');
  } catch (error) {
    logger.error('SERVER_SHUTDOWN_FAILED', {
      errorType: error instanceof Error ? error.name : 'UnknownError',
    });
    process.exitCode = 1;
  }
}

async function startServer(): Promise<void> {
  await connectToDatabase();

  server = app.listen(env.PORT, () => {
    logger.system('LAKSH.OS INTELLIGENCE KERNEL ONLINE');
    logger.system(`ACCESS POINT: http://localhost:${env.PORT}`);
    logger.system(`ENVIRONMENT: ${env.NODE_ENV}`);
  });
}

process.once('SIGINT', () => {
  void shutdown('SIGINT');
});

process.once('SIGTERM', () => {
  void shutdown('SIGTERM');
});

void startServer().catch((error: unknown) => {
  logger.error('SERVER_STARTUP_FAILED', {
    errorType: error instanceof Error ? error.name : 'UnknownError',
  });
  process.exitCode = 1;
});
