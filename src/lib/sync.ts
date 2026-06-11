import { supabase, STATE_TABLE } from './supabase'
import type { SyncSnapshot, Habit } from '../store/useStore'

// ====== Merge dua snapshot tanpa kehilangan data ======
// Aturan: gabung union habit (per id), ambil nilai tertinggi untuk log angka,
// pertahankan status sholat non-pending, dan profil yang sudah onboarded.

function mergeHabits(a: Habit[], b: Habit[]): Habit[] {
  const byId = new Map<string, Habit>()
  for (const h of a) byId.set(h.id, h)
  for (const h of b) if (!byId.has(h.id)) byId.set(h.id, h)
  return [...byId.values()].sort((x, y) => x.order - y.order)
}

function mergePrayerLogs(
  a: SyncSnapshot['prayerLogs'],
  b: SyncSnapshot['prayerLogs'],
): SyncSnapshot['prayerLogs'] {
  const out: SyncSnapshot['prayerLogs'] = { ...a }
  for (const date of Object.keys(b)) {
    out[date] = { ...b[date], ...out[date] }
    // status non-pending menang bila salah satu sisi mencatatnya
    for (const p of Object.keys(b[date]) as (keyof (typeof b)[string])[]) {
      const av = a[date]?.[p]
      const bv = b[date]?.[p]
      out[date][p] = (av && av !== 'pending') ? av : bv
    }
  }
  return out
}

function mergeHabitLogs(
  a: SyncSnapshot['habitLogs'],
  b: SyncSnapshot['habitLogs'],
): SyncSnapshot['habitLogs'] {
  const out: SyncSnapshot['habitLogs'] = {}
  const dates = new Set([...Object.keys(a), ...Object.keys(b)])
  for (const d of dates) {
    out[d] = { ...a[d] }
    for (const id of Object.keys(b[d] ?? {})) {
      out[d][id] = Math.max(out[d][id] ?? 0, b[d][id])
    }
  }
  return out
}

export function mergeSnapshots(local: SyncSnapshot, remote: SyncSnapshot): SyncSnapshot {
  return {
    // profil: pilih yang sudah onboarded & punya nama; default ke remote
    profile: remote.profile?.onboarded ? remote.profile : local.profile,
    habits: mergeHabits(local.habits, remote.habits),
    prayerLogs: mergePrayerLogs(local.prayerLogs, remote.prayerLogs),
    habitLogs: mergeHabitLogs(local.habitLogs, remote.habitLogs),
    tasbih: {
      target: remote.tasbih?.target ?? local.tasbih.target,
      count: Math.max(local.tasbih.count, remote.tasbih?.count ?? 0),
      sets: Math.max(local.tasbih.sets, remote.tasbih?.sets ?? 0),
    },
  }
}

// ====== Operasi cloud ======

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
