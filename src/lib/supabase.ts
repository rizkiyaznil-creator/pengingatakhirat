import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Kredensial diisi lewat env saat build (lihat .env.example & workflow Actions).
// Jika kosong, fitur cloud non-aktif dan aplikasi tetap jalan lokal.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

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
