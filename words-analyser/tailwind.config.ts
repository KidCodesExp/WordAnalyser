import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1A1A',
        paper: '#FAFAFA',
        mist: '#F0F0F1',
        line: '#E4E4E6',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-sm': 'clamp(0.75rem, 0.7rem + 0.3vw, 0.875rem)',
        'fluid-base': 'clamp(0.9rem, 0.85rem + 0.4vw, 1.05rem)',
        'fluid-lg': 'clamp(1.1rem, 1rem + 0.6vw, 1.35rem)',
        'fluid-xl': 'clamp(1.4rem, 1.2rem + 1vw, 1.9rem)',
        'fluid-2xl': 'clamp(1.9rem, 1.5rem + 2vw, 3rem)',
        'fluid-3xl': 'clamp(2.6rem, 2rem + 3.5vw, 5rem)',
      },
    },
  },
  plugins: [],
};
export default config;
