import { useState } from 'react'
import { DZIKIR_SHOLAT, type DzikirSholatItem } from '../data/dzikirSholat'
import StickyBack from '../components/StickyBack'

export default function DzikirSholat() {
  // Hitungan baca per item (sesi berjalan).
  const [count, setCount] = useState<Record<number, number>>({})

  const done = DZIKIR_SHOLAT.filter((d) => (count[d.no] ?? 0) >= d.ulang).length

  function tap(d: DzikirSholatItem) {
    setCount((c) => {
      const cur = c[d.no] ?? 0
      return { ...c, [d.no]: cur >= d.ulang ? 0 : cur + 1 }
    })
  }

  function reset() {
    setCount({})
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
        <h1 className="text-xl font-bold">Dzikir Setelah Sholat</h1>
        <p className="text-sm text-ocean-900/60">
          {done}/{DZIKIR_SHOLAT.length} selesai · ketuk untuk menghitung
        </p>
      </header>

      <div className="space-y-3">
        {DZIKIR_SHOLAT.map((d) => {
          const c = count[d.no] ?? 0
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

              <p className="mt-3 font-arabic arabic-text text-right leading-loose text-ocean-900" dir="rtl">
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
