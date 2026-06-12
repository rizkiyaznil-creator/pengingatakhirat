import { useMemo } from 'react'
import { useStore } from '../store/useStore'
import { addDays, dateKey } from '../lib/date'
import { FlameIcon } from '../components/icons'

const MONTH_OPTIONS = [1, 3, 6, 12]

function quranStreak(daily: Record<string, number>, today = new Date()): number {
  let streak = 0
  for (let i = 0; i < 400; i++) {
    const k = dateKey(addDays(today, -i))
    if ((daily[k] ?? 0) > 0) streak++
    else if (i === 0) continue
    else break
  }
  return streak
}

export default function Quran() {
  const quran = useStore((s) => s.quran)
  const quranDaily = useStore((s) => s.quranDaily)
  const addPages = useStore((s) => s.addQuranPages)
  const setMonths = useStore((s) => s.setQuranTargetMonths)
  const resetKhatam = useStore((s) => s.resetKhatam)

  const today = dateKey()
  const todayPages = quranDaily[today] ?? 0
  const pct = Math.min(100, Math.round((quran.read / quran.target) * 100))
  const streak = useMemo(() => quranStreak(quranDaily), [quranDaily])

  const perDayTarget = Math.ceil(quran.target / (quran.targetMonths * 30))
  const remaining = quran.target - quran.read

  return (
    <div className="space-y-4">
      <header className="pt-2">
        <h1 className="text-xl font-bold">Khatam Qur’an</h1>
        <p className="text-sm text-ocean-900/60">Mushaf standar Madinah · 604 halaman</p>
      </header>

      {/* Kartu progres */}
      <div className="card overflow-hidden">
        <div className="bg-ocean-700 px-5 py-4 text-sand-50">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide text-sand-50/70">Khatam berjalan</p>
            {streak > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-ocean-800/60 px-2.5 py-1 text-xs font-semibold">
                <FlameIcon size={13} /> {streak} hari
              </span>
            )}
          </div>
          <p className="mt-1 text-4xl font-bold">
            {quran.read}
            <span className="text-xl font-medium text-sand-50/70"> / {quran.target} hal</span>
          </p>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-ocean-800/50">
            <div className="h-full rounded-full bg-sand-50 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-sand-50/70">
            {pct}% selesai · sisa {remaining} halaman · hari ini {todayPages} hal
          </p>
        </div>

        {/* Quick add */}
        <div className="px-5 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ocean-900/45">
            Tambah halaman terbaca
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[1, 5, 10].map((n) => (
              <button
                key={n}
                onClick={() => addPages(n)}
                className="rounded-xl bg-ocean-100 py-3 text-sm font-bold text-ocean-700 transition active:scale-95"
              >
                +{n} hal
              </button>
            ))}
          </div>
          {todayPages > 0 && (
            <button
              onClick={() => addPages(-1)}
              className="mt-2 w-full rounded-xl bg-sand-200 py-2 text-xs font-medium text-ocean-900/60 transition active:scale-95"
            >
              − Batalkan 1 halaman
            </button>
          )}
        </div>
      </div>

      {/* Target khatam */}
      <div className="card px-5 py-4">
        <p className="mb-2 text-sm font-semibold">Target khatam</p>
        <div className="grid grid-cols-4 gap-2">
          {MONTH_OPTIONS.map((m) => (
            <button
              key={m}
              onClick={() => setMonths(m)}
              className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                quran.targetMonths === m ? 'bg-ocean-700 text-sand-50' : 'bg-sand-200 text-ocean-900/60'
              }`}
            >
              {m} bln
            </button>
          ))}
        </div>
        <p className="mt-2.5 text-xs text-ocean-900/55">
          Untuk khatam dalam {quran.targetMonths} bulan: target ±<b>{perDayTarget} halaman/hari</b>.
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card px-4 py-3.5">
          <p className="text-2xl font-bold leading-none text-ocean-700">{quran.khatamCount}×</p>
          <p className="mt-1 text-xs text-ocean-900/55">khatam selesai</p>
        </div>
        <div className="card px-4 py-3.5">
          <p className="text-2xl font-bold leading-none text-ocean-700">{quran.lifetime}</p>
          <p className="mt-1 text-xs text-ocean-900/55">total halaman seumur pakai</p>
        </div>
      </div>

      <button
        onClick={resetKhatam}
        className="w-full rounded-2xl border border-sand-300 py-3 text-sm font-medium text-ocean-900/55 transition active:scale-[0.98]"
      >
        Mulai khatam baru (reset ke 0)
      </button>
    </div>
  )
}
