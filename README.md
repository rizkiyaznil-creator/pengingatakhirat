# Dawam — Pengingat Ibadah & Pencatat Amal Harian Muslim

> **"Jaga amal, rawat istiqamah."**
> إنّما الأعمال بالنيّات — *"Sesungguhnya amal itu tergantung niatnya"* (HR. Bukhari)

PWA (Progressive Web App) untuk membantu Muslim menjaga konsistensi ibadah.
Bisa di-install di **Android, iOS, dan desktop**, berjalan **offline**, dan
menyimpan data **secara lokal di perangkat** (privat, tanpa server).

> Nama *Dawam* dari *ad-dawām* — amalan yang dikerjakan rutin walau sedikit.

## ✨ Fitur (Fase 1 — MVP)

- 📊 **Dashboard Insights** — konsistensi 30 hari (%), streak, perbandingan vs bulan lalu,
  tren 7 hari (bar chart), dan streak terpanjang per ibadah.
- 🕌 **Tracker Sholat 5 Waktu** — jadwal otomatis sesuai lokasi & madzhab
  (dihitung di perangkat, offline), status per sholat **Tepat / Telat / Qadha**,
  on-time rate, dan countdown sholat berikutnya.
- ✅ **Habit Tracker** — 3 tipe habit: **Ceklis**, **Hitung (counter)**, dan **Timer**.
  Tambah/hapus habit sendiri, dengan streak per habit.
- 📿 **Tasbih Digital** — penghitung dzikir 33 / 99 / 100 dengan ring progress & getar.

### Roadmap berikutnya
- **Fase 2** — Khatam Qur'an, Muhasabah malam + heatmap mood, Doa tracker,
  Kalender Hijriyah + event sunnah, Arah Kiblat, Asmaul Husna, Hadits Arba'in.
- **Fase 3** — Hafalan (metode Sabaq–Sabqi–Manzil), Community + leaderboard,
  login & sinkronisasi, notifikasi/adzan push (server-side).

## 🛠️ Teknologi

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** (tema Ocean Teal — teal laut + off-white sejuk)
- **Zustand** (state, persist ke `localStorage`)
- **adhan** (perhitungan jadwal sholat offline)
- **vite-plugin-pwa** (installable + offline)

## 🚀 Menjalankan

```bash
npm install
npm run dev      # mode pengembangan
npm run build    # build produksi -> dist/
npm run preview  # pratinjau hasil build
```

Buka di HP, lalu **"Add to Home Screen"** (iOS via Safari, Android via Chrome)
untuk memasangnya seperti aplikasi.

## 📁 Struktur

```
src/
  components/   # BottomNav, HabitRow, Tasbih, ikon
  pages/        # Onboarding, Dashboard, Sholat, Habits, Profile
  lib/          # prayer (adhan), stats, date, geo, useNow
  store/        # useStore (Zustand + persist)
```

## 🔒 Privasi

Semua data (log sholat, habit, profil) disimpan di `localStorage` perangkatmu.
Tidak ada data yang dikirim ke server. Deteksi lokasi opsional; nama kota
di-resolve via OpenStreetMap (best-effort) dan bisa diisi manual.
