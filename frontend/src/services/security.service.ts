import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { logger } from '../utils/logger';

export type SecurityEventType = 
  | 'LOGIN_SUCCESS' 
  | 'LOGIN_FAILURE' 
  | 'LOGOUT' 
  | 'SESSION_START' 
  | 'APP_CHECK_FAILURE';

export const securityService = {
  async logEvent(uid: string | 'anonymous', type: SecurityEventType, metadata: any = {}) {
    try {
      const eventId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const logRef = doc(db, 'security_logs', eventId);
      
      const logData = {
        uid,
        type,
        timestamp: serverTimestamp(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        ...metadata
      };

      // In a real enterprise app, we might use a dedicated logging service or function
      // For this portfolio, we'll log to a dedicated collection
      await setDoc(logRef, logData);
      
      logger.info(`SECURITY_LOG: ${type} [${uid}]`);
    } catch (err) {
      // Don't crash if logging fails, but alert the console
      logger.warn('SECURITY_LOGGING_FAILED', err);
    }
  }
};
