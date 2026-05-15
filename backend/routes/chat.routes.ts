import { Router } from 'express';
import { groqService } from '../services/groq.service';
import { chatRateLimiter } from '../middleware/rateLimit.middleware';
import { validateChatRequest } from '../middleware/validation.middleware';
import { logger } from '../utils/logger';

const router = Router();

router.post('/', chatRateLimiter, validateChatRequest, async (req, res) => {
  const { message } = req.body;

  try {
    const response = await groqService.chat(message);
    res.json({ status: 'SUCCESS', response });
  } catch (error) {
    logger.error("CHAT_ROUTE_FAILURE", error);
    res.status(500).json({
      status: 'ERROR',
      code: 'AI_NETWORK_FAILURE',
      message: '> AI NETWORK FAILURE\n> RESPONSE CHANNEL INTERRUPTED\n> RETRY REQUIRED'
    });
  }
});

export default router;
