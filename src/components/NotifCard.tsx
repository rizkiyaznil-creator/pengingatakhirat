import { useState } from 'react'
import { useStore } from '../store/useStore'
import { PRAYERS, PRAYER_LABEL, type PrayerName } from '../lib/prayer'
import { isCloudEnabled } from '../lib/supabase'
import { ADZAN_PRESETS, previewAdzan, stopPreview } from '../lib/adzan'
import {
  pushSupported,
  enableAdzanPush,
  disableAdzanPush,
  syncSubscription,
  testNotification,
  testServerPush,
} from '../lib/push'

const MINUTES = [0, 5, 10, 15]

export default function NotifCard() {
  const notif = useStore((s) => s.notif)
  const setNotif = useStore((s) => s.setNotif)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [preview, setPreview] = useState(false)

  const isCustomUrl =
    !!notif.adzanUrl && !ADZAN_PRESETS.some((p) => p.url === notif.adzanUrl)

  function pickPreset(url: string) {
    setNotif({ adzanUrl: url })
    if (notif.enabled) void syncSubscription()
  }

  async function doPreview() {
    if (preview) {
      stopPreview()
      setPreview(false)
      return
    }
    setMsg('')
    setPreview(true)
    try {
      await previewAdzan(notif.adzanUrl, () => setPreview(false))
    } catch {
      setPreview(false)
      setMsg('Audio tidak bisa diputar. Cek URL atau pakai nada bawaan.')
    }
  }

  async function toggleEnabled() {
    setMsg('')
    if (notif.enabled) {
      setNotif({ enabled: false })
      await disableAdzanPush()
      return
    }
    setBusy(true)
    const err = await enableAdzanPush()
    setBusy(false)
    if (err) setMsg(err)
    else {
      setNotif({ enabled: true })
      setMsg('Notifikasi adzan aktif ✓')
    }
  }

  function togglePrayer(p: PrayerName) {
    const next = notif.prayers.includes(p)
      ? notif.prayers.filter((x) => x !== p)
      : [...notif.prayers, p]
    setNotif({ prayers: next })
    if (notif.enabled) void syncSubscription()
  }

  function setMinutes(m: number) {
    setNotif({ minutesBefore: m })
    if (notif.enabled) void syncSubscription()
  }

  async function doTest() {
    setMsg('')
    const err = await testNotification()
    if (err) setMsg(err)
  }

  async function doServerTest() {
    setMsg('')
    setBusy(true)
    const err = await testServerPush()
    setBusy(false)
    setMsg(err ?? 'Push dari server terkirim ✓ Tunggu notifikasinya.')
  }

  return (
    <div className="card px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ocean-700 text-2xl">
          🔔
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-tight">Notifikasi Adzan</p>
          <p className="text-xs text-ocean-900/55">Pengingat waktu sholat</p>
        </div>
        <button
          onClick={toggleEnabled}
          disabled={busy || !pushSupported}
          className={`relative h-7 w-12 shrink-0 rounded-full transition disabled:opacity-50 ${
            notif.enabled ? 'bg-ocean-700' : 'bg-sand-300'
          }`}
          aria-label="Aktifkan notifikasi"
        >
          <span
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-all ${
              notif.enabled ? 'left-[1.4rem]' : 'left-0.5'
            }`}
          />
        </button>
      </div>

      {!pushSupported && (
        <p className="mt-3 text-xs text-clay-600">
          Browser ini tidak mendukung notifikasi. Coba Chrome (Android) atau Safari (iPhone, app terpasang).
        </p>
      )}

      {notif.enabled && (
        <div className="mt-4 space-y-4">
          {/* Pilih sholat */}
          <div>
            <p className="mb-1.5 text-xs font-semibold text-ocean-900/60">Ingatkan untuk</p>
            <div className="flex flex-wrap gap-1.5">
              {PRAYERS.map((p) => {
                const on = notif.prayers.includes(p)
                return (
                  <button
                    key={p}
                    onClick={() => togglePrayer(p)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      on ? 'bg-ocean-100 text-ocean-600' : 'bg-sand-200 text-ocean-900/45'
                    }`}
                  >
                    {on ? '✓ ' : ''}
                    {PRAYER_LABEL[p]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Menit sebelum */}
          <div>
            <p className="mb-1.5 text-xs font-semibold text-ocean-900/60">Ingatkan</p>
            <div className="grid grid-cols-4 gap-2">
              {MINUTES.map((m) => (
                <button
                  key={m}
                  onClick={() => setMinutes(m)}
                  className={`rounded-xl py-2 text-xs font-semibold transition ${
                    notif.minutesBefore === m ? 'bg-ocean-700 text-white' : 'bg-sand-200 text-ocean-900/60'
                  }`}
                >
                  {m === 0 ? 'Tepat' : `−${m}m`}
                </button>
              ))}
            </div>
          </div>

          {/* Suara */}
          <label className="flex items-center justify-between">
            <span className="text-sm">🔊 Putar adzan saat app terbuka</span>
            <input
              type="checkbox"
              checked={notif.sound}
              onChange={(e) => setNotif({ sound: e.target.checked })}
              className="h-5 w-5 accent-ocean-700"
            />
          </label>

          {notif.sound && (
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-ocean-900/60">Suara adzan</p>
              <div className="flex flex-wrap gap-1.5">
                {ADZAN_PRESETS.map((p) => {
                  const on = notif.adzanUrl === p.url
                  return (
                    <button
                      key={p.id}
                      onClick={() => pickPreset(p.url)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        on ? 'bg-ocean-100 text-ocean-600' : 'bg-sand-200 text-ocean-900/45'
                      }`}
                    >
                      {on ? '✓ ' : ''}
                      {p.label}
                    </button>
                  )
                })}
                {isCustomUrl && (
                  <span className="rounded-full bg-ocean-100 px-3 py-1.5 text-xs font-semibold text-ocean-600">
                    ✓ URL sendiri
                  </span>
                )}
              </div>

              <button
                onClick={doPreview}
                className="rounded-xl border border-ocean-300 bg-ocean-50 px-3 py-1.5 text-xs font-semibold text-ocean-600 transition active:scale-[0.98]"
              >
                {preview ? '■ Hentikan' : '▶︎ Dengar'}
              </button>

              <input
                value={notif.adzanUrl}
                onChange={(e) => setNotif({ adzanUrl: e.target.value.trim() })}
                placeholder="atau tempel URL audio adzan sendiri (.mp3)"
                className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2.5 text-xs outline-none focus:border-ocean-400"
              />
            </div>
          )}

          {!isCloudEnabled && (
            <p className="text-[11px] text-clay-600">
              Notifikasi saat app tertutup butuh server push. Sekarang aktif saat app terbuka.
            </p>
          )}
        </div>
      )}

      {pushSupported && (
        <button
          onClick={doTest}
          className="mt-4 w-full rounded-2xl border border-ocean-300 bg-ocean-50 py-2.5 text-sm font-semibold text-ocean-600 transition active:scale-[0.98]"
        >
          Kirim notifikasi uji
        </button>
      )}

      {pushSupported && isCloudEnabled && notif.enabled && (
        <button
          onClick={doServerTest}
          disabled={busy}
          className="mt-2 w-full rounded-2xl border border-ocean-700 bg-ocean-700 py-2.5 text-sm font-semibold text-white transition active:scale-[0.98] disabled:opacity-50"
        >
          Tes push server
        </button>
      )}

      {msg && <p className="mt-3 text-center text-xs text-ocean-600">{msg}</p>}
    </div>
  )
}
