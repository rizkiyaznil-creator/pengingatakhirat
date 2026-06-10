import { useState } from 'react'
import { useStore } from '../store/useStore'
import { getCurrentLocation } from '../lib/geo'
import { METHOD_LABEL, type MethodKey } from '../lib/prayer'
import { LocationIcon } from '../components/icons'

export default function Onboarding() {
  const setProfile = useStore((s) => s.setProfile)
  const profile = useStore((s) => s.profile)
  const [name, setName] = useState('')
  const [city, setCity] = useState(profile.city)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [method, setMethod] = useState<MethodKey>('Kemenag')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  async function detect() {
    setLoading(true)
    setErr('')
    try {
      const g = await getCurrentLocation()
      setCoords({ lat: g.lat, lng: g.lng })
      if (g.city) setCity(g.city)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Gagal mendeteksi lokasi')
    } finally {
      setLoading(false)
    }
  }

  function finish() {
    setProfile({
      name: name.trim() || 'Sahabat',
      city: city.trim() || 'Jakarta',
      method,
      ...(coords ?? {}),
      onboarded: true,
    })
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-16">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pondok-700 text-3xl">
          🌱
        </div>
        <p className="font-arabic text-2xl text-pondok-700" dir="rtl">
          إنّما الأعمال بالنيّات
        </p>
        <p className="mt-1 text-sm italic text-pondok-900/60">
          “Sesungguhnya amal itu tergantung niatnya” — HR. Bukhari
        </p>
        <h1 className="mt-5 text-2xl font-bold leading-tight">
          Hari ini, jadi <span className="text-pondok-600">lebih baik</span> dari kemarin.
        </h1>
        <p className="mt-2 text-sm text-pondok-900/60">
          Yuk kenalan dulu biar pengingat & jadwalmu pas.
        </p>
      </div>

      <label className="mb-1.5 block text-sm font-semibold">Nama panggilan</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="mis. Ahmad"
        className="mb-5 w-full rounded-2xl border border-cream-200 bg-white px-4 py-3.5 outline-none focus:border-pondok-400"
      />

      <label className="mb-1.5 block text-sm font-semibold">Lokasi (untuk jadwal sholat)</label>
      <button
        onClick={detect}
        disabled={loading}
        className="mb-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-pondok-300 bg-pondok-50 px-4 py-3.5 font-medium text-pondok-700 transition active:scale-[0.98] disabled:opacity-60"
      >
        <LocationIcon size={20} />
        {loading ? 'Mendeteksi…' : coords ? 'Lokasi terdeteksi ✓' : 'Deteksi lokasi otomatis'}
      </button>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Nama kota"
        className="mb-1 w-full rounded-2xl border border-cream-200 bg-white px-4 py-3.5 outline-none focus:border-pondok-400"
      />
      {err && <p className="mb-2 text-xs text-cheer">{err}</p>}
      {!coords && !err && (
        <p className="mb-2 text-xs text-pondok-900/50">
          Tanpa lokasi, jadwal memakai default kota di atas (Jakarta).
        </p>
      )}

      <label className="mb-1.5 mt-4 block text-sm font-semibold">Metode perhitungan</label>
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value as MethodKey)}
        className="mb-8 w-full rounded-2xl border border-cream-200 bg-white px-4 py-3.5 outline-none focus:border-pondok-400"
      >
        {(Object.keys(METHOD_LABEL) as MethodKey[]).map((m) => (
          <option key={m} value={m}>
            {METHOD_LABEL[m]}
          </option>
        ))}
      </select>

      <button onClick={finish} className="btn-primary mt-auto text-lg">
        ✨ Mulai tumbuh hari ini
      </button>
    </div>
  )
}
