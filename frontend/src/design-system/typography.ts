/**
 * ELITE INTELLIGENCE OS - TYPOGRAPHY SYSTEM
 * Controlled. Authoritative. Premium.
 */

export const typography = {
  // Primary Display Font (Space Grotesk)
  // Ideal for cinematic headlines and system states.
  display: {
    hero: "font-display text-6xl md:text-8xl font-bold tracking-[-0.04em] leading-[0.9]",
    h1: "font-display text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-tight",
    h2: "font-display text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-snug",
    h3: "font-display text-xl md:text-2xl font-medium tracking-[-0.01em]",
  },

  // System UI Font (IBM Plex Sans)
  // Ideal for body copy and engineering-focused descriptions.
  ui: {
    body: "font-sans text-sm md:text-base font-normal leading-relaxed text-elite-muted/90",
    small: "font-sans text-xs md:text-sm font-medium leading-normal text-elite-muted/70",
    description: "font-sans text-[10px] md:text-xs font-normal leading-relaxed text-elite-muted/50 tracking-wide",
  },

  // Terminal / Metadata Font (IBM Plex Mono)
  // Ideal for telemetry, IDs, and tactical diagnostics.
  terminal: {
    label: "font-mono text-[10px] md:text-xs font-medium tracking-[0.12em] uppercase text-elite-cyan/80",
    id: "font-mono text-[9px] md:text-[10px] font-normal tracking-[0.2em] uppercase text-elite-muted/40",
    telemetry: "font-mono text-[8px] md:text-[9px] font-normal tracking-widest uppercase",
    code: "font-mono text-xs leading-relaxed text-elite-cyan/60",
  },

  // Spacing & Rhythm Tokens
  tracking: {
    compressed: "tracking-[-0.05em]",
    tight: "tracking-[-0.02em]",
    standard: "tracking-normal",
    wide: "tracking-[0.1em]",
    tactical: "tracking-[0.2em]",
    ultra: "tracking-[0.4em]",
  }
};
