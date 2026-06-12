import { useState } from 'react'
import { useAuth, type SyncState, resetAccountData } from '../lib/useAuth'
import { isCloudEnabled } from '../lib/supabase'

const SYNC_LABEL: Record<SyncState, string> = {
  idle: 'Menunggu',
  syncing: 'Menyinkronkan…',
  synced: 'Tersinkron ✓',
  error: 'Offline / gagal sinkron',
}

export default function AccountCard() {
  const { user, syncState, signOut } = useAuth()
  const [confirming, setConfirming] = useState(false)

  // Cloud belum dikonfigurasi (dev) — info ringan.
  if (!isCloudEnabled) {
    return (
      <div className="card px-5 py-4">
        <p className="text-sm font-semibold">☁️ Sinkronisasi antar perangkat</p>
        <p className="mt-1 text-xs leading-relaxed text-ocean-900/55">
          Belum aktif. Data tersimpan hanya di perangkat ini.
        </p>
      </div>
    )
  }

  if (!user) return null // saat wajib login, kondisi ini tak terjadi di dalam app

  const dotColor =
    syncState === 'synced' ? 'bg-ocean-500'
    : syncState === 'error' ? 'bg-clay-500'
    : 'bg-clay-400'

  return (
    <div className="card px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ocean-100 text-lg font-bold uppercase text-ocean-600">
          {(user.email ?? '?').charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{user.email}</p>
          <p className="flex items-center gap-1.5 text-xs text-ocean-900/55">
            <span className={`h-2 w-2 rounded-full ${dotColor}`} />
            {SYNC_LABEL[syncState]}
          </p>
        </div>
        <button
          onClick={signOut}
          className="rounded-xl bg-sand-200 px-3 py-2 text-sm font-medium text-ocean-900/70 transition active:scale-95"
        >
          Keluar
        </button>
      </div>

      {/* Zona bahaya: reset data */}
      <div className="mt-4 border-t border-sand-200 pt-3">
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="text-xs font-medium text-cheer"
          >
            Hapus semua data & mulai dari nol
          </button>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-ocean-900/60">Yakin hapus semua catatan?</span>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirming(false)}
                className="rounded-lg bg-sand-200 px-3 py-1.5 text-xs font-medium text-ocean-900/70"
              >
                Batal
              </button>
              <button
                onClick={async () => {
                  await resetAccountData()
                  setConfirming(false)
                }}
                className="rounded-lg bg-cheer px-3 py-1.5 text-xs font-semibold text-white"
              >
                Hapus
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
