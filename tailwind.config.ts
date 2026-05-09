import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0E2A4A',
        'navy-deep': '#081A2E',
        'navy-mid': '#1B3A5C',
        cream: '#F4EEE2',
        paper: '#FAF6EC',
        ink: '#0A0F18',
        stone: '#5C6577',
        'stone-l': '#A6ADB9',
        line: '#E3DCCB',
        grass: '#5A8A2E',
        sun: '#E8A23C',
        brick: '#C24A2C',
        sky: '#7FA8C9',
        live: '#E63946',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
        sans: ['var(--font-inter)', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        pulse_live: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        liveBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'live-pulse': 'pulse_live 1.4s ease-in-out infinite',
        'live-blink': 'liveBlink 1.4s ease-in-out infinite',
        ticker: 'ticker 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
