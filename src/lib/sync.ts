import { supabase, STATE_TABLE } from './supabase'
import type { SyncSnapshot } from '../store/useStore'

// ====== Operasi cloud ======
// Model: satu dokumen JSON per akun. Saat login, data cloud (remote) yang dipakai
// (lihat initialSync di useAuth) — tidak ada penggabungan.

export async function pullRemote(userId: string): Promise<SyncSnapshot | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from(STATE_TABLE)
    .select('data')
    .eq('user_id', userId)
    .maybeSingle()
  if (error) throw error
  return (data?.data as SyncSnapshot) ?? null
}

export async function pushRemote(userId: string, snapshot: SyncSnapshot): Promise<void> {
  if (!supabase) return
  const { error } = await supabase.from(STATE_TABLE).upsert(
    { user_id: userId, data: snapshot, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' },
  )
  if (error) throw error
}
