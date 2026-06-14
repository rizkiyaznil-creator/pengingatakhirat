import { useMemo, useState } from 'react'
import { useStore } from '../store/useStore'
import { useNow } from '../lib/useNow'
import { dateKey } from '../lib/date'
import { haidSummary } from '../lib/haid'
import StickyBack from '../components/StickyBack'

const WEEKDAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
function fmtTanggal(d: Date) {
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`
}

export default function HaidReport() {
  const now = useNow(60_000)
  const today = useMemo(() => new Date(now.getFullYear(), now.getMonth(), now.getDate()), [now])
  const haidLogs = useStore((s) => s.haidLogs)
  const toggleHaid = useStore((s) => s.toggleHaid)

  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))

  const sum = useMemo(() => haidSummary(haidLogs, now), [haidLogs, now])

  // Prakiraan periode berikutnya (untuk highlight kalender).
  const predictedKeys = useMemo(() => {
    const set = new Set<string>()
    if (sum.nextStart && sum.avgDuration) {
      for (let i = 0; i < sum.avgDuration; i++) {
        const d = new Date(sum.nextStart)
        d.setDate(d.getDate() + i)
        set.add(dateKey(d))
      }
    }
    return set
  }, [sum.nextStart, sum.avgDuration])

  const cells = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1)
    const start = new Date(first)
    start.setDate(first.getDate() - first.getDay())
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return d
    })
  }, [view])

  function shift(delta: number) {
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1))
  }

  const statusText = sum.isToday
    ? `Sedang haid — hari ke-${sum.currentDay ?? 1}`
    : sum.nextStart
      ? sum.daysToNext != null && sum.daysToNext >= 0
        ? `Prakiraan haid berikutnya ${sum.daysToNext} hari lagi`
        : `Prakiraan terlewat ${Math.abs(sum.daysToNext ?? 0)} hari`
      : 'Tandai hari haid untuk mulai mencatat'

  return (
    <div className="space-y-4 pb-4">
      <StickyBack label="Kembali" />
      <header className="pt-2">
        <h1 className="text-xl font-bold">Catatan Haid</h1>
        <p className="text-sm text-ocean-900/60">Pencatatan & pola siklus bulanan</p>
      </header>

      {/* Status */}
      <div className="card overflow-hidden">
        <div className={`px-5 py-4 text-white ${sum.isToday ? 'bg-clay-500' : 'bg-ocean-700'}`}>
          <p className="text-xs uppercase tracking-wide text-white/70">Status</p>
          <p className="mt-0.5 text-lg font-bold">{statusText}</p>
          {sum.nextStart && !sum.isToday && (
            <p className="text-sm text-white/85">{fmtTanggal(sum.nextStart)}</p>
          )}
        </div>
      </div>

      {/* Ringkasan angka */}
      <div className="grid grid-cols-3 gap-3">
        <Stat value={sum.avgCycle != null ? `${sum.avgCycle}` : '—'} unit="hari" label="Rata-rata siklus" />
        <Stat value={sum.avgDuration != null ? `${sum.avgDuration}` : '—'} unit="hari" label="Rata-rata lama" />
        <Stat value={`${sum.count}`} unit="periode" label="Tercatat" />
      </div>

      {/* Kalender penanda */}
      <div className="card px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <button
            onClick={() => shift(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-sand-200 text-ocean-900/60 active:scale-95"
            aria-label="Bulan sebelumnya"
          >
            ‹
          </button>
          <p className="font-bold">{BULAN[view.getMonth()]} {view.getFullYear()}</p>
          <button
            onClick={() => shift(1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-sand-200 text-ocean-900/60 active:scale-95"
            aria-label="Bulan berikutnya"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((w) => (
            <div key={w} className="pb-1 text-center text-[11px] font-semibold text-ocean-900/40">
              {w}
            </div>
          ))}

          {cells.map((d) => {
            const key = dateKey(d)
            const inMonth = d.getMonth() === view.getMonth()
            const isToday = sameDay(d, today)
            const isHaid = !!haidLogs[key]
            const isFuture = d.getTime() > today.getTime()
            const isPredicted = !isHaid && predictedKeys.has(key)
            return (
              <button
                key={key}
                disabled={isFuture}
                onClick={() => toggleHaid(key)}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-semibold transition active:scale-95 ${
                  isHaid
                    ? 'bg-clay-500 text-white'
                    : isToday
                      ? 'ring-2 ring-ocean-500'
                      : 'active:bg-sand-100'
                } ${isPredicted ? 'border border-dashed border-clay-400' : ''} ${
                  !inMonth ? 'opacity-35' : ''
                } ${isFuture ? 'opacity-40' : ''} ${isHaid ? '' : 'text-ocean-900'}`}
              >
                {d.getDate()}
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-sand-200 pt-3 text-[10px] text-ocean-900/55">
          <Legend cls="bg-clay-500" label="Hari haid (ketuk untuk tandai)" />
          <Legend cls="border border-dashed border-clay-400" label="Prakiraan" />
        </div>
      </div>

      {/* Daftar periode */}
      <div className="card overflow-hidden">
        <p className="border-b border-sand-200 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ocean-900/45">
          🌸 Riwayat periode
        </p>
        {sum.periods.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-ocean-900/50">
            Belum ada catatan. Tandai hari haid di kalender atau lewat halaman Sholat.
          </p>
        ) : (
          <ul className="divide-y divide-sand-200">
            {[...sum.periods].reverse().map((p) => (
              <li key={p.startKey} className="flex items-center gap-3 px-5 py-3">
                <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-clay-400/20 leading-none text-clay-600">
                  <span className="text-base font-bold">{p.days}</span>
                  <span className="text-[9px]">hari</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-tight">
                    {fmtTanggal(p.start)}
                    {p.days > 1 && ` – ${p.end.getDate()} ${BULAN[p.end.getMonth()]}`}
                  </p>
                  <p className="text-xs text-ocean-900/55">
                    {p.cycleFromPrev ? `Siklus ${p.cycleFromPrev} hari dari sebelumnya` : 'Periode pertama tercatat'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="px-2 text-center text-[11px] text-ocean-900/40">
        Prakiraan dihitung dari rata-rata siklusmu — hanya perkiraan, bisa berbeda. Catatan ini privat
        dan tersimpan di akunmu.
      </p>
    </div>
  )
}

function Stat({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="card px-3 py-3 text-center">
      <p className="text-xl font-bold leading-none text-ocean-900">{value}</p>
      <p className="text-[10px] text-ocean-900/45">{unit}</p>
      <p className="mt-1 text-[11px] font-medium text-ocean-900/60">{label}</p>
    </div>
  )
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`h-3 w-3 rounded ${cls}`} />
      {label}
    </span>
  )
}
