// Ambil teks ayat + terjemahan + audio dari API alquran.cloud, lalu cache di
// localStorage agar bisa dibuka offline setelah sekali diunduh.
const BASE = 'https://api.alquran.cloud/v1'

export interface Ayah {
  no: number // nomor ayat dalam surah
  arab: string
  terjemah: string
  audio: string // URL mp3 (qari Alafasy)
}

function cacheKey(surah: number) {
  // v2: basmalah tidak lagi digabung ke ayat 1 (lihat stripBasmalah).
  return `dawam-surah-v2-${surah}`
}

// Teks basmalah untuk ditampilkan sebagai pembuka surah (kecuali Al-Fātiḥah & At-Taubah).
export const BASMALAH = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'

// Pada edisi quran-uthmani, basmalah ikut menempel di teks ayat 1 setiap surah
// (kecuali Al-Fātiḥah, yang basmalahnya memang ayat 1, dan At-Taubah yang tanpa basmalah).
// Buang prefiks basmalah dari ayat 1 agar tidak terbaca sebagai bagian ayat.
function stripBasmalah(text: string): string {
  const norm = (s: string) =>
    s
      // hapus harakat, tanwin, tatweel, & tanda kecil mushaf
      .replace(/[ؐ-ًؚ-ٰٟۖ-ۭـ]/g, '')
      // satukan ragam alef (termasuk alef washlah ٱ) menjadi alef biasa
      .replace(/[آأإٱٲٳ]/g, 'ا')
  const tokens = text.split(/\s+/)
  // Al-Fātiḥah: ayat 1 hanya 4 kata (basmalah utuh) → biarkan utuh.
  if (tokens.length >= 5 && tokens.slice(0, 4).map(norm).join(' ') === 'بسم الله الرحمن الرحيم') {
    return tokens.slice(4).join(' ')
  }
  return text
}

export function getCachedSurah(surah: number): Ayah[] | null {
  try {
    const raw = localStorage.getItem(cacheKey(surah))
    return raw ? (JSON.parse(raw) as Ayah[]) : null
  } catch {
    return null
  }
}

// Ambil seluruh ayat satu surah. Pakai cache bila ada; jika offline & tak ada
// cache, lempar error agar UI menampilkan pesan.
export async function fetchSurah(surah: number): Promise<Ayah[]> {
  const cached = getCachedSurah(surah)
  if (cached) return cached

  const url = `${BASE}/surah/${surah}/editions/quran-uthmani,id.indonesian,ar.alafasy`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Gagal memuat surah (server)')
  const json = await res.json()
  const [arabicEd, indoEd, audioEd] = json.data as Array<{ ayahs: any[] }>
  if (!arabicEd?.ayahs) throw new Error('Format data tidak sesuai')

  const ayahs: Ayah[] = arabicEd.ayahs.map((a: any, i: number) => ({
    no: a.numberInSurah,
    arab: i === 0 ? stripBasmalah(a.text) : a.text,
    terjemah: indoEd?.ayahs?.[i]?.text ?? '',
    audio: audioEd?.ayahs?.[i]?.audio ?? '',
  }))

  try {
    localStorage.setItem(cacheKey(surah), JSON.stringify(ayahs))
  } catch {
    /* storage penuh — abaikan, tetap kembalikan data */
  }
  return ayahs
}

export function isSurahCached(surah: number): boolean {
  return getCachedSurah(surah) !== null
}
