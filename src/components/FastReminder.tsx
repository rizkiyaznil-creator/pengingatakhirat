import { useMemo, useState } from 'react'
import { addDays } from '../lib/date'
import { specialSunnahFasts } from '../lib/hijri'

// Pengingat in-app H-1 puasa sunnah spesial (Arafah, Asyura, Tasua, Ayyamul Bidh).
// Tampil saat aplikasi dibuka bila BESOK ada puasa sunnah spesial; bisa ditutup.
export default function FastReminder() {
  const [dismissed, setDismissed] = useState(false)

  const fasts = useMemo(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    return specialSunnahFasts(addDays(today, 1))
  }, [])

  if (dismissed || fasts.length === 0) return null

  // Gabungkan nama puasa (mis. "Puasa Arafah", atau "Ayyamul Bidh").
  const names = fasts.map((f) => f.title).join(' & ')

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 px-3"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.5rem)' }}
    >
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-clay-500 px-4 py-3 text-white shadow-card">
        <span className="text-2xl">🌙</span>
        <div className="min-w-0 flex-1">
          <p className="font-bold leading-tight">Besok puasa sunnah: {names}</p>
          <p className="text-xs text-white/85">Siapkan niat & sahur malam ini, semoga dimudahkan.</p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold"
        >
          Tutup
        </button>
      </div>
    </div>
  )
}
