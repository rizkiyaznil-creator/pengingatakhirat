import { useState } from 'react'
import { useStore } from '../store/useStore'
import { getCurrentLocation } from '../lib/geo'
import {
  METHOD_LABEL,
  type MethodKey,
  type MadhabKey,
} from '../lib/prayer'
import { LocationIcon } from '../components/icons'
import AccountCard from '../components/AccountCard'
import InstallCard from '../components/InstallCard'
import NotifCard from '../components/NotifCard'
import type { ThemeMode } from '../store/useStore'

const THEME_OPTS: { id: ThemeMode; label: string; icon: string }[] = [
  { id: 'system', label: 'Sistem', icon: '🖥️' },
  { id: 'light', label: 'Terang', icon: '☀️' },
  { id: 'dark', label: 'Gelap', icon: '🌙' },
]

const UI_SCALES: { v: number; label: string }[] = [
  { v: 0.9, label: 'Kecil' },
  { v: 1, label: 'Normal' },
  { v: 1.15, label: 'Besar' },
  { v: 1.3, label: 'Lebih' },
  { v: 1.45, label: 'Jumbo' },
]
const ARABIC_SCALES: { v: number; label: string }[] = [
  { v: 1, label: 'Normal' },
  { v: 1.25, label: 'Besar' },
  { v: 1.5, label: 'Lebih' },
  { v: 1.8, label: 'Jumbo' },
]

export default function Profile() {
  const profile = useStore((s) => s.profile)
  const setProfile = useStore((s) => s.setProfile)
  const theme = useStore((s) => s.theme)
  const setTheme = useStore((s) => s.setTheme)
  const uiScale = useStore((s) => s.uiScale)
  const setUiScale = useStore((s) => s.setUiScale)
  const arabicScale = useStore((s) => s.arabicScale)
  const setArabicScale = useStore((s) => s.setArabicScale)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  async function relocate() {
    setBusy(true)
    setMsg('')
    try {
      const g = await getCurrentLocation()
      setProfile({ lat: g.lat, lng: g.lng, ...(g.city ? { city: g.city } : {}) })
      setMsg('Lokasi diperbarui ✓')
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Gagal memperbarui lokasi')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-4">
      <header className="pt-2">
        <h1 className="text-xl font-bold">Profil & Pengaturan</h1>
      </header>

      <AccountCard />

      <InstallCard />

      <NotifCard />

      <div className="card px-5 py-5">
        <label className="mb-1.5 block text-sm font-semibold">Nama panggilan</label>
        <input
          value={profile.name}
          onChange={(e) => setProfile({ name: e.target.value })}
          className="w-full rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3 outline-none focus:border-ocean-400"
        />
      </div>

      <div className="card space-y-4 px-5 py-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Kota</label>
          <input
            value={profile.city}
            onChange={(e) => setProfile({ city: e.target.value })}
            className="w-full rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3 outline-none focus:border-ocean-400"
          />
        </div>
        <button
          onClick={relocate}
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-ocean-300 bg-ocean-50 px-4 py-3 font-medium text-ocean-600 transition active:scale-[0.98] disabled:opacity-60"
        >
          <LocationIcon size={20} />
          {busy ? 'Mendeteksi…' : 'Perbarui lokasi otomatis'}
        </button>
        {msg && <p className="text-center text-xs text-ocean-600">{msg}</p>}
        <p className="text-center text-[11px] text-ocean-900/40">
          Koordinat: {profile.lat.toFixed(3)}, {profile.lng.toFixed(3)}
        </p>
      </div>

      <div className="card space-y-4 px-5 py-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Metode perhitungan</label>
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
          <label className="mb-1.5 block text-sm font-semibold">Madzhab (waktu Ashar)</label>
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

      <div className="card px-5 py-5">
        <p className="mb-2 text-sm font-semibold">Tampilan</p>
        <div className="grid grid-cols-3 gap-2">
          {THEME_OPTS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex flex-col items-center gap-1 rounded-2xl py-3 text-sm font-semibold transition ${
                theme === t.id ? 'bg-ocean-700 text-white' : 'bg-sand-200 text-ocean-900/60'
              }`}
            >
              <span className="text-lg">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ukuran teks — aksesibilitas */}
      <div className="card px-5 py-5">
        <p className="text-sm font-semibold">Ukuran teks</p>
        <p className="mt-0.5 text-xs text-ocean-900/55">Perbesar agar nyaman dibaca.</p>

        <p className="mb-1.5 mt-4 text-xs font-semibold text-ocean-900/60">Teks aplikasi</p>
        <div className="grid grid-cols-5 gap-1.5">
          {UI_SCALES.map((s) => (
            <button
              key={s.v}
              onClick={() => setUiScale(s.v)}
              className={`rounded-xl py-2 text-xs font-semibold transition ${
                uiScale === s.v ? 'bg-ocean-700 text-white' : 'bg-sand-200 text-ocean-900/60'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <p className="mb-1.5 mt-4 text-xs font-semibold text-ocean-900/60">Teks Arab</p>
        <div className="grid grid-cols-4 gap-1.5">
          {ARABIC_SCALES.map((s) => (
            <button
              key={s.v}
              onClick={() => setArabicScale(s.v)}
              className={`rounded-xl py-2 text-xs font-semibold transition ${
                arabicScale === s.v ? 'bg-ocean-700 text-white' : 'bg-sand-200 text-ocean-900/60'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Pratinjau */}
        <div className="mt-4 rounded-2xl bg-sand-100 px-4 py-3">
          <p className="font-arabic arabic-text text-right leading-loose text-ocean-900" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="mt-1 text-sm text-ocean-900/70">Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang.</p>
        </div>
      </div>

      <div className="card px-5 py-4">
        <p className="text-sm font-semibold">Tentang</p>
        <p className="mt-1 text-xs leading-relaxed text-ocean-900/55">
          Dawam — pengingat ibadah & pencatat amal harian. Data tersimpan di perangkatmu (privat,
          bisa dipakai offline). Sinkronisasi antar perangkat & adzan otomatis menyusul di
          pembaruan berikutnya, insyaAllah.
        </p>
        <p className="mt-2 text-[11px] text-ocean-900/35">Versi 0.1.0 · Fase 1</p>
      </div>
    </div>
  )
}
