import { useMemo, useState } from 'react'
import { useStore } from '../store/useStore'
import { useUi } from '../lib/useUi'
import { useNow } from '../lib/useNow'
import { addDays, tanggalPanjang } from '../lib/date'
import {
  consistency,
  overallStreak,
  prayerStreak,
  habitStreak,
  trend7,
} from '../lib/stats'
import { haidSummary } from '../lib/haid'
import { FlameIcon, TrendUpIcon, PlusIcon } from '../components/icons'
import { SHORTCUTS, SHORTCUT_BY_ID, type Shortcut } from '../lib/shortcuts'
import { useBackable, navBack } from '../lib/navStack'

function salam(d: Date): string {
  const h = d.getHours()
  if (h < 4) return 'Selamat malam'
  if (h < 11) return 'Selamat pagi'
  if (h < 15) return 'Selamat siang'
  if (h < 18) return 'Selamat sore'
  return 'Selamat malam'
}

export default function Dashboard() {
  const now = useNow(60_000)
  const profile = useStore((s) => s.profile)
  const prayerLogs = useStore((s) => s.prayerLogs)
  const habitLogs = useStore((s) => s.habitLogs)
  const habits = useStore((s) => s.habits)
  const haidLogs = useStore((s) => s.haidLogs)
  const shortcutIds = useStore((s) => s.dashboardShortcuts)
  const setTab = useUi((s) => s.setTab)
  const goSub = useUi((s) => s.goSub)
  const isFemale = profile.gender === 'female'
  const haid = useMemo(() => haidSummary(haidLogs, now), [haidLogs, now])
  const [editing, setEditing] = useState(false)
  useBackable(editing, () => setEditing(false))

  function goShortcut(sc: Shortcut) {
    if (sc.kind === 'tab') setTab(sc.target as 'sholat' | 'habit')
    else goSub(sc.target)
  }

  const shortcuts = shortcutIds.map((id) => SHORTCUT_BY_ID[id]).filter(Boolean) as Shortcut[]

  const stats = useMemo(() => {
    const cur = consistency(30, prayerLogs, habitLogs, habits, now, haidLogs)
    const prev = consistency(30, prayerLogs, habitLogs, habits, addDays(now, -30), haidLogs)
    const streak = overallStreak(prayerLogs, habitLogs, habits, now, haidLogs)
    const trend = trend7(prayerLogs, habitLogs, habits, now, haidLogs)
    const avgTrend =
      trend.reduce((a, t) => a + t.done, 0) / Math.max(1, trend.length)
    const totalItems = trend[0]?.total ?? 0

    // Streak terpanjang (saat ini) per ibadah
    const items: { label: string; days: number }[] = [
      { label: 'Sholat 5 waktu', days: prayerStreak(prayerLogs, now, haidLogs) },
      ...habits
        .filter((h) => !h.archived)
        .map((h) => ({ label: h.name, days: habitStreak(h, habitLogs, now) })),
    ]
    items.sort((a, b) => b.days - a.days)

    return { cur, prev, delta: cur - prev, streak, trend, avgTrend, totalItems, top: items.slice(0, 3) }
  }, [prayerLogs, habitLogs, habits, now, haidLogs])

  const maxBar = Math.max(stats.totalItems, ...stats.trend.map((t) => t.done), 1)

  return (
    <div className="space-y-4">
      <header className="pt-2">
        <p className="text-sm text-ocean-900/55">{salam(now)},</p>
        <h1 className="text-2xl font-bold">{profile.name || 'Sahabat'} 👋</h1>
        <p className="text-xs text-ocean-900/45">{tanggalPanjang(now)}</p>
      </header>

      {/* Insights utama */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ocean-900/45">
            Insights · 30 hari
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-ocean-100 px-2.5 py-1 text-xs font-semibold text-ocean-600">
            <FlameIcon size={14} /> Streak {stats.streak}
          </span>
        </div>

        <div className="m-4 rounded-2xl bg-ocean-700 px-5 py-4 text-white">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/80">Konsistensi bulan ini</p>
            {stats.delta !== 0 && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  stats.delta > 0 ? 'bg-ocean-500/40' : 'bg-cheer/30'
                }`}
              >
                <TrendUpIcon size={13} /> {stats.delta > 0 ? '+' : ''}
                {stats.delta}%
              </span>
            )}
          </div>
          <p className="mt-1 text-5xl font-bold">
            {stats.cur}
            <span className="text-2xl font-medium text-white/70">%</span>
          </p>
          <p className="mt-1 text-xs text-white/70">
            {stats.prev > 0
              ? `vs ${stats.prev}% bulan lalu — ${
                  stats.delta >= 0 ? 'grafiknya lagi naik 💧' : 'ayo rapatkan lagi 💪'
                }`
              : 'Catat amal pertamamu hari ini 💧'}
          </p>
        </div>

        {/* Tren 7 hari */}
        <div className="px-5 pb-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-ocean-900/45">
              Tren 7 hari
            </p>
            <p className="text-xs text-ocean-900/55">
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
                        isToday ? 'bg-ocean-600' : 'bg-ocean-200'
                      }`}
                      style={{ height: h }}
                      title={`${t.done}/${t.total}`}
                    />
                  </div>
                  <span className={`text-[10px] ${isToday ? 'font-bold text-ocean-600' : 'text-ocean-900/45'}`}>
                    {t.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Catatan haid (khusus perempuan) */}
      {isFemale && (
        <button
          onClick={() => goSub('haid')}
          className="card flex w-full items-center gap-3 px-5 py-4 text-left transition active:scale-[0.99]"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clay-400/20 text-xl">
            🌸
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold leading-tight">Catatan Haid</p>
            <p className="text-xs text-ocean-900/55">
              {haid.isToday
                ? `Sedang haid — hari ke-${haid.currentDay ?? 1}`
                : haid.nextStart && haid.daysToNext != null
                  ? haid.daysToNext >= 0
                    ? `Prakiraan berikutnya ${haid.daysToNext} hari lagi`
                    : `Prakiraan terlewat ${Math.abs(haid.daysToNext)} hari`
                  : 'Ketuk untuk mulai mencatat'}
            </p>
          </div>
          {haid.avgCycle != null && (
            <span className="shrink-0 rounded-full bg-clay-400/20 px-2.5 py-1 text-xs font-semibold text-clay-600">
              siklus ~{haid.avgCycle}h
            </span>
          )}
        </button>
      )}

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
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand-200">
                  <div className="h-full rounded-full bg-ocean-500" style={{ width: `${w}%` }} />
                </div>
                <span className="w-10 text-right text-sm font-semibold text-ocean-600">
                  {it.days}d
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Aksi cepat */}
      {/* Akses cepat (favorit yang bisa diatur) */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-ocean-900/45">
          ⚡ Akses cepat
        </p>
        <button onClick={() => setEditing(true)} className="text-xs font-semibold text-ocean-600">
          Atur
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {shortcuts.map((sc) => (
          <button
            key={sc.id}
            onClick={() => goShortcut(sc)}
            className="card flex items-center gap-3 px-4 py-4 text-left transition active:scale-[0.98]"
          >
            <span className="text-2xl">{sc.icon}</span>
            <div className="min-w-0">
              <p className="font-semibold leading-tight">{sc.label}</p>
              <p className="truncate text-xs text-ocean-900/55">{sc.sub}</p>
            </div>
          </button>
        ))}
        <button
          onClick={() => setEditing(true)}
          className="flex items-center justify-center gap-1.5 rounded-xl2 border border-dashed border-sand-300 px-4 py-4 text-sm font-semibold text-ocean-600 transition active:scale-[0.98]"
        >
          <PlusIcon size={18} /> Tambah
        </button>
      </div>

      <p className="px-2 pb-2 text-center text-xs italic text-ocean-900/40">
        “Lihat progresmu apa adanya — dari catatan, bukan dari perasaan.”
      </p>

      {editing && <EditShortcuts onClose={navBack} />}
    </div>
  )
}

