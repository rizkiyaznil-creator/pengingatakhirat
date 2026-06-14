// Kalender Hijriah & event Islam — konversi tanggal memakai Intl (offline, akurat
// kalender Umm al-Qura). Event puasa sunnah & hari penting dihitung dari tanggal Hijriah.
import { addDays, dateKey } from './date'

const HIJRI_MONTHS = [
  'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir', 'Jumadil Awal', 'Jumadil Akhir',
  'Rajab', 'Syaban', 'Ramadhan', 'Syawal', 'Dzulkaidah', 'Dzulhijjah',
]

const hijriFmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
})

export interface Hijri {
  day: number
  month: number // 1..12
  year: number
  monthName: string
}

export function toHijri(date: Date): Hijri {
  const parts = hijriFmt.formatToParts(date)
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? '0')
  const month = get('month')
  return { day: get('day'), month, year: get('year'), monthName: HIJRI_MONTHS[month - 1] ?? '' }
}

export function hijriString(date: Date = new Date()): string {
  const h = toHijri(date)
  return `${h.day} ${h.monthName} ${h.year} H`
}

export type EventKind = 'utama' | 'sunnah' | 'rutin' | 'mulia' | 'raya' | 'larangan'

export interface MuslimEvent {
  key: string
  date: Date
  dateKey: string
  hijri: string
  title: string
  sub: string
  kind: EventKind
  daysAway: number
}

const KIND_LABEL: Record<EventKind, string> = {
  utama: 'Sunnah · Utama',
  sunnah: 'Sunnah',
  rutin: 'Sunnah rutin',
  mulia: 'Malam mulia',
  raya: 'Hari Raya',
  larangan: 'Dilarang puasa',
}

export function kindLabel(k: EventKind): string {
  return KIND_LABEL[k]
}

export interface DayEvent {
  title: string
  sub: string
  kind: EventKind
}

// Semua agenda Islam pada satu tanggal (puasa sunnah, hari raya, malam mulia, dst).
export function eventsForDay(d: Date): DayEvent[] {
  const h = toHijri(d)
  const hijri = `${h.day} ${h.monthName}`
  const wd = d.getDay() // 0=Min .. 6=Sab
  const out: DayEvent[] = []
  const push = (title: string, sub: string, kind: EventKind) => out.push({ title, sub, kind })

  // Hari raya & hari tasyrik (dilarang puasa)
  if (h.month === 10 && h.day === 1) push('Idul Fitri', `1 Syawal ${h.year} H`, 'raya')
  else if (h.month === 12 && h.day === 10) push('Idul Adha', `10 Dzulhijjah ${h.year} H`, 'raya')
  else if (h.month === 12 && (h.day === 11 || h.day === 12 || h.day === 13)) push('Hari Tasyrik', hijri, 'larangan')
  else {
    // Puasa sunnah utama
    if (h.month === 12 && h.day === 9) push('Puasa Arafah', hijri, 'utama')
    if (h.month === 1 && h.day === 9) push('Puasa Tasua', hijri, 'sunnah')
    if (h.month === 1 && h.day === 10) push('Puasa Asyura', hijri, 'utama')
    // Ayyamul Bidh (13–15 tiap bulan)
    if (h.day === 13 || h.day === 14 || h.day === 15) push('Ayyamul Bidh', `${hijri} · puasa putih`, 'sunnah')
    // Puasa Senin–Kamis
    if (wd === 1) push('Puasa Senin', hijri, 'rutin')
    if (wd === 4) push('Puasa Kamis', hijri, 'rutin')
  }

  // Hari/malam mulia
  if (h.month === 3 && h.day === 12) push('Maulid Nabi ﷺ', hijri, 'mulia')
  if (h.month === 7 && h.day === 27) push('Isra Mi’raj', hijri, 'mulia')
  if (h.month === 8 && h.day === 15) push('Nisfu Syaban', hijri, 'mulia')
  if (h.month === 9 && h.day === 1) push('Awal Ramadhan', hijri, 'mulia')
  if (h.month === 9 && h.day >= 21 && h.day % 2 === 1) push('Malam ganjil Ramadhan', `${hijri} · cari Lailatul Qadr`, 'mulia')

  return out
}

// Prioritas warna sel kalender bila satu hari punya beberapa agenda.
const KIND_RANK: Record<EventKind, number> = {
  raya: 6, larangan: 5, mulia: 4, utama: 3, sunnah: 2, rutin: 1,
}

// Jenis paling penting pada satu hari (untuk highlight grid). null bila tak ada.
export function primaryKind(d: Date): EventKind | null {
  const ev = eventsForDay(d)
  if (!ev.length) return null
  return ev.reduce((best, e) => (KIND_RANK[e.kind] > KIND_RANK[best] ? e.kind : best), ev[0].kind)
}

// Daftar event mendatang dalam `horizon` hari ke depan, urut dari yang terdekat.
export function upcomingEvents(from: Date = new Date(), horizon = 60): MuslimEvent[] {
  const out: MuslimEvent[] = []
  const base = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  let seenMonday = false
  let seenThursday = false

  for (let i = 0; i <= horizon; i++) {
    const d = addDays(base, i)
    const h = toHijri(d)
    const hijri = `${h.day} ${h.monthName}`
    for (const e of eventsForDay(d)) {
      // Puasa Senin–Kamis: cukup tampilkan yang terdekat agar daftar tak penuh.
      if (e.title === 'Puasa Senin') { if (seenMonday) continue; seenMonday = true }
      if (e.title === 'Puasa Kamis') { if (seenThursday) continue; seenThursday = true }
      out.push({
        key: `${dateKey(d)}-${e.title}`, date: d, dateKey: dateKey(d), hijri,
        title: e.title, sub: e.sub, kind: e.kind, daysAway: i,
      })
    }
  }

  // urutkan: hari terdekat dulu
  return out.sort((a, b) => a.daysAway - b.daysAway)
}

export function dayAwayLabel(days: number): string {
  if (days <= 0) return 'Hari ini'
  if (days === 1) return 'Besok'
  return `${days} hari lagi`
}
