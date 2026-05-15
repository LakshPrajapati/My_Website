/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elite: {
          black: '#050816',
          dark: '#0B1020',
          surface: 'rgba(15, 23, 42, 0.4)',
          surfaceHover: 'rgba(15, 23, 42, 0.72)',
          border: 'rgba(255, 255, 255, 0.05)',
          white: '#f4f4f5',
          muted: '#a1a1aa',
          cyan: '#00f0ff',
          blue: '#0047ff',
          red: '#ff003c',
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        lg: '24px',
        xl: '40px',
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 8s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
