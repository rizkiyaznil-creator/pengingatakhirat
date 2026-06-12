import { useMemo, useState } from 'react'
import { ASMAUL_HUSNA } from '../data/asmaulHusna'

export default function AsmaulHusna() {
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return ASMAUL_HUSNA
    return ASMAUL_HUSNA.filter(
      (a) => a.latin.toLowerCase().includes(s) || a.arti.toLowerCase().includes(s),
    )
  }, [q])

  return (
    <div className="space-y-4">
      <header className="pt-2">
        <h1 className="text-xl font-bold">99 Asmaul Husna</h1>
        <p className="text-sm text-ocean-900/60">Nama-nama indah milik Allah ﷻ</p>
      </header>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cari nama atau arti…"
        className="w-full rounded-2xl border border-sand-200 bg-white px-4 py-3 outline-none focus:border-ocean-400"
      />

      <div className="grid grid-cols-1 gap-2.5">
        {list.map((a) => (
          <div key={a.no} className="card flex items-center gap-3 px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-sm font-bold text-ocean-700">
              {a.no}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-tight text-ocean-800">{a.latin}</p>
              <p className="text-xs text-ocean-900/55">{a.arti}</p>
            </div>
            <p className="font-arabic text-2xl text-ocean-700" dir="rtl">{a.arab}</p>
          </div>
        ))}
        {list.length === 0 && (
          <p className="py-8 text-center text-sm text-ocean-900/50">Tidak ada yang cocok.</p>
        )}
      </div>
    </div>
  )
}
