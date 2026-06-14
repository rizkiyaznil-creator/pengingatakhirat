import { useMemo, useState } from 'react'
import { DZIKIR, type Dzikir } from '../data/dzikir'
import StickyBack from '../components/StickyBack'

type Mode = 'pagi' | 'petang'

export default function Dzikir() {
  const hour = new Date().getHours()
  const [mode, setMode] = useState<Mode>(hour >= 15 || hour < 4 ? 'petang' : 'pagi')
  // Hitungan baca per dzikir (sesi berjalan), dikunci per mode agar tak tercampur.
  const [count, setCount] = useState<Record<string, number>>({})

  const list = useMemo(
    () => DZIKIR.filter((d) => d.waktu === mode || d.waktu === 'both'),
    [mode],
  )

  const key = (d: Dzikir) => `${mode}-${d.no}`
  const done = list.filter((d) => (count[key(d)] ?? 0) >= d.ulang).length

  function tap(d: Dzikir) {
    const k = key(d)
    setCount((c) => {
      const cur = c[k] ?? 0
      return { ...c, [k]: cur >= d.ulang ? 0 : cur + 1 }
    })
  }

  function reset() {
    setCount((c) => {
      const next = { ...c }
      for (const d of list) delete next[key(d)]
      return next
    })
  }

  return (
    <div className="space-y-4 pb-4">
      <StickyBack
        label="Lainnya"
        right={
          <button
            onClick={reset}
            className="rounded-lg bg-sand-200 px-3 py-1.5 text-sm font-semibold text-ocean-900/55"
          >
            Reset
          </button>
        }
      />

      <header className="pt-2">
        <h1 className="text-xl font-bold">Dzikir Pagi & Petang</h1>
        <p className="text-sm text-ocean-900/60">
          {done}/{list.length} selesai · ketuk untuk menghitung
        </p>
      </header>

      {/* Pilih waktu */}
      <div className="grid grid-cols-2 gap-2">
        {(['pagi', 'petang'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-2xl py-2.5 text-sm font-semibold transition ${
              mode === m ? 'bg-ocean-700 text-white' : 'bg-sand-200 text-ocean-900/60'
            }`}
          >
            {m === 'pagi' ? '🌅 Pagi' : '🌇 Petang'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((d) => {
          const c = count[key(d)] ?? 0
          const finished = c >= d.ulang
          return (
            <div key={d.no} className={`card px-5 py-4 transition ${finished ? 'ring-1 ring-ocean-400' : ''}`}>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-600">
                  {d.no}
                </span>
                <p className="min-w-0 flex-1 font-semibold leading-tight">{d.judul}</p>
                {finished && <span className="text-ocean-600">✓</span>}
              </div>

              <p className="mt-3 font-arabic text-right text-2xl leading-loose text-ocean-900" dir="rtl">
                {d.arab}
              </p>
              <p className="mt-2 text-xs italic leading-relaxed text-ocean-900/55">{d.latin}</p>
              <p className="mt-2 text-sm leading-relaxed text-ocean-900/80">{d.arti}</p>
              {d.catatan && (
                <p className="mt-2 rounded-xl bg-sand-100 px-3 py-2 text-[11px] leading-relaxed text-ocean-900/55">
                  💡 {d.catatan}
                </p>
              )}

              <button
                onClick={() => tap(d)}
                className={`mt-3 w-full rounded-2xl py-3 text-sm font-bold transition active:scale-[0.98] ${
                  finished ? 'bg-ocean-100 text-ocean-600' : 'bg-ocean-700 text-white'
                }`}
              >
                {finished ? 'Selesai ✓ — ketuk untuk ulangi' : `Baca  ${c}/${d.ulang}`}
              </button>
            </div>
          )
        })}
      </div>

      <p className="px-1 text-center text-[11px] text-ocean-900/40">
        Rujukan: Hisnul Muslim & hadits sahih. Verifikasi bacaan dengan kitab terpercaya.
      </p>
    </div>
  )
}
