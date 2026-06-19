import { useMemo, useState } from 'react'
import { useStore, type PrayerStatus } from '../store/useStore'
import {
  getSchedule,
  countdown,
  PRAYERS,
  PRAYER_LABEL,
  RAWATIB,
  RAWATIB_TOTAL,
  METHOD_LABEL,
  type PrayerName,
  type RawatibSlot,
  type MethodKey,
  type MadhabKey,
} from '../lib/prayer'
import { dateKey, jam, tanggalPanjang } from '../lib/date'
import { useNow } from '../lib/useNow'
import { getCurrentLocation } from '../lib/geo'
import { prayerStreak, rawatibStreak } from '../lib/stats'
import { FlameIcon, LocationIcon } from '../components/icons'

const RAWATIB_KEYS = RAWATIB.map((r) => r.key)
const RAWATIB_BY_PRAYER = PRAYERS.reduce(
  (acc, p) => {
    acc[p] = RAWATIB.filter((r) => r.prayer === p)
    return acc
  },
  {} as Record<PrayerName, RawatibSlot[]>,
)

const STATUS_STYLE: Record<PrayerStatus, { label: string; cls: string; dot: string }> = {
  pending: { label: 'Belum', cls: 'bg-sand-200 text-ocean-900/50', dot: 'bg-ocean-900/20' },
  ontime: { label: 'Tepat', cls: 'bg-ocean-100 text-ocean-600', dot: 'bg-ocean-500' },
  late: { label: 'Telat', cls: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  qadha: { label: 'Qadha', cls: 'bg-cheer/10 text-cheer', dot: 'bg-cheer' },
}

export default function Sholat() {
  const now = useNow()
  const profile = useStore((s) => s.profile)
  const setProfile = useStore((s) => s.setProfile)
  const prayerLogs = useStore((s) => s.prayerLogs)
  const cyclePrayer = useStore((s) => s.cyclePrayer)
  const rawatibLogs = useStore((s) => s.rawatibLogs)
  const toggleRawatib = useStore((s) => s.toggleRawatib)
  const dzikirLogs = useStore((s) => s.dzikirLogs)
  const toggleDzikirSholat = useStore((s) => s.toggleDzikirSholat)
  const haidLogs = useStore((s) => s.haidLogs)
  const toggleHaid = useStore((s) => s.toggleHaid)
  const today = dateKey(now)
  const isFemale = profile.gender === 'female'
  const isHaidToday = isFemale && !!haidLogs[today]

  // Pengaturan lokasi & jadwal (dipindah dari Profil ke sini)
  const [locBusy, setLocBusy] = useState(false)
  const [locMsg, setLocMsg] = useState('')
  async function relocate() {
    setLocBusy(true)
    setLocMsg('')
    try {
      const g = await getCurrentLocation()
      setProfile({ lat: g.lat, lng: g.lng, ...(g.city ? { city: g.city } : {}) })
      setLocMsg('Lokasi diperbarui ✓')
    } catch (e) {
      setLocMsg(e instanceof Error ? e.message : 'Gagal memperbarui lokasi')
    } finally {
      setLocBusy(false)
    }
  }

  const schedule = useMemo(
    () => getSchedule(profile.lat, profile.lng, profile.method, profile.madhab, now),
    [profile.lat, profile.lng, profile.method, profile.madhab, now],
  )

  const log = prayerLogs[today] ?? {}
  const done = PRAYERS.filter((p) => log[p] && log[p] !== 'pending').length
  const onTime = PRAYERS.filter((p) => log[p] === 'ontime').length
  const onTimeRate = done === 0 ? 0 : Math.round((onTime / done) * 100)
  const qadhaCount = PRAYERS.filter((p) => log[p] === 'qadha').length
  const streak = prayerStreak(prayerLogs, now, haidLogs)

  const rawatibToday = rawatibLogs[today] ?? {}
  const rawatibDone = RAWATIB_KEYS.filter((k) => rawatibToday[k]).length
  const rStreak = rawatibStreak(rawatibLogs, RAWATIB_KEYS, now)

  const dzikirToday = dzikirLogs[today] ?? {}
  const dzikirDone = PRAYERS.filter((p) => dzikirToday[p]).length
  const dStreak = rawatibStreak(dzikirLogs, PRAYERS, now)

  return (
    <div className="space-y-4">
      <header className="pt-2">
        <h1 className="text-xl font-bold">Sholat 5 Waktu</h1>
        <p className="text-sm text-ocean-900/60">{tanggalPanjang(now)}</p>
      </header>

      {/* Penanda haid (khusus perempuan) */}
      {isFemale && (
        <div className="card flex items-center gap-3 px-5 py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clay-400/20 text-xl">
            🌸
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold leading-tight">Sedang haid</p>
            <p className="text-xs text-ocean-900/55">
              {isHaidToday ? 'Hari ini libur sholat — tidak dicatat & tidak qadha' : 'Aktifkan saat sedang haid'}
            </p>
          </div>
          <button
            onClick={() => toggleHaid(today)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition ${
              isHaidToday ? 'bg-clay-500' : 'bg-sand-300'
            }`}
            aria-label="Tandai sedang haid"
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-all ${
                isHaidToday ? 'left-[1.4rem]' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      )}

      {/* Kartu ringkasan hari ini */}
      <div className="card overflow-hidden">
        <div className={`px-5 py-4 text-white ${isHaidToday ? 'bg-clay-500' : 'bg-ocean-700'}`}>
          {isHaidToday ? (
            <div className="py-1">
              <p className="text-xs uppercase tracking-wide text-white/70">Hari ini</p>
              <p className="text-2xl font-bold">Libur sholat 🌸</p>
              <p className="mt-0.5 text-sm text-white/85">
                Sedang haid — sholat tidak wajib dan tidak diqadha. Catatan tersimpan di laporan haid.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/70">Hari ini</p>
                  <p className="text-3xl font-bold">
                    {done}
                    <span className="text-lg font-medium text-white/70">/5 sholat</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/70">On-time rate</p>
                  <p className="text-2xl font-bold">{onTimeRate}%</p>
                </div>
              </div>
              {schedule.next && (
                <div className="mt-3 flex items-center justify-between rounded-xl bg-ocean-800/60 px-3 py-2 text-sm">
                  <span className="text-white/80">
                    Berikutnya: <b>{PRAYER_LABEL[schedule.next]}</b> {jam(schedule.nextTime!)}
                  </span>
                  <span className="font-semibold">{countdown(schedule.nextTime, now)}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Daftar sholat */}
        <ul className="divide-y divide-sand-200">
          {PRAYERS.map((p) => {
            const st = (log[p] ?? 'pending') as PrayerStatus
            const style = STATUS_STYLE[st]
            const isCurrent = schedule.current === p && schedule.next !== p
            const slots = RAWATIB_BY_PRAYER[p]
            return (
              <li key={p} className="px-5 py-2.5">
                {isHaidToday ? (
                  <div className="flex w-full items-center gap-3 py-1 opacity-70">
                    <span className="h-2.5 w-2.5 rounded-full bg-clay-400" />
                    <div className="flex-1">
                      <p className="font-semibold leading-tight">{PRAYER_LABEL[p]}</p>
                      <p className="text-xs text-ocean-900/50">{jam(schedule.times[p])}</p>
                    </div>
                    <span className="pill bg-clay-400/20 text-clay-600">Libur</span>
                  </div>
                ) : (
                <>
                <button
                  onClick={() => cyclePrayer(today, p)}
                  className="flex w-full items-center gap-3 rounded-xl py-1 text-left transition active:bg-sand-100"
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                  <div className="flex-1">
                    <p className="font-semibold leading-tight">
                      {PRAYER_LABEL[p]}
                      {isCurrent && (
                        <span className="ml-2 align-middle text-[10px] font-medium text-ocean-500">
                          • waktu kini
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-ocean-900/50">{jam(schedule.times[p])}</p>
                  </div>
                  <span className={`pill ${style.cls}`}>{style.label}</span>
                </button>

                {/* Chip sunnah rawatib & dzikir ba'da sholat */}
                <div className="mt-1.5 flex flex-wrap gap-1.5 pl-5">
                  {slots.map((r) => {
                    const on = !!rawatibToday[r.key]
                    return (
                      <button
                        key={r.key}
                        onClick={() => toggleRawatib(today, r.key)}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition active:scale-95 ${
                          on ? 'bg-ocean-100 text-ocean-600' : 'bg-sand-100 text-ocean-900/45'
                        }`}
                      >
                        <span>{on ? '✓' : '+'}</span>
                        {r.jenis === 'qobliyah' ? 'Qobliyah' : 'Ba’diyah'}
                      </button>
                    )
                  })}
                  {(() => {
                    const on = !!dzikirToday[p]
                    return (
                      <button
                        onClick={() => toggleDzikirSholat(today, p)}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition active:scale-95 ${
                          on ? 'bg-clay-400/20 text-clay-600' : 'bg-sand-100 text-ocean-900/45'
                        }`}
                      >
                        <span>{on ? '✓' : '+'}</span>
                        Dzikir
                      </button>
                    )
                  })()}
                </div>
                </>
                )}
              </li>
            )
          })}
        </ul>
        <p className="px-5 py-2.5 text-center text-[11px] text-ocean-900/40">
          Ketuk sholat untuk ganti status · ketuk chip untuk catat rawatib & dzikir
        </p>
      </div>

      {!isHaidToday && (
        <>
          {/* Ringkasan rawatib */}
          <div className="card flex items-center gap-3 px-5 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ocean-100 text-base font-bold text-ocean-600">
              {rawatibDone}/{RAWATIB_TOTAL}
            </div>
            <div className="flex-1">
              <p className="font-semibold leading-tight">Sunnah rawatib hari ini</p>
              <p className="text-xs text-ocean-900/55">
                {rawatibDone === RAWATIB_TOTAL ? 'Lengkap, masyaAllah! 🌿' : `${RAWATIB_TOTAL - rawatibDone} sunnah lagi`}
                {rStreak > 0 && ` · streak ${rStreak} hari`}
              </p>
            </div>
          </div>

          {/* Ringkasan dzikir ba'da sholat */}
          <div className="card flex items-center gap-3 px-5 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clay-400/20 text-base font-bold text-clay-600">
              {dzikirDone}/5
            </div>
            <div className="flex-1">
              <p className="font-semibold leading-tight">Dzikir setelah sholat</p>
              <p className="text-xs text-ocean-900/55">
                {dzikirDone === 5 ? 'Lengkap, masyaAllah! 📿' : `${5 - dzikirDone} sholat lagi`}
                {dStreak > 0 && ` · streak ${dStreak} hari`}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Statistik kecil */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card flex items-center gap-3 px-4 py-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-clay-400/20 text-clay-600">
            <FlameIcon size={22} />
          </div>
          <div>
            <p className="text-xl font-bold leading-none">{streak}</p>
            <p className="text-xs text-ocean-900/55">hari streak lengkap</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 px-4 py-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cheer/10 text-cheer text-lg font-bold">
            {qadhaCount}
          </div>
          <div>
            <p className="text-xl font-bold leading-none">{qadhaCount}</p>
            <p className="text-xs text-ocean-900/55">qadha hari ini</p>
          </div>
        </div>
      </div>

      {/* Pengaturan lokasi & jadwal sholat */}
      <div className="card space-y-4 px-5 py-5">
        <p className="flex items-center gap-1.5 text-sm font-semibold">📍 Lokasi & jadwal sholat</p>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ocean-900/60">Kota</label>
          <input
            value={profile.city}
            onChange={(e) => setProfile({ city: e.target.value })}
            className="w-full rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3 outline-none focus:border-ocean-400"
          />
        </div>

        <button
          onClick={relocate}
          disabled={locBusy}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-ocean-300 bg-ocean-50 px-4 py-3 font-medium text-ocean-600 transition active:scale-[0.98] disabled:opacity-60"
        >
          <LocationIcon size={20} />
          {locBusy ? 'Mendeteksi…' : 'Perbarui lokasi otomatis'}
        </button>
        {locMsg && <p className="text-center text-xs text-ocean-600">{locMsg}</p>}
        <p className="text-center text-[11px] text-ocean-900/40">
          Koordinat: {profile.lat.toFixed(3)}, {profile.lng.toFixed(3)} · dihitung offline di perangkat
        </p>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ocean-900/60">Metode perhitungan</label>
          <select
            value={profile.method}
            onChange={(e) => setProfile({ method: e.target.value as MethodKey })}
            className="w-full rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3 outline-none focus:border-ocean-400"
          >
            {(Object.keys(METHOD_LABEL) as MethodKey[]).map((m) => (
              <option key={m} value={m}>
                {METHOD_LABEL[m]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ocean-900/60">Madzhab (waktu Ashar)</label>
          <div className="grid grid-cols-2 gap-2">
            {(['syafii', 'hanafi'] as MadhabKey[]).map((m) => (
              <button
                key={m}
                onClick={() => setProfile({ madhab: m })}
                className={`rounded-2xl py-3 text-sm font-semibold transition ${
                  profile.madhab === m
                    ? 'bg-ocean-700 text-white'
                    : 'bg-sand-50 text-ocean-900/60 ring-1 ring-sand-200'
                }`}
              >
                {m === 'syafii' ? 'Syafi’i' : 'Hanafi'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
