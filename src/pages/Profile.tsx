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

export default function Profile() {
  const profile = useStore((s) => s.profile)
  const setProfile = useStore((s) => s.setProfile)
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

      <div className="card px-5 py-5">
        <label className="mb-1.5 block text-sm font-semibold">Nama panggilan</label>
        <input
          value={profile.name}
          onChange={(e) => setProfile({ name: e.target.value })}
          className="w-full rounded-2xl border border-sand-200 bg-white px-4 py-3 outline-none focus:border-ocean-400"
        />
      </div>

      <div className="card space-y-4 px-5 py-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Kota</label>
          <input
            value={profile.city}
            onChange={(e) => setProfile({ city: e.target.value })}
            className="w-full rounded-2xl border border-sand-200 bg-white px-4 py-3 outline-none focus:border-ocean-400"
          />
        </div>
        <button
          onClick={relocate}
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-ocean-300 bg-ocean-50 px-4 py-3 font-medium text-ocean-700 transition active:scale-[0.98] disabled:opacity-60"
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
            className="w-full rounded-2xl border border-sand-200 bg-white px-4 py-3 outline-none focus:border-ocean-400"
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
                    ? 'bg-ocean-700 text-sand-50'
                    : 'bg-white text-ocean-900/60 ring-1 ring-sand-200'
                }`}
              >
                {m === 'syafii' ? 'Syafi’i' : 'Hanafi'}
              </button>
            ))}
          </div>
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
