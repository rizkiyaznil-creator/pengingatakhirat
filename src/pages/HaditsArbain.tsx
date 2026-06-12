import { useState } from 'react'
import { HADITS_ARBAIN, type Hadits } from '../data/haditsArbain'
import { ChevronRight } from '../components/icons'

export default function HaditsArbain() {
  const [open, setOpen] = useState<Hadits | null>(null)

  if (open) return <Detail hadits={open} onBack={() => setOpen(null)} />

  return (
    <div className="space-y-4">
      <header className="pt-2">
        <h1 className="text-xl font-bold">Hadits Arba’in</h1>
        <p className="text-sm text-ocean-900/60">42 hadits pilihan Imam An-Nawawi</p>
      </header>

      <div className="card overflow-hidden">
        <ul className="divide-y divide-sand-200">
          {HADITS_ARBAIN.map((hd) => (
            <li key={hd.no}>
              <button
                onClick={() => setOpen(hd)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition active:bg-sand-100"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-sm font-bold text-ocean-700">
                  {hd.no}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-tight">{hd.judul}</p>
                  <p className="truncate text-xs text-ocean-900/55">{hd.perawi}</p>
                </div>
                <ChevronRight size={18} className="shrink-0 text-ocean-900/30" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="px-2 pb-2 text-center text-[11px] text-ocean-900/40">
        Teks disusun untuk kemudahan membaca. Mohon verifikasi dengan kitab Arba’in
        An-Nawawi terbitan terpercaya.
      </p>
    </div>
  )
}

function Detail({ hadits, onBack }: { hadits: Hadits; onBack: () => void }) {
  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 pt-2 text-sm font-semibold text-ocean-600">
        ← Kembali
      </button>

      <div className="card px-5 py-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ocean-100 text-sm font-bold text-ocean-700">
            {hadits.no}
          </span>
          <h2 className="text-lg font-bold">{hadits.judul}</h2>
        </div>

        <p className="font-arabic text-2xl leading-loose text-ocean-800" dir="rtl">
          {hadits.arab}
        </p>

        <div className="my-4 h-px bg-sand-200" />

        <p className="text-[15px] leading-relaxed text-ocean-900/80">{hadits.terjemah}</p>

        <p className="mt-3 text-xs font-medium text-ocean-600">{hadits.perawi}</p>
      </div>

      <p className="px-2 pb-2 text-center text-[11px] text-ocean-900/40">
        Mohon verifikasi teks dengan kitab asli.
      </p>
    </div>
  )
}
