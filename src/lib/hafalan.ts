// Spaced repetition metode kotak Leitner untuk hafalan, dipetakan ke istilah
// pondok: Sabaq (baru) · Sabqi (murojaah dekat) · Manzil (murojaah lama).
import { addDays, dateKey } from './date'

export type HafalanGrade = 'lupa' | 'ragu' | 'lancar'
export type HafalanCategory = 'sabaq' | 'sabqi' | 'manzil'

// Interval (hari) menuju murojaah berikutnya untuk tiap box (1..5).
const BOX_DAYS: Record<number, number> = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 }

// Hasil penilaian → box baru & tanggal jatuh tempo berikutnya.
export function applyGrade(
  box: number,
  grade: HafalanGrade,
  today = new Date(),
): { box: number; nextDue: string } {
  let next = box
  if (grade === 'lancar') next = Math.min(5, box + 1)
  else if (grade === 'lupa') next = 1
  // 'ragu' → box tetap

  const days = grade === 'lupa' ? 1 : BOX_DAYS[next] ?? 1
  return { box: next, nextDue: dateKey(addDays(today, days)) }
}

export function categoryOf(box: number): HafalanCategory {
  if (box <= 1) return 'sabaq'
  if (box <= 3) return 'sabqi'
  return 'manzil'
}

export const CATEGORY_LABEL: Record<HafalanCategory, string> = {
  sabaq: 'Sabaq · hafalan baru',
  sabqi: 'Sabqi · murojaah dekat',
  manzil: 'Manzil · murojaah lama',
}

export function isDue(nextDue: string, today = new Date()): boolean {
  return nextDue <= dateKey(today)
}

// Streak setoran: hari berturut-turut ada setoran (mundur dari hari ini).
export function setoranStreak(daily: Record<string, number>, today = new Date()): number {
  let streak = 0
  for (let i = 0; i < 400; i++) {
    const k = dateKey(addDays(today, -i))
    if ((daily[k] ?? 0) > 0) streak++
    else if (i === 0) continue
    else break
  }
  return streak
}
