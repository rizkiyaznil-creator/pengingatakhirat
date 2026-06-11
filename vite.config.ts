import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Base path: di GitHub Pages app disajikan di /<nama-repo>/, saat dev di '/'.
const BASE = '/pengingatakhirat/'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'build' ? BASE : '/'
  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon.svg'],
        manifest: {
          name: 'Dawam — Pengingat Ibadah',
          short_name: 'Dawam',
          description:
            'Pengingat ibadah & pencatat amal harian Muslim. Jaga amal, rawat istiqamah.',
          theme_color: '#0e5b61',
          background_color: '#f4f6f6',
          display: 'standalone',
          orientation: 'portrait',
          lang: 'id',
          id: base,
          start_url: base,
          scope: base,
          icons: [
            {
              src: 'icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
          navigateFallback: `${base}index.html`,
        },
      }),
    ],
  }
})
