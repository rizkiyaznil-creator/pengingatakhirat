/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Hijau pondok — warna utama Niyatin
        pondok: {
          50: '#eef6f1',
          100: '#d6e9dd',
          200: '#aed3bd',
          300: '#7fb697',
          400: '#509474',
          500: '#357a5b',
          600: '#28614a',
          700: '#1f4d3a', // brand
          800: '#1a3f30',
          900: '#142f24',
        },
        // Krem / cream background
        cream: {
          50: '#fdfcf8',
          100: '#f7f3ea',
          200: '#efe7d6',
          300: '#e3d6bd',
        },
        // Aksen emas / gold
        gold: {
          400: '#cdb079',
          500: '#bd9a52',
          600: '#a3803c',
        },
        cheer: '#c43d56',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['"Scheherazade New"', '"Amiri"', 'serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(20, 47, 36, 0.06), 0 4px 16px rgba(20, 47, 36, 0.05)',
      },
    },
  },
  plugins: [],
}
