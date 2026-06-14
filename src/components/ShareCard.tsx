import { useState } from 'react'

// URL aplikasi (GitHub Pages). Pakai origin saat berjalan agar selalu sesuai.
const APP_URL =
  typeof window !== 'undefined' && window.location.origin.includes('github.io')
    ? window.location.origin + '/pengingatakhirat/'
    : 'https://rizkiyaznil-creator.github.io/pengingatakhirat/'

const SHARE_TEXT =
  'Dawam — pengingat ibadah & pencatat amal harian. Yuk pakai bersama, gratis & bisa offline 🤲'

export default function ShareCard() {
  const [msg, setMsg] = useState('')

  async function share() {
    setMsg('')
    const data = { title: 'Dawam', text: SHARE_TEXT, url: APP_URL }
    // Web Share API (Android/iPhone): buka lembar bagikan bawaan.
    if (navigator.share) {
      try {
        await navigator.share(data)
        return
      } catch {
        /* dibatalkan pengguna — abaikan */
        return
      }
    }
    // Fallback: salin tautan ke clipboard.
    try {
      await navigator.clipboard.writeText(`${SHARE_TEXT}\n${APP_URL}`)
      setMsg('Tautan disalin ✓ — tempel & bagikan ke temanmu.')
    } catch {
      setMsg(APP_URL)
    }
  }

  return (
    <div className="card px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ocean-700 text-2xl">
          📤
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-tight">Bagikan aplikasi</p>
          <p className="text-xs text-ocean-900/55">Ajak keluarga & teman ikut beribadah</p>
        </div>
      </div>

      <button
        onClick={share}
        className="mt-4 w-full rounded-2xl bg-ocean-700 py-3 text-sm font-semibold text-white transition active:scale-[0.98]"
      >
        Bagikan Dawam
      </button>

      {msg && <p className="mt-3 break-words text-center text-xs text-ocean-600">{msg}</p>}
    </div>
  )
}
