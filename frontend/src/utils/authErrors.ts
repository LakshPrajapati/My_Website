import { logger } from './logger';

export const parseAuthError = (error: any): string => {
  const code = error.code || 'unknown';
  
  logger.error(`AUTH_FAILURE [${code}]`, error);

  switch (code) {
    case 'auth/popup-blocked':
      return 'AUTHORIZATION TERMINATED: POPUP BLOCKED BY HOST';
    case 'auth/cancelled-by-user':
      return 'AUTHORIZATION ABORTED BY USER';
    case 'auth/account-exists-with-different-credential':
      return 'SECURITY ALERT: IDENTITY COLLISION DETECTED';
    case 'auth/network-request-failed':
      return 'SIGNAL INTERRUPTED: NETWORK FAILURE';
    case 'auth/unauthorized-domain':
      return 'SECURITY BREACH: UNAUTHORIZED ORIGIN';
    case 'auth/app-check-token-expired':
      return 'SECURITY PROTOCOL EXPIRED: RE-VALIDATION REQUIRED';
    default:
      return `SYSTEM ERROR: ${code.toUpperCase()}`;
  }
};
