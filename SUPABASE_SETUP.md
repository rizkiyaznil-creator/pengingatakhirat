# Setup Login & Sinkronisasi (Supabase)

Aplikasi tetap jalan **lokal tanpa setup ini**. Login & sinkronisasi antar
perangkat baru aktif setelah langkah-langkah di bawah selesai (sekali saja).

Estimasi: ~10–15 menit.

---

## 1. Buat project Supabase (gratis)

1. Buka <https://supabase.com> → **Sign in** (boleh dengan GitHub) → **New project**.
2. Isi nama (mis. `dawam`), buat **Database Password** (simpan), pilih **Region**
   terdekat (mis. *Southeast Asia / Singapore*). Klik **Create new project**.
3. Tunggu ±2 menit sampai project siap.

## 2. Buat tabel penyimpanan + keamanan (RLS)

Buka menu **SQL Editor** → **New query** → tempel SQL ini → **Run**:

```sql
create table if not exists public.user_state (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_state enable row level security;

create policy "own_select" on public.user_state
  for select using (auth.uid() = user_id);
create policy "own_insert" on public.user_state
  for insert with check (auth.uid() = user_id);
create policy "own_update" on public.user_state
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

> RLS memastikan tiap pengguna hanya bisa membaca/menulis datanya sendiri.

## 3. Ambil 2 kunci

Menu **Project Settings** (gear) → **API**:
- **Project URL** → mis. `https://abcd1234.supabase.co`
- **anon public** key (di bagian *Project API keys*) → string panjang `eyJ...`

> Anon key **aman** tampil di frontend — keamanan dijaga oleh RLS.

## 4. Tambahkan kunci sebagai GitHub Secret

Repo GitHub → **Settings** → **Secrets and variables** → **Actions** →
**New repository secret**, buat 2 secret:

| Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | Project URL dari langkah 3 |
| `VITE_SUPABASE_ANON_KEY` | anon public key dari langkah 3 |

## 5. Atur URL redirect

Menu **Authentication** → **URL Configuration**:
- **Site URL**: `https://rizkiyaznil-creator.github.io/pengingatakhirat/`
- **Redirect URLs** → tambahkan baris yang sama:
  `https://rizkiyaznil-creator.github.io/pengingatakhirat/`

## 6. (Email) sudah aktif

Provider **Email** aktif secara default. Untuk pengujian lebih cepat, kamu bisa
matikan konfirmasi email: **Authentication → Providers → Email** → nonaktifkan
*Confirm email* (opsional).

## 7. (Google) aktifkan OAuth

1. **Authentication → Providers → Google** → aktifkan. Catat **Callback URL**
   yang ditampilkan (mis. `https://abcd1234.supabase.co/auth/v1/callback`).
2. Buka <https://console.cloud.google.com> → buat / pilih project →
   **APIs & Services → OAuth consent screen** (External, isi seadanya).
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID** →
   *Application type:* **Web application**.
   - **Authorized redirect URIs**: tempel **Callback URL** dari poin 1.
4. Salin **Client ID** & **Client Secret** → tempel ke provider Google di
   Supabase → **Save**.

## 8. Deploy ulang

Setelah secret (langkah 4) terpasang, jalankan ulang workflow **Deploy ke
GitHub Pages** (push apa saja, atau tab Actions → Run workflow). Build akan
menyertakan kredensial dan fitur login otomatis muncul di halaman **Profil**.

---

Selesai! Buka app → **Profil** → **Masuk / Daftar**. Setelah login, data
tersinkron otomatis; buka di perangkat lain & login dengan akun sama untuk
melihat data yang sama.
