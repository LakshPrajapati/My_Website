import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const materials = {
  // Base glass panel: Strong contrast, dark adaptive blur, edge lighting (top/left bright, bottom/right dark)
  glassPanel: "bg-elite-surface backdrop-blur-xl border-t border-l border-white/10 border-b-black/50 border-r-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
  
  // Interactive glass: Hover effects with subtle optical depth shift
  glassInteractive: "bg-elite-surface hover:bg-elite-surfaceHover backdrop-blur-xl border-t border-l border-white/5 hover:border-white/20 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_48px_rgba(0,240,255,0.05)]",
  
  // Heavy refractive glass for modals/overlays or strong separations
  glassRefractive: "bg-[#0B1020]/80 backdrop-blur-3xl border-t border-l border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.8)]",
  
  // Subtle HUD panels (darker gradients)
  hudPanel: "bg-gradient-to-b from-[#0B1020]/60 to-transparent border-t border-elite-cyan/20 backdrop-blur-md shadow-inner",

  // Text gradients (cold, stark, sharp)
  textGlow: "text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]",
  textCyan: "text-transparent bg-clip-text bg-gradient-to-r from-elite-cyan to-blue-500 drop-shadow-[0_0_16px_rgba(0,240,255,0.2)]",
};
