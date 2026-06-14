import { useMemo, useState } from 'react'
import { useNow } from '../lib/useNow'
import { tanggalPanjang } from '../lib/date'
import {
  toHijri,
  upcomingEvents,
  eventsForDay,
  primaryKind,
  kindLabel,
  dayAwayLabel,
  type EventKind,
} from '../lib/hijri'
import StickyBack from '../components/StickyBack'

const KIND_STYLE: Record<EventKind, string> = {
  utama: 'bg-ocean-100 text-ocean-600',
  sunnah: 'bg-ocean-50 text-ocean-600',
  rutin: 'bg-sand-200 text-ocean-900/60',
  mulia: 'bg-clay-400/20 text-clay-600',
  raya: 'bg-ocean-700 text-white',
  larangan: 'bg-cheer/10 text-cheer',
}

// Warna titik penanda di sel kalender per jenis agenda.
const DOT: Record<EventKind, string> = {
  raya: 'bg-ocean-700',
  larangan: 'bg-cheer',
  mulia: 'bg-clay-500',
  utama: 'bg-ocean-500',
  sunnah: 'bg-ocean-400',
  rutin: 'bg-ocean-300',
}

const WEEKDAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const MASEHI_BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export default function Kalender() {
  const now = useNow(60_000)
  const today = useMemo(() => new Date(now.getFullYear(), now.getMonth(), now.getDate()), [now])

  // Bulan yang ditampilkan (tanggal 1) & tanggal yang dipilih.
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState(today)

  const events = useMemo(() => upcomingEvents(now, 60).slice(0, 14), [now])
  const h = toHijri(now)

  // 42 sel grid mulai dari Minggu pada/atau sebelum tanggal 1.
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

  // Rentang bulan Hijriah yang tercakup pada bulan Masehi ini.
  const hijriRange = useMemo(() => {
    const a = toHijri(new Date(view.getFullYear(), view.getMonth(), 1))
    const b = toHijri(new Date(view.getFullYear(), view.getMonth() + 1, 0))
    return a.monthName === b.monthName
      ? `${a.monthName} ${a.year} H`
      : `${a.monthName} – ${b.monthName} ${b.year} H`
  }, [view])

  const selHijri = toHijri(selected)
  const selEvents = eventsForDay(selected)

  function shift(delta: number) {
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1))
  }

  return (
    <div className="space-y-4">
      <StickyBack label="Lainnya" />
      <header className="pt-2">
        <h1 className="text-xl font-bold">Kalender Hijriah</h1>
        <p className="text-sm text-ocean-900/60">{tanggalPanjang(now)}</p>
      </header>

      {/* Hari ini (Hijriah) */}
      <div className="card overflow-hidden">
        <div className="bg-ocean-700 px-5 py-4 text-center text-white">
          <p className="text-xs uppercase tracking-wide text-white/70">Hari ini</p>
          <p className="mt-0.5 text-3xl font-bold">{h.day}</p>
          <p className="text-base font-medium">{h.monthName} {h.year} H</p>
        </div>
      </div>

      {/* Grid bulanan */}
      <div className="card px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <button
            onClick={() => shift(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-sand-200 text-ocean-900/60 active:scale-95"
            aria-label="Bulan sebelumnya"
          >
            ‹
          </button>
          <div className="text-center">
            <p className="font-bold leading-tight">{MASEHI_BULAN[view.getMonth()]} {view.getFullYear()}</p>
            <p className="text-xs text-ocean-900/55">{hijriRange}</p>
          </div>
          <button
            onClick={() => shift(1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-sand-200 text-ocean-900/60 active:scale-95"
            aria-label="Bulan berikutnya"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((w, i) => (
            <div
              key={w}
              className={`pb-1 text-center text-[11px] font-semibold ${
                i === 5 ? 'text-ocean-600' : 'text-ocean-900/40'
              }`}
            >
              {w}
            </div>
          ))}

          {cells.map((d) => {
            const inMonth = d.getMonth() === view.getMonth()
            const isToday = sameDay(d, today)
            const isSel = sameDay(d, selected)
            const kind = primaryKind(d)
            const hd = toHijri(d).day
            return (
              <button
                key={d.toISOString()}
                onClick={() => setSelected(new Date(d))}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-xl transition active:scale-95 ${
                  isSel
                    ? 'bg-ocean-700 text-white'
                    : isToday
                      ? 'ring-2 ring-ocean-500'
                      : 'active:bg-sand-100'
                } ${!inMonth ? 'opacity-35' : ''}`}
              >
                <span className={`text-sm font-semibold leading-none ${isSel ? 'text-white' : 'text-ocean-900'}`}>
                  {d.getDate()}
                </span>
                <span className={`mt-0.5 text-[9px] leading-none ${isSel ? 'text-white/75' : 'text-ocean-900/40'}`}>
                  {hd}
                </span>
                {kind && (
                  <span
                    className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${isSel ? 'bg-white' : DOT[kind]}`}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Legenda */}
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-sand-200 pt-3 text-[10px] text-ocean-900/55">
          <Legend dot="bg-ocean-400" label="Puasa sunnah" />
          <Legend dot="bg-ocean-700" label="Hari raya" />
          <Legend dot="bg-cheer" label="Larangan puasa" />
          <Legend dot="bg-clay-500" label="Malam mulia" />
        </div>
      </div>

      {/* Detail tanggal terpilih */}
      <div className="card px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ocean-900/45">
          {sameDay(selected, today) ? 'Hari ini' : 'Tanggal dipilih'}
        </p>
        <p className="mt-1 font-bold">
          {selected.getDate()} {MASEHI_BULAN[selected.getMonth()]} {selected.getFullYear()}
        </p>
        <p className="text-sm text-ocean-900/60">{selHijri.day} {selHijri.monthName} {selHijri.year} H</p>

        {selEvents.length > 0 ? (
          <div className="mt-3 space-y-2">
            {selEvents.map((e) => (
              <div key={e.title} className="flex items-center gap-2">
                <span className={`pill ${KIND_STYLE[e.kind]}`}>{kindLabel(e.kind)}</span>
                <span className="text-sm font-medium">{e.title}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-ocean-900/45">Tidak ada agenda khusus.</p>
        )}
      </div>

      {/* Event mendatang */}
      <div className="card overflow-hidden">
        <p className="border-b border-sand-200 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ocean-900/45">
          🌙 Event mendatang
        </p>
        <ul className="divide-y divide-sand-200">
          {events.map((e) => (
            <li
              key={e.key}
              className="flex cursor-pointer items-center gap-3 px-5 py-3 transition active:bg-sand-100"
              onClick={() => {
                setView(new Date(e.date.getFullYear(), e.date.getMonth(), 1))
                setSelected(new Date(e.date.getFullYear(), e.date.getMonth(), e.date.getDate()))
              }}
            >
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-sand-100 leading-none">
                <span className="text-base font-bold text-ocean-600">{e.date.getDate()}</span>
                <span className="mt-0.5 text-[9px] uppercase text-ocean-900/45">
                  {e.date.toLocaleDateString('id-ID', { month: 'short' })}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-tight">{e.title}</p>
                <p className="truncate text-xs text-ocean-900/55">{e.sub}</p>
                <span className={`pill mt-1 ${KIND_STYLE[e.kind]}`}>{kindLabel(e.kind)}</span>
              </div>
              <span className="shrink-0 text-xs font-medium text-ocean-900/55">
                {dayAwayLabel(e.daysAway)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="px-2 pb-2 text-center text-[11px] text-ocean-900/40">
        Tanggal Hijriah memakai kalender Umm al-Qura (perhitungan). Awal bulan bisa
        berbeda 1 hari dengan rukyat/keputusan pemerintah setempat.
      </p>
    </div>
  )
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  )
}
