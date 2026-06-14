// Suara adzan: daftar preset siap-pakai + pemutar (saat waktu sholat & pratinjau).

export interface AdzanPreset {
  id: string
  label: string
  url: string
}

// Preset audio adzan. URL berupa berkas mp3 langsung (bukan halaman web).
// Bila sebuah preset gagal dimuat, pemutaran otomatis jatuh ke nada bawaan.
export const ADZAN_PRESETS: AdzanPreset[] = [
  { id: 'tone', label: 'Nada bawaan', url: '' },
  { id: 'adzan1', label: 'Adzan 1', url: 'https://www.islamcan.com/audio/adhan/azan1.mp3' },
  { id: 'adzan2', label: 'Adzan 2', url: 'https://www.islamcan.com/audio/adhan/azan2.mp3' },
  { id: 'adzan3', label: 'Adzan 3', url: 'https://www.islamcan.com/audio/adhan/azan3.mp3' },
  { id: 'adzan4', label: 'Adzan 4', url: 'https://www.islamcan.com/audio/adhan/azan4.mp3' },
  { id: 'adzan5', label: 'Adzan 5', url: 'https://www.islamcan.com/audio/adhan/azan5.mp3' },
]

// Nada panggilan singkat (tanpa berkas) bila tak ada URL audio adzan.
export function chime() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const notes = [523.25, 659.25, 783.99, 659.25] // C-E-G-E
    notes.forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = f
      o.connect(g)
      g.connect(ctx.destination)
      const start = ctx.currentTime + i * 0.28
      g.gain.setValueAtTime(0.0001, start)
      g.gain.exponentialRampToValueAtTime(0.25, start + 0.04)
      g.gain.exponentialRampToValueAtTime(0.0001, start + 0.26)
      o.start(start)
      o.stop(start + 0.28)
    })
    setTimeout(() => ctx.close(), 1600)
  } catch {
    /* audio diblokir — abaikan */
  }
}

// Putar saat masuk waktu sholat (app terbuka).
export function playAdzan(sound: boolean, url: string) {
  if (!sound) return
  if (url) {
    const a = new Audio(url)
    a.play().catch(() => chime())
  } else {
    chime()
  }
}

// ----- Pratinjau (tombol "Dengar") -----
let previewAudio: HTMLAudioElement | null = null

export function stopPreview() {
  if (previewAudio) {
    previewAudio.pause()
    previewAudio.currentTime = 0
    previewAudio = null
  }
}

// Mainkan pratinjau; resolve saat selesai/berhenti. Reject bila gagal dimuat.
export function previewAdzan(url: string, onEnd?: () => void): Promise<void> {
  stopPreview()
  if (!url) {
    chime()
    setTimeout(() => onEnd?.(), 1600)
    return Promise.resolve()
  }
  const a = new Audio(url)
  previewAudio = a
  a.onended = () => {
    if (previewAudio === a) previewAudio = null
    onEnd?.()
  }
  return a.play()
}
