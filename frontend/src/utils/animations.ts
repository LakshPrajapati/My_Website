import { Variants } from 'framer-motion';

export const animations: { [key: string]: Variants } = {
  // Level 1: Ambient
  breathe: {
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [0.98, 1.02, 0.98],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } as any
    }
  },

  // Level 2: Interactive
  hoverGlass: {
    rest: { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(12px)" },
    hover: { 
      scale: 1.02, 
      backgroundColor: "rgba(255, 255, 255, 0.08)", 
      backdropFilter: "blur(24px)",
      transition: { type: "spring", stiffness: 400, damping: 25 } as any
    }
  },

  // Level 3: Cinematic Reveals
  revealUp: {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" } as any
    }
  },

  revealDown: {
    hidden: { opacity: 0, y: -40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" } as any
    }
  },
  
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      } as any
    }
  },

  // Level 4: Critical (Auth/System)
  systemUnlock: {
    hidden: { opacity: 0, scale: 0.95, filter: "brightness(0.5) blur(20px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "brightness(1) blur(0px)",
      transition: { duration: 1.2, ease: "easeOut" } as any
    }
  }
};
