import { useMemo, useState } from 'react'
import { useStore } from '../store/useStore'
import { dateKey, lastNDays, tanggalPanjang, fromKey, namaHari } from '../lib/date'
import { useNow } from '../lib/useNow'
import { addDays } from '../lib/date'
import StickyBack from '../components/StickyBack'

const MOODS = ['😔', '😕', '😐', '🙂', '😄']
const RATING_BG = ['bg-sand-200', 'bg-ocean-200', 'bg-ocean-300', 'bg-ocean-400', 'bg-ocean-500', 'bg-ocean-700']

function streakOf(m: Record<string, { rating: number }>, today = new Date()): number {
  let streak = 0
  for (let i = 0; i < 400; i++) {
    const k = dateKey(addDays(today, -i))
    if ((m[k]?.rating ?? 0) > 0) streak++
    else if (i === 0) continue
    else break
  }
  return streak
}

export default function Muhasabah() {
  const now = useNow(60_000)
  const muhasabah = useStore((s) => s.muhasabah)
  const setMuhasabah = useStore((s) => s.setMuhasabah)
  const today = dateKey(now)
  const entry = muhasabah[today] ?? { rating: 0, syukur: '', perbaikan: '', niat: '' }
  const [picked, setPicked] = useState<string | null>(null)

  const stats = useMemo(() => {
    const entries = Object.entries(muhasabah).filter(([, v]) => v.rating > 0)
    const count = entries.length
    const avg = count ? entries.reduce((a, [, v]) => a + v.rating, 0) / count : 0
    return { count, avg, streak: streakOf(muhasabah, now) }
  }, [muhasabah, now])

  const days = useMemo(() => lastNDays(60, now), [now])
  const pickedEntry = picked ? muhasabah[picked] : null

  return (
    <div className="space-y-4">
      <StickyBack label="Lainnya" />
      <header className="pt-2">
        <h1 className="text-xl font-bold">Muhasabah Malam</h1>
        <p className="text-sm text-ocean-900/60">{tanggalPanjang(now)}</p>
      </header>

      {/* Statistik */}
      <div className="grid grid-cols-3 gap-3">
        <Stat label="streak" value={`${stats.streak}`} sub="hari" />
        <Stat label="entri" value={`${stats.count}`} sub="terisi" />
        <Stat label="rata mood" value={stats.avg ? stats.avg.toFixed(1) : '–'} sub="/ 5" />
      </div>

      {/* Form malam ini */}
      <div className="card px-5 py-5">
        <p className="text-sm font-semibold">Bagaimana harimu?</p>
        <div className="mt-2 flex justify-between">
          {MOODS.map((emo, i) => {
            const val = i + 1
            const on = entry.rating === val
            return (
              <button
                key={val}
                onClick={() => setMuhasabah(today, { rating: val })}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition ${
                  on ? 'bg-ocean-100 ring-2 ring-ocean-500 scale-110' : 'bg-sand-100'
                }`}
              >
                {emo}
              </button>
            )
          })}
        </div>

        <Field
          label="🤲 Apa yang kamu syukuri hari ini?"
          value={entry.syukur}
          onChange={(v) => setMuhasabah(today, { syukur: v })}
        />
        <Field
          label="🛠️ Apa yang mau diperbaiki?"
          value={entry.perbaikan}
          onChange={(v) => setMuhasabah(today, { perbaikan: v })}
        />
        <Field
          label="🎯 Niat untuk besok"
          value={entry.niat}
          onChange={(v) => setMuhasabah(today, { niat: v })}
        />
        <p className="mt-1 text-[11px] text-ocean-900/40">Tersimpan otomatis & tersinkron ke akunmu.</p>
      </div>

      {/* Heatmap 60 hari */}
      <div className="card px-5 py-4">
        <p className="mb-3 text-sm font-semibold">Mood 60 hari terakhir</p>
        <div className="grid grid-cols-10 gap-1.5">
          {days.map((k) => {
            const r = muhasabah[k]?.rating ?? 0
            return (
              <button
                key={k}
                onClick={() => setPicked(picked === k ? null : k)}
                title={`${k} · ${r ? `mood ${r}` : 'kosong'}`}
                className={`aspect-square rounded-[4px] ${RATING_BG[r]} ${picked === k ? 'ring-2 ring-ocean-700' : ''}`}
              />
            )
          })}
        </div>
        <div className="mt-3 flex items-center justify-end gap-1 text-[10px] text-ocean-900/45">
          <span>kurang</span>
          {RATING_BG.slice(1).map((c, i) => (
            <span key={i} className={`h-3 w-3 rounded-[3px] ${c}`} />
          ))}
          <span>baik</span>
        </div>

        {picked && (
          <div className="mt-3 rounded-xl bg-sand-100 px-3 py-2.5 text-sm">
            <p className="font-semibold">
              {namaHari(fromKey(picked))}, {fromKey(picked).getDate()}{' '}
              {fromKey(picked).toLocaleDateString('id-ID', { month: 'long' })}
              {pickedEntry?.rating ? ` · ${MOODS[pickedEntry.rating - 1]}` : ''}
            </p>
            {pickedEntry ? (
              <div className="mt-1 space-y-0.5 text-xs text-ocean-900/70">
                {pickedEntry.syukur && <p>🤲 {pickedEntry.syukur}</p>}
                {pickedEntry.perbaikan && <p>🛠️ {pickedEntry.perbaikan}</p>}
                {pickedEntry.niat && <p>🎯 {pickedEntry.niat}</p>}
                {!pickedEntry.syukur && !pickedEntry.perbaikan && !pickedEntry.niat && (
                  <p className="text-ocean-900/40">Hanya mood, tanpa catatan.</p>
                )}
              </div>
            ) : (
              <p className="mt-1 text-xs text-ocean-900/40">Tidak ada catatan hari itu.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="card px-3 py-3 text-center">
      <p className="text-2xl font-bold leading-none text-ocean-600">{value}</p>
      <p className="mt-1 text-[11px] text-ocean-900/55">{label} · {sub}</p>
    </div>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="mt-4 block">
      <span className="mb-1 block text-xs font-medium text-ocean-900/60">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full resize-none rounded-xl border border-sand-200 bg-sand-50 px-3 py-2.5 text-sm outline-none focus:border-ocean-400"
        placeholder="Tulis singkat…"
      />
    </label>
  )
}
