import { useState } from 'react'
import { useAuth, type SyncState } from '../lib/useAuth'
import { isCloudEnabled } from '../lib/supabase'
import AuthSheet from './AuthSheet'

const SYNC_LABEL: Record<SyncState, string> = {
  idle: 'Menunggu',
  syncing: 'Menyinkronkan…',
  synced: 'Tersinkron ✓',
  error: 'Gagal sinkron',
}

export default function AccountCard() {
  const { user, syncState, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  // Cloud belum dikonfigurasi (env kosong) — beri info ringan.
  if (!isCloudEnabled) {
    return (
      <div className="card px-5 py-4">
        <p className="text-sm font-semibold">☁️ Sinkronisasi antar perangkat</p>
        <p className="mt-1 text-xs leading-relaxed text-ocean-900/55">
          Belum aktif. Saat ini data tersimpan hanya di perangkat ini.
        </p>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <div className="card px-5 py-5">
          <p className="text-sm font-semibold">☁️ Masuk untuk sinkron</p>
          <p className="mt-1 mb-3 text-xs leading-relaxed text-ocean-900/55">
            Simpan amalmu di cloud agar bisa dibuka di HP atau browser lain.
          </p>
          <button onClick={() => setOpen(true)} className="btn-primary w-full">
            Masuk / Daftar
          </button>
        </div>
        {open && <AuthSheet onClose={() => setOpen(false)} />}
      </>
    )
  }

  const dotColor =
    syncState === 'synced' ? 'bg-ocean-500'
    : syncState === 'error' ? 'bg-cheer'
    : 'bg-clay-500'

  return (
    <div className="card px-5 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ocean-100 text-lg font-bold uppercase text-ocean-700">
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
    </div>
  )
}
