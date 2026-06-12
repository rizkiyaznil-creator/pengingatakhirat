/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Token berbasis CSS variable → otomatis membalik di mode gelap (.dark)
        ocean: {
          50: v('--ocean-50'),
          100: v('--ocean-100'),
          200: v('--ocean-200'),
          300: v('--ocean-300'),
          400: v('--ocean-400'),
          500: v('--ocean-500'),
          600: v('--ocean-600'),
          700: v('--ocean-700'),
          800: v('--ocean-800'),
          900: v('--ocean-900'),
        },
        sand: {
          50: v('--sand-50'),
          100: v('--sand-100'),
          200: v('--sand-200'),
          300: v('--sand-300'),
        },
        clay: {
          400: v('--clay-400'),
          500: v('--clay-500'),
          600: v('--clay-600'),
        },
        cheer: v('--cheer'),
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['"Scheherazade New"', '"Amiri"', 'serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(10, 58, 62, 0.06), 0 4px 16px rgba(10, 58, 62, 0.05)',
      },
    },
  },
  plugins: [],
}
