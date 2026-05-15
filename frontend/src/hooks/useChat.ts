import { useState } from 'react';
import { aiService } from '../services/ai.service';
import { logger } from '../utils/logger';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      logger.info('INITIATING_ENCRYPTED_TRANSMISSION...');
      
      const { response, mode } = await aiService.chat(content);
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response 
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      if (mode === 'INTELLIGENCE') {
        logger.info('INTELLIGENCE_MODE_ACTIVE');
      }
    } catch (err: any) {
      logger.error('SIGNAL_LOSS_DETECTED', err);
      const errorMessage = err.response?.data?.message || '> AI NETWORK FAILURE\n> RESPONSE CHANNEL INTERRUPTED\n> RETRY REQUIRED';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading, error, setMessages };
};
