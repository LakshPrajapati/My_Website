import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

const connectionOptions: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 5_000,
  maxPoolSize: 10,
  ...(env.MONGODB_DB_NAME ? { dbName: env.MONGODB_DB_NAME } : {}),
};

mongoose.connection.on('error', (error: unknown) => {
  logger.error('DATABASE_CONNECTION_ERROR', {
    errorType: error instanceof Error ? error.name : 'UnknownError',
  });
});

mongoose.connection.on('disconnected', () => {
  logger.warn('DATABASE_CONNECTION_LOST');
});

export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI, connectionOptions);
    logger.success('DATABASE_CONNECTION_ESTABLISHED');
  } catch (error) {
    logger.error('DATABASE_CONNECTION_FAILED', {
      errorType: error instanceof Error ? error.name : 'UnknownError',
    });
    throw error;
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.disconnect();
  logger.info('DATABASE_CONNECTION_CLOSED');
}
