import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Kredensial diisi lewat env saat build (lihat .env.example & workflow Actions).
// Jika kosong, fitur cloud non-aktif dan aplikasi tetap jalan lokal.

// Bersihkan nilai env yang mungkin "kotor" (mis. seluruh blok .env tertempel
// ke dalam satu secret). Ekstrak nilai sebenarnya bila ada; jika sudah bersih,
// pakai apa adanya.
function cleanUrl(raw?: string): string | undefined {
  if (!raw) return undefined
  const m = raw.match(/https?:\/\/[a-z0-9-]+\.supabase\.co/i)
  return (m ? m[0] : raw.trim()).replace(/\/+$/, '')
}

function cleanKey(raw?: string): string | undefined {
  if (!raw) return undefined
  // kunci baru (sb_publishable_… / sb_secret_…) atau JWT lama (eyJ…)
  const m =
    raw.match(/sb_(?:publishable|secret)_[A-Za-z0-9._-]+/) ||
    raw.match(/eyJ[A-Za-z0-9._-]{20,}/)
  return m ? m[0] : raw.trim()
}

const url = cleanUrl(import.meta.env.VITE_SUPABASE_URL as string | undefined)
const anon = cleanKey(import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)

export const supabase: SupabaseClient | null =
  url && anon ? createClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }) : null

export const isCloudEnabled = supabase !== null

// Nama tabel penyimpanan dokumen state per-user
export const STATE_TABLE = 'user_state'

