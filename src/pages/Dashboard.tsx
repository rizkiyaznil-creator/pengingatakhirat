import { useMemo } from 'react'
import { useStore } from '../store/useStore'
import { useNow } from '../lib/useNow'
import { addDays, tanggalPanjang } from '../lib/date'
import {
  consistency,
  overallStreak,
  prayerStreak,
  habitStreak,
  trend7,
} from '../lib/stats'
import { FlameIcon, TrendUpIcon } from '../components/icons'

function salam(d: Date): string {
  const h = d.getHours()
  if (h < 4) return 'Selamat malam'
  if (h < 11) return 'Selamat pagi'
  if (h < 15) return 'Selamat siang'
  if (h < 18) return 'Selamat sore'
  return 'Selamat malam'
}

export default function Dashboard({ onGo }: { onGo: (t: 'sholat' | 'habit') => void }) {
  const now = useNow(60_000)
  const profile = useStore((s) => s.profile)
  const prayerLogs = useStore((s) => s.prayerLogs)
  const habitLogs = useStore((s) => s.habitLogs)
  const habits = useStore((s) => s.habits)

  const stats = useMemo(() => {
    const cur = consistency(30, prayerLogs, habitLogs, habits, now)
    const prev = consistency(30, prayerLogs, habitLogs, habits, addDays(now, -30))
    const streak = overallStreak(prayerLogs, habitLogs, habits, now)
    const trend = trend7(prayerLogs, habitLogs, habits, now)
    const avgTrend =
      trend.reduce((a, t) => a + t.done, 0) / Math.max(1, trend.length)
    const totalItems = trend[0]?.total ?? 0

    // Streak terpanjang (saat ini) per ibadah
    const items: { label: string; days: number }[] = [
      { label: 'Sholat 5 waktu', days: prayerStreak(prayerLogs, now) },
      ...habits
        .filter((h) => !h.archived)
        .map((h) => ({ label: h.name, days: habitStreak(h, habitLogs, now) })),
    ]
    items.sort((a, b) => b.days - a.days)

    return { cur, prev, delta: cur - prev, streak, trend, avgTrend, totalItems, top: items.slice(0, 3) }
  }, [prayerLogs, habitLogs, habits, now])

  const maxBar = Math.max(stats.totalItems, ...stats.trend.map((t) => t.done), 1)

  return (
    <div className="space-y-4">
      <header className="pt-2">
        <p className="text-sm text-pondok-900/55">{salam(now)},</p>
        <h1 className="text-2xl font-bold">{profile.name || 'Sahabat'} 👋</h1>
        <p className="text-xs text-pondok-900/45">{tanggalPanjang(now)}</p>
      </header>

      {/* Insights utama */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-pondok-900/45">
            Insights · 30 hari
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-pondok-100 px-2.5 py-1 text-xs font-semibold text-pondok-700">
            <FlameIcon size={14} /> Streak {stats.streak}
          </span>
        </div>

        <div className="m-4 rounded-2xl bg-pondok-700 px-5 py-4 text-cream-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-cream-50/80">Konsistensi bulan ini</p>
            {stats.delta !== 0 && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  stats.delta > 0 ? 'bg-pondok-500/40' : 'bg-cheer/30'
                }`}
              >
                <TrendUpIcon size={13} /> {stats.delta > 0 ? '+' : ''}
                {stats.delta}%
              </span>
            )}
          </div>
          <p className="mt-1 text-5xl font-bold">
            {stats.cur}
            <span className="text-2xl font-medium text-cream-50/70">%</span>
          </p>
          <p className="mt-1 text-xs text-cream-50/70">
            {stats.prev > 0
              ? `vs ${stats.prev}% bulan lalu — ${
                  stats.delta >= 0 ? 'kamu lagi naik kelas 🌿' : 'ayo bangkit lagi 💪'
                }`
              : 'Mulai catat amalmu hari ini 🌱'}
          </p>
        </div>

        {/* Tren 7 hari */}
        <div className="px-5 pb-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-pondok-900/45">
              Tren 7 hari
            </p>
            <p className="text-xs text-pondok-900/55">
              Rata {stats.avgTrend.toFixed(1)} / {stats.totalItems} amal
            </p>
          </div>
          <div className="flex items-end justify-between gap-2" style={{ height: 96 }}>
            {stats.trend.map((t, i) => {
              const h = Math.round((t.done / maxBar) * 80) + 4
              const isToday = i === stats.trend.length - 1
              return (
                <div key={t.key} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className={`w-full rounded-t-md ${
                        isToday ? 'bg-pondok-600' : 'bg-pondok-200'
                      }`}
                      style={{ height: h }}
                      title={`${t.done}/${t.total}`}
                    />
                  </div>
                  <span className={`text-[10px] ${isToday ? 'font-bold text-pondok-700' : 'text-pondok-900/45'}`}>
                    {t.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Streak terpanjang */}
      <div className="card px-5 py-4">
        <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold">
          🏆 Streak terpanjang saat ini
        </p>
        <div className="space-y-2.5">
          {stats.top.map((it) => {
            const w = Math.min(100, (it.days / Math.max(1, stats.top[0].days || 1)) * 100)
            return (
              <div key={it.label} className="flex items-center gap-3">
                <span className="w-28 truncate text-sm">{it.label}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream-200">
                  <div className="h-full rounded-full bg-pondok-500" style={{ width: `${w}%` }} />
                </div>
                <span className="w-10 text-right text-sm font-semibold text-pondok-700">
                  {it.days}d
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Aksi cepat */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onGo('sholat')} className="card flex items-center gap-3 px-4 py-4 text-left transition active:scale-[0.98]">
          <span className="text-2xl">🕌</span>
          <div>
            <p className="font-semibold leading-tight">Catat Sholat</p>
            <p className="text-xs text-pondok-900/55">Update hari ini</p>
          </div>
        </button>
        <button onClick={() => onGo('habit')} className="card flex items-center gap-3 px-4 py-4 text-left transition active:scale-[0.98]">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-semibold leading-tight">Habit</p>
            <p className="text-xs text-pondok-900/55">Jaga rutinitas</p>
          </div>
        </button>
      </div>

      <p className="px-2 pb-2 text-center text-xs italic text-pondok-900/40">
        “Tau pasti minggu ini kamu naik atau turun, bukan cuma perasaan.”
      </p>
    </div>
  )
}
