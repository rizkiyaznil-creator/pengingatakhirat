/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Teal laut — warna utama Dawam
        ocean: {
          50: '#ecf6f6',
          100: '#cfe9ea',
          200: '#a3d5d7',
          300: '#6fb9bd',
          400: '#3f989e',
          500: '#1a818a',
          600: '#136b72',
          700: '#0e5b61', // brand
          800: '#0c4a4f',
          900: '#0a3a3e',
        },
        // Off-white sejuk (netral kebiruan tipis)
        sand: {
          50: '#fbfcfc',
          100: '#f4f6f6',
          200: '#e6eced',
          300: '#d3dddd',
        },
        // Aksen clay / karang lembut
        clay: {
          400: '#e6a88c',
          500: '#d98c6a',
          600: '#c4734f',
        },
        cheer: '#d98c6a',
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
