const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  green: "\x1b[32m",
};

export const logger = {
  info: (msg: string, ...args: any[]) => {
    console.log(`${colors.cyan}[AI_SYS]${colors.reset} ${msg}`, ...args);
  },
  warn: (msg: string, ...args: any[]) => {
    console.warn(`${colors.yellow}[AI_WARN]${colors.reset} ${msg}`, ...args);
  },
  error: (msg: string, ...args: any[]) => {
    console.error(`${colors.red}[AI_CRIT]${colors.reset} ${msg}`, ...args);
  },
  success: (msg: string, ...args: any[]) => {
    console.log(`${colors.green}[AI_OK]${colors.reset} ${msg}`, ...args);
  },
  system: (msg: string) => {
    console.log(`${colors.bright}${colors.cyan}> ${msg}${colors.reset}`);
  }
};
