import { useEffect, useRef } from 'react'

// Integrasi tombol "kembali" perangkat (hardware/gesture) dengan navigasi dalam-app.
// Pola "penghalang tunggal": satu entri history menahan back; saat ditekan, layar
// terdalam ditutup dan penghalang dipasang lagi bila masih ada layar lebih dangkal.
type CloseFn = () => void
const handlers: CloseFn[] = []
let barrierActive = false

function ensureBarrier() {
  if (!barrierActive && typeof window !== 'undefined') {
    window.history.pushState({ dawamBarrier: true }, '')
    barrierActive = true
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    barrierActive = false
    const depth = handlers.length
    if (depth > 0) {
      if (depth > 1) ensureBarrier() // masih ada layar di bawahnya
      handlers[depth - 1]() // tutup layar terdalam
    }
  })
}

// Kembali secara programatik (tombol back di UI) — lewat jalur yang sama.
export function navBack() {
  if (typeof window !== 'undefined') window.history.back()
}

// Daftarkan layar yang bisa "di-back". Saat `isOpen`, back perangkat akan memanggil `close`.
export function useBackable(isOpen: boolean, close: CloseFn) {
  const ref = useRef(close)
  ref.current = close
  useEffect(() => {
    if (!isOpen) return
    const h: CloseFn = () => ref.current()
    handlers.push(h)
    ensureBarrier()
    return () => {
      const i = handlers.lastIndexOf(h)
      if (i >= 0) handlers.splice(i, 1)
    }
  }, [isOpen])
}
