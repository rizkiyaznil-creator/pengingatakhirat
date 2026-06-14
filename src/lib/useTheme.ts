import { useEffect } from 'react'
import { useStore } from '../store/useStore'

const PAGE_BG = { light: '#f4f6f6', dark: '#0d1313' }

// Terapkan tema: toggle kelas `.dark` di <html> sesuai preferensi & sistem.
export function useTheme() {
  const theme = useStore((s) => s.theme)
  useEffect(() => {
    const root = document.documentElement
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && mql.matches)
      root.classList.toggle('dark', dark)
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', dark ? PAGE_BG.dark : PAGE_BG.light)
    }
    apply()
    if (theme === 'system') {
      mql.addEventListener('change', apply)
      return () => mql.removeEventListener('change', apply)
    }
  }, [theme])
}

// Terapkan ukuran teks: skala UI (root font-size) & skala tambahan teks Arab.
export function useDisplayScale() {
  const uiScale = useStore((s) => s.uiScale)
  const arabicScale = useStore((s) => s.arabicScale)
  useEffect(() => {
    const root = document.documentElement
    root.style.fontSize = `${16 * (uiScale || 1)}px`
    root.style.setProperty('--arabic-scale', String(arabicScale || 1))
  }, [uiScale, arabicScale])
}
