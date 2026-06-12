import { useMemo } from 'react'
import { useNow } from '../lib/useNow'
import { tanggalPanjang } from '../lib/date'
import { toHijri, upcomingEvents, kindLabel, dayAwayLabel, type EventKind } from '../lib/hijri'
import StickyBack from '../components/StickyBack'

const KIND_STYLE: Record<EventKind, string> = {
  utama: 'bg-ocean-100 text-ocean-600',
  sunnah: 'bg-ocean-50 text-ocean-600',
  rutin: 'bg-sand-200 text-ocean-900/60',
  mulia: 'bg-clay-400/20 text-clay-600',
  raya: 'bg-ocean-700 text-white',
  larangan: 'bg-cheer/10 text-cheer',
}

export default function Kalender() {
  const now = useNow(60_000)
  const events = useMemo(() => upcomingEvents(now, 60).slice(0, 14), [now])
  const h = toHijri(now)

  return (
    <div className="space-y-4">
      <StickyBack label="Lainnya" />
      <header className="pt-2">
        <h1 className="text-xl font-bold">Kalender Hijriah</h1>
        <p className="text-sm text-ocean-900/60">{tanggalPanjang(now)}</p>
      </header>

      {/* Tanggal Hijriah hari ini */}
      <div className="card overflow-hidden">
        <div className="bg-ocean-700 px-5 py-5 text-center text-white">
          <p className="text-xs uppercase tracking-wide text-white/70">Hari ini</p>
          <p className="mt-1 text-4xl font-bold">{h.day}</p>
          <p className="text-lg font-medium">{h.monthName} {h.year} H</p>
        </div>
      </div>

      {/* Event mendatang */}
      <div className="card overflow-hidden">
        <p className="border-b border-sand-200 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ocean-900/45">
          🌙 Event mendatang
        </p>
        <ul className="divide-y divide-sand-200">
          {events.map((e) => (
            <li key={e.key} className="flex items-center gap-3 px-5 py-3">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-sand-100 leading-none">
                <span className="text-base font-bold text-ocean-600">
                  {e.date.getDate()}
                </span>
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
