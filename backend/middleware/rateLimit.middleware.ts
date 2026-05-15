import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger';

export const chatRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    status: 'ERROR',
    code: 'SIGNAL_RATE_LIMIT_DETECTED',
    message: '> SIGNAL RATE LIMIT DETECTED\n> TEMPORARY ACCESS RESTRICTION ENABLED'
  },
  handler: (req, res, next, options) => {
    logger.warn(`RATE_LIMIT_EXCEEDED: IP ${req.ip}`);
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
