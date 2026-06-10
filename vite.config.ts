import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Niyatin — Pengingat Ibadah',
        short_name: 'Niyatin',
        description:
          'Habit tracker & pengingat ibadah Muslim. Tumbuh jadi pribadi lebih baik.',
        theme_color: '#1f4d3a',
        background_color: '#f7f3ea',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'id',
        start_url: '/',
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
      },
    }),
  ],
})
