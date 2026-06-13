# Setup Notifikasi Adzan (Web Push)

Notifikasi **saat app tertutup** (terutama iPhone) butuh push dari server. Ini
sekali setup. Yang **sudah jalan tanpa setup**: izin notifikasi, **adzan saat app
terbuka** (banner + suara), dan tombol **"Kirim notifikasi uji"** (Profil → Notifikasi Adzan).

Bagian frontend (langganan push) sudah ada di app. Tinggal pasang **3 hal** di Supabase.

---

## 1. Buat tabel langganan + keamanan

Supabase → **SQL Editor** → jalankan:

```sql
create table if not exists public.push_subscriptions (
  endpoint       text primary key,
  user_id        uuid references auth.users(id) on delete cascade,
  p256dh         text not null,
  auth           text not null,
  lat            double precision,
  lng            double precision,
  method         text,
  madhab         text,
  tz             text,
  prayers        text[] default '{subuh,dzuhur,ashar,maghrib,isya}',
  minutes_before int default 0,
  enabled        boolean default true,
  updated_at     timestamptz default now()
);

alter table public.push_subscriptions enable row level security;

create policy "own_sub" on public.push_subscriptions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

## 2. Set secret VAPID untuk Edge Function

Supabase → **Project Settings** → **Edge Functions** → **Secrets** (Add secret), buat:

| Name | Value |
|---|---|
| `VAPID_PUBLIC` | (kunci publik — lihat pesan chat) |
| `VAPID_PRIVATE` | (kunci privat — lihat pesan chat, **jangan disebar**) |
| `VAPID_SUBJECT` | `mailto:emailmu@contoh.com` |

> `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY` otomatis tersedia, tak perlu di-set.

## 3. Deploy Edge Function `send-adzan`

Fungsinya sudah ada di repo: `supabase/functions/send-adzan/index.ts`.

**Cara A — Supabase CLI** (di komputermu, sudah login & link project):
```bash
supabase functions deploy send-adzan --no-verify-jwt
```

**Cara B — Dashboard:** Edge Functions → Create function → nama `send-adzan` →
tempel isi `supabase/functions/send-adzan/index.ts` → Deploy. Matikan "Verify JWT".

## 4. Jadwalkan tiap menit (cron)

Supabase → **Integrations** → **Cron** (atau **Database → Cron**) → **Create job**:
- Name: `adzan-tiap-menit`
- Schedule: `* * * * *` (tiap menit)
- Type: **Edge Function** → pilih `send-adzan` (method POST).

> Alternatif via SQL (pg_cron + pg_net), ganti `<REF>` & `<SERVICE_ROLE_KEY>`:
> ```sql
> select cron.schedule('adzan-tiap-menit','* * * * *', $$
>   select net.http_post(
>     url:='https://<REF>.supabase.co/functions/v1/send-adzan',
>     headers:='{"Authorization":"Bearer <SERVICE_ROLE_KEY>","Content-Type":"application/json"}'::jsonb
>   );
> $$);
> ```

---

## Selesai — cara pakai
1. Buka app → **Profil** → **Notifikasi Adzan** → aktifkan (izinkan notifikasi).
   Di **iPhone**, app harus **terpasang ke Home Screen** dulu (iOS 16.4+).
2. Pilih sholat & "menit sebelum".
3. Server akan mengirim notifikasi tiap waktu sholat — walau app tertutup.

Catatan: presisi tergantung cron (±1 menit). Suara adzan penuh hanya saat app
terbuka (keterbatasan Web Push).
