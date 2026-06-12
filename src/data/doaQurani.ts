// Kumpulan doa yang bersumber dari Al-Qur'an. Hanya RUJUKAN (surah:ayat) + label
// topik; teks Arab & terjemahan diambil dari Al-Qur'an (API, lihat quranApi.ts)
// agar akurat — bukan ketikan manual.
export type DoaKategori =
  | 'Dunia & Akhirat'
  | 'Ampunan'
  | 'Keteguhan'
  | 'Keluarga'
  | 'Perlindungan'
  | 'Ilmu & Kemudahan'
  | 'Syukur'

export interface DoaRef {
  id: string
  judul: string
  kategori: DoaKategori
  surah: number
  from: number
  to: number
}

export const DOA_QURANI: DoaRef[] = [
  { id: 'd-2-201', judul: 'Kebaikan dunia & akhirat', kategori: 'Dunia & Akhirat', surah: 2, from: 201, to: 201 },
  { id: 'd-2-286', judul: 'Mohon ampun & diringankan beban', kategori: 'Ampunan', surah: 2, from: 286, to: 286 },
  { id: 'd-2-250', judul: 'Kesabaran & keteguhan hadapi ujian', kategori: 'Keteguhan', surah: 2, from: 250, to: 250 },
  { id: 'd-2-127', judul: 'Diterimanya amal (Nabi Ibrahim)', kategori: 'Syukur', surah: 2, from: 127, to: 128 },
  { id: 'd-3-8', judul: 'Jangan sesatkan hati kami', kategori: 'Keteguhan', surah: 3, from: 8, to: 9 },
  { id: 'd-3-16', judul: 'Pengakuan iman & mohon ampun', kategori: 'Ampunan', surah: 3, from: 16, to: 16 },
  { id: 'd-3-26', judul: 'Pemilik kerajaan & kemuliaan', kategori: 'Dunia & Akhirat', surah: 3, from: 26, to: 27 },
  { id: 'd-3-147', judul: 'Ampunan & keteguhan langkah', kategori: 'Keteguhan', surah: 3, from: 147, to: 147 },
  { id: 'd-3-191', judul: 'Renungan penciptaan & mohon ampun', kategori: 'Ampunan', surah: 3, from: 191, to: 194 },
  { id: 'd-3-38', judul: 'Memohon keturunan yang baik (Zakariya)', kategori: 'Keluarga', surah: 3, from: 38, to: 38 },
  { id: 'd-7-23', judul: 'Taubat Nabi Adam', kategori: 'Ampunan', surah: 7, from: 23, to: 23 },
  { id: 'd-7-126', judul: 'Kesabaran & wafat dalam Islam', kategori: 'Keteguhan', surah: 7, from: 126, to: 126 },
  { id: 'd-10-85', judul: 'Berlindung dari kezaliman kaum zalim', kategori: 'Perlindungan', surah: 10, from: 85, to: 86 },
  { id: 'd-14-40', judul: 'Istiqamah shalat untuk diri & keturunan', kategori: 'Keluarga', surah: 14, from: 40, to: 41 },
  { id: 'd-14-35', judul: 'Negeri aman & jauh dari syirik', kategori: 'Perlindungan', surah: 14, from: 35, to: 35 },
  { id: 'd-17-24', judul: 'Doa untuk kedua orang tua', kategori: 'Keluarga', surah: 17, from: 24, to: 24 },
  { id: 'd-17-80', judul: 'Masuk & keluar dengan benar', kategori: 'Ilmu & Kemudahan', surah: 17, from: 80, to: 80 },
  { id: 'd-18-10', judul: 'Rahmat & petunjuk (Ashabul Kahfi)', kategori: 'Keteguhan', surah: 18, from: 10, to: 10 },
  { id: 'd-20-25', judul: 'Kelapangan & kelancaran (Nabi Musa)', kategori: 'Ilmu & Kemudahan', surah: 20, from: 25, to: 28 },
  { id: 'd-20-114', judul: 'Memohon tambahan ilmu', kategori: 'Ilmu & Kemudahan', surah: 20, from: 114, to: 114 },
  { id: 'd-21-83', judul: 'Saat sakit & ujian (Nabi Ayyub)', kategori: 'Perlindungan', surah: 21, from: 83, to: 83 },
  { id: 'd-21-87', judul: 'Doa Nabi Yunus (Dzun Nun)', kategori: 'Perlindungan', surah: 21, from: 87, to: 87 },
  { id: 'd-23-97', judul: 'Berlindung dari bisikan setan', kategori: 'Perlindungan', surah: 23, from: 97, to: 98 },
  { id: 'd-23-109', judul: 'Mohon ampun & rahmat', kategori: 'Ampunan', surah: 23, from: 109, to: 109 },
  { id: 'd-25-65', judul: 'Berlindung dari azab Jahannam', kategori: 'Perlindungan', surah: 25, from: 65, to: 66 },
  { id: 'd-25-74', judul: 'Keluarga penyejuk mata', kategori: 'Keluarga', surah: 25, from: 74, to: 74 },
  { id: 'd-27-19', judul: 'Syukur atas nikmat (Nabi Sulaiman)', kategori: 'Syukur', surah: 27, from: 19, to: 19 },
  { id: 'd-28-24', judul: 'Memohon kebaikan & rezeki (Nabi Musa)', kategori: 'Ilmu & Kemudahan', surah: 28, from: 24, to: 24 },
  { id: 'd-40-7', judul: 'Doa malaikat untuk orang beriman', kategori: 'Ampunan', surah: 40, from: 7, to: 9 },
  { id: 'd-46-15', judul: 'Syukur & bakti kepada orang tua', kategori: 'Keluarga', surah: 46, from: 15, to: 15 },
  { id: 'd-59-10', judul: 'Ampunan untuk diri & saudara seiman', kategori: 'Ampunan', surah: 59, from: 10, to: 10 },
  { id: 'd-60-4', judul: 'Tawakal kepada Allah', kategori: 'Keteguhan', surah: 60, from: 4, to: 5 },
  { id: 'd-66-8', judul: 'Sempurnakan cahaya & ampuni kami', kategori: 'Ampunan', surah: 66, from: 8, to: 8 },
  { id: 'd-66-11', judul: 'Rumah di sisi-Mu dalam surga (Asiyah)', kategori: 'Dunia & Akhirat', surah: 66, from: 11, to: 11 },
  { id: 'd-71-28', judul: 'Ampunan untuk diri, orang tua & mukmin (Nuh)', kategori: 'Keluarga', surah: 71, from: 28, to: 28 },
  { id: 'd-12-101', judul: 'Husnul khatimah (Nabi Yusuf)', kategori: 'Syukur', surah: 12, from: 101, to: 101 },
]

export const DOA_KATEGORI: DoaKategori[] = [
  'Dunia & Akhirat', 'Ampunan', 'Keteguhan', 'Keluarga', 'Perlindungan', 'Ilmu & Kemudahan', 'Syukur',
]
