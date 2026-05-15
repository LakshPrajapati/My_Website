import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';

const chatSchema = z.object({
  message: z.string().min(1, "PAYLOAD_EMPTY: MESSAGE_REQUIRED").max(2000, "PAYLOAD_OVERFLOW: MESSAGE_TOO_LONG"),
});

export const validateChatRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    chatSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn("INVALID_PAYLOAD_DETECTED", error.errors);
      return res.status(400).json({
        status: 'ERROR',
        code: 'INVALID_PAYLOAD',
        message: error.errors[0].message
      });
    }
    next(error);
  }
};
