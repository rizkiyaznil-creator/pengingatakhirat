import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import { supabase, isCloudEnabled } from './supabase'
import { useStore, snapshotOf } from '../store/useStore'
import { mergeSnapshots, pullRemote, pushRemote } from './sync'

export type SyncState = 'idle' | 'syncing' | 'synced' | 'error'

interface AuthStore {
  user: User | null
  ready: boolean
  syncState: SyncState
  lastSyncedAt: number | null
  signUpEmail: (email: string, password: string) => Promise<string | null>
  signInEmail: (email: string, password: string) => Promise<string | null>
  signInGoogle: () => Promise<string | null>
  signOut: () => Promise<void>
}

let syncing = false // cegah push saat sedang tarik/merge awal
let pushTimer: ReturnType<typeof setTimeout> | null = null

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  ready: !isCloudEnabled, // kalau cloud mati, langsung "ready"
  syncState: 'idle',
  lastSyncedAt: null,

  signUpEmail: async (email, password) => {
    if (!supabase) return 'Fitur cloud belum dikonfigurasi.'
    const { error } = await supabase.auth.signUp({ email, password })
    return error ? humanize(error.message) : null
  },

  signInEmail: async (email, password) => {
    if (!supabase) return 'Fitur cloud belum dikonfigurasi.'
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error ? humanize(error.message) : null
  },

  signInGoogle: async () => {
    if (!supabase) return 'Fitur cloud belum dikonfigurasi.'
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}` },
    })
    return error ? humanize(error.message) : null
  },

  signOut: async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    set({ user: null, syncState: 'idle' })
  },
}))

function humanize(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('invalid login')) return 'Email atau password salah.'
  if (m.includes('already registered')) return 'Email sudah terdaftar. Silakan masuk.'
  if (m.includes('password')) return 'Password minimal 6 karakter.'
  if (m.includes('email')) return 'Periksa kembali format emailmu.'
  return msg
}

// Tarik data cloud, gabung dengan lokal, lalu push hasil gabungan.
async function initialSync(userId: string) {
  if (!supabase) return
  syncing = true
  useAuth.setState({ syncState: 'syncing' })
  try {
    const remote = await pullRemote(userId)
    const local = snapshotOf(useStore.getState())
    const merged = remote ? mergeSnapshots(local, remote) : local
    useStore.getState().replaceData(merged)
    await pushRemote(userId, merged)
    useAuth.setState({ syncState: 'synced', lastSyncedAt: Date.now() })
  } catch {
    useAuth.setState({ syncState: 'error' })
  } finally {
    syncing = false
  }
}

function schedulePush() {
  const { user } = useAuth.getState()
  if (!user || syncing || !supabase) return
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(async () => {
    const u = useAuth.getState().user
    if (!u) return
    useAuth.setState({ syncState: 'syncing' })
    try {
      await pushRemote(u.id, snapshotOf(useStore.getState()))
      useAuth.setState({ syncState: 'synced', lastSyncedAt: Date.now() })
    } catch {
      useAuth.setState({ syncState: 'error' })
    }
  }, 1500)
}

// Dipanggil sekali dari main/App.
export function initAuth() {
  if (!supabase) return
  supabase.auth
    .getSession()
    .then(({ data }) => {
      const u = data.session?.user ?? null
      useAuth.setState({ user: u, ready: true })
      if (u) initialSync(u.id)
    })
    .catch(() => useAuth.setState({ ready: true }))

  supabase.auth.onAuthStateChange((event, session) => {
    const u = session?.user ?? null
    const prev = useAuth.getState().user
    useAuth.setState({ user: u, ready: true })
    if (u && (event === 'SIGNED_IN' || !prev)) initialSync(u.id)
    if (event === 'SIGNED_OUT') useAuth.setState({ syncState: 'idle' })
  })

  // Push otomatis (debounce) tiap data lokal berubah & sedang login
  useStore.subscribe(() => schedulePush())
}
