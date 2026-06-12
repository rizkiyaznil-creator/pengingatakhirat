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
  return `dawam-surah-${surah}`
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
    arab: a.text,
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
