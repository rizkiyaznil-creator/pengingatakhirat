import { useMemo } from 'react'
import { useStore, type PrayerStatus } from '../store/useStore'
import {
  getSchedule,
  countdown,
  PRAYERS,
  PRAYER_LABEL,
} from '../lib/prayer'
import { dateKey, jam, tanggalPanjang } from '../lib/date'
import { useNow } from '../lib/useNow'
import { prayerStreak } from '../lib/stats'
import { FlameIcon } from '../components/icons'

const STATUS_STYLE: Record<PrayerStatus, { label: string; cls: string; dot: string }> = {
  pending: { label: 'Belum', cls: 'bg-cream-200 text-pondok-900/50', dot: 'bg-pondok-900/20' },
  ontime: { label: 'Tepat', cls: 'bg-pondok-100 text-pondok-700', dot: 'bg-pondok-500' },
  late: { label: 'Telat', cls: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  qadha: { label: 'Qadha', cls: 'bg-cheer/10 text-cheer', dot: 'bg-cheer' },
}

export default function Sholat() {
  const now = useNow()
  const profile = useStore((s) => s.profile)
  const prayerLogs = useStore((s) => s.prayerLogs)
  const cyclePrayer = useStore((s) => s.cyclePrayer)
  const today = dateKey(now)

  const schedule = useMemo(
    () => getSchedule(profile.lat, profile.lng, profile.method, profile.madhab, now),
    [profile.lat, profile.lng, profile.method, profile.madhab, now],
  )

  const log = prayerLogs[today] ?? {}
  const done = PRAYERS.filter((p) => log[p] && log[p] !== 'pending').length
  const onTime = PRAYERS.filter((p) => log[p] === 'ontime').length
  const onTimeRate = done === 0 ? 0 : Math.round((onTime / done) * 100)
  const qadhaCount = PRAYERS.filter((p) => log[p] === 'qadha').length
  const streak = prayerStreak(prayerLogs, now)

  return (
    <div className="space-y-4">
      <header className="pt-2">
        <h1 className="text-xl font-bold">Sholat 5 Waktu</h1>
        <p className="text-sm text-pondok-900/60">{tanggalPanjang(now)}</p>
      </header>

      {/* Kartu ringkasan hari ini */}
      <div className="card overflow-hidden">
        <div className="bg-pondok-700 px-5 py-4 text-cream-50">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-cream-50/70">Hari ini</p>
              <p className="text-3xl font-bold">
                {done}
                <span className="text-lg font-medium text-cream-50/70">/5 sholat</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-cream-50/70">On-time rate</p>
              <p className="text-2xl font-bold">{onTimeRate}%</p>
            </div>
          </div>
          {schedule.next && (
            <div className="mt-3 flex items-center justify-between rounded-xl bg-pondok-800/60 px-3 py-2 text-sm">
              <span className="text-cream-50/80">
                Berikutnya: <b>{PRAYER_LABEL[schedule.next]}</b> {jam(schedule.nextTime!)}
              </span>
              <span className="font-semibold">{countdown(schedule.nextTime, now)}</span>
            </div>
          )}
        </div>

        {/* Daftar sholat */}
        <ul className="divide-y divide-cream-200">
          {PRAYERS.map((p) => {
            const st = (log[p] ?? 'pending') as PrayerStatus
            const style = STATUS_STYLE[st]
            const isCurrent = schedule.current === p && schedule.next !== p
            return (
              <li key={p}>
                <button
                  onClick={() => cyclePrayer(today, p)}
                  className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition active:bg-cream-100"
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                  <div className="flex-1">
                    <p className="font-semibold leading-tight">
                      {PRAYER_LABEL[p]}
                      {isCurrent && (
                        <span className="ml-2 align-middle text-[10px] font-medium text-pondok-500">
                          • waktu kini
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-pondok-900/50">{jam(schedule.times[p])}</p>
                  </div>
                  <span className={`pill ${style.cls}`}>{style.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <p className="px-5 py-2.5 text-center text-[11px] text-pondok-900/40">
          Ketuk tiap sholat untuk ganti status: Belum → Tepat → Telat → Qadha
        </p>
      </div>

      {/* Statistik kecil */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card flex items-center gap-3 px-4 py-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/20 text-gold-600">
            <FlameIcon size={22} />
          </div>
          <div>
            <p className="text-xl font-bold leading-none">{streak}</p>
            <p className="text-xs text-pondok-900/55">hari streak lengkap</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 px-4 py-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cheer/10 text-cheer text-lg font-bold">
            {qadhaCount}
          </div>
          <div>
            <p className="text-xl font-bold leading-none">{qadhaCount}</p>
            <p className="text-xs text-pondok-900/55">qadha hari ini</p>
          </div>
        </div>
      </div>

      <div className="card px-5 py-4 text-sm text-pondok-900/60">
        <p className="font-semibold text-pondok-900">📍 {profile.city}</p>
        <p className="mt-0.5 text-xs">
          Jadwal dihitung di perangkat (offline) · metode {profile.method} · madzhab{' '}
          {profile.madhab === 'hanafi' ? 'Hanafi' : 'Syafi’i'}
        </p>
      </div>
    </div>
  )
}
