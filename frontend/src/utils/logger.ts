type LogLevel = 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR' | 'SYSTEM';

class TacticalLogger {
  private prefix = '[LAKSH.OS]';

  private getTimestamp(): string {
    return new Date().toISOString().split('T')[1].split('Z')[0];
  }

  private format(level: LogLevel, message: string): string {
    return `${this.prefix} [${this.getTimestamp()}] [${level}] ${message}`;
  }

  info(message: string, data?: any) {
    console.log(`%c${this.format('INFO', message)}`, 'color: #00e5ff', data || '');
  }

  success(message: string, data?: any) {
    console.log(`%c${this.format('SUCCESS', message)}`, 'color: #00ff41', data || '');
  }

  warn(message: string, data?: any) {
    console.warn(`%c${this.format('WARN', message)}`, 'color: #ffab00', data || '');
  }

  error(message: string, error?: any) {
    console.error(`%c${this.format('ERROR', message)}`, 'color: #ff1744', error || '');
  }

  system(message: string, data?: any) {
    console.log(`%c${this.format('SYSTEM', message)}`, 'color: #ffffff; background: #003366', data || '');
  }
}

export const logger = new TacticalLogger();