function EditShortcuts({ onClose }: { onClose: () => void }) {
  const selected = useStore((s) => s.dashboardShortcuts)
  const setShortcuts = useStore((s) => s.setDashboardShortcuts)

  function toggle(id: string) {
    if (selected.includes(id)) setShortcuts(selected.filter((x) => x !== id))
    else setShortcuts([...selected, id])
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-sand-50 p-5"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-sand-300" />
        <h2 className="text-lg font-bold">Atur akses cepat</h2>
        <p className="mb-4 mt-0.5 text-sm text-ocean-900/60">Pilih pintasan yang muncul di Beranda.</p>

        <div className="space-y-2">
          {SHORTCUTS.map((sc) => {
            const on = selected.includes(sc.id)
            return (
              <button
                key={sc.id}
                onClick={() => toggle(sc.id)}
                className="flex w-full items-center gap-3 rounded-2xl bg-sand-100 px-4 py-3 text-left transition active:scale-[0.99]"
              >
                <span className="text-2xl">{sc.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-tight">{sc.label}</p>
                  <p className="truncate text-xs text-ocean-900/55">{sc.sub}</p>
                </div>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                    on ? 'border-ocean-700 bg-ocean-700 text-white' : 'border-sand-300 text-transparent'
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                </span>
              </button>
            )
          })}
        </div>

        <button onClick={onClose} className="btn-primary mt-5 w-full">Selesai</button>
      </div>
    </div>
  )
}
