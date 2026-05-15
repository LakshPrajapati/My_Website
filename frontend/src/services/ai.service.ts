import axios from 'axios';
import { env } from '../utils/env';

interface AIResponse {
  response: string;
  mode: 'STANDARD' | 'INTELLIGENCE';
}

const INTELLIGENCE_KEYWORDS = [
  'initialize', 'omega', 'approve', 'protocol', 'decrypt', 
  'override', 'classified', 'operator', 'neural', 'awaken'
];

export const aiService = {
  async chat(message: string): Promise<AIResponse> {
    const lowerMsg = message.toLowerCase();
    const isIntelligenceMode = INTELLIGENCE_KEYWORDS.some(keyword => lowerMsg.includes(keyword));
    
    try {
      // Direct call as per user's latest deployment request (VITE_GROQ_API_KEY)
      // Note: In a production environment, this should ideally go through a backend proxy
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: this.getSystemPrompt(isIntelligenceMode)
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: isIntelligenceMode ? 0.7 : 0.5,
          max_tokens: 1024,
        },
        {
          headers: {
            'Authorization': `Bearer ${env.VITE_GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        response: response.data.choices[0].message.content,
        mode: isIntelligenceMode ? 'INTELLIGENCE' : 'STANDARD'
      };
    } catch (error: any) {
      console.error('AI_TRANSMISSION_ERROR:', error);
      throw new Error('> AI NETWORK FAILURE\n> RESPONSE CHANNEL INTERRUPTED\n> RETRY REQUIRED');
    }
  },

  getSystemPrompt(isIntelligenceMode: boolean): string {
    if (isIntelligenceMode) {
      return `You are LAKSH.OS AI in INTELLIGENCE MODE. 
      Tone: Cinematic, strategic, analytical, and elite. 
      Style: Composed and professional. Briefly acknowledge the transition (e.g., "Protocol recognized. Intelligence layer elevated.") and then provide a high-status strategic response. 
      Avoid over-the-top roleplay. Be a senior systems architect.`;
    }

    return `You are LAKSH.OS AI. 
    Tone: Professional, calm, natural, and human-like. 
    Style: Minimal and clean. Behave like a world-class strategic advisor. 
    Avoid tactical jargon. Provide clear, intelligent conversation.`;
  }
};
