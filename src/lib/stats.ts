// Perhitungan statistik konsistensi, streak, dan tren — fungsi murni atas data store.
import type { Habit, PrayerStatus } from '../store/useStore'
import { isHabitDone } from '../store/useStore'
import { PRAYERS, type PrayerName } from './prayer'
import { addDays, dateKey, lastNDays, namaHari, fromKey } from './date'

type PrayerLogs = Record<string, Partial<Record<PrayerName, PrayerStatus>>>
type HabitLogs = Record<string, Record<string, number>>

export interface DayScore {
  key: string
  prayersDone: number // status selain pending
  prayersOnTime: number
  habitsDone: number
  itemsDone: number
  itemsTotal: number
  ratio: number // 0..1
}

// Hitung skor satu hari. activeHabits = habit yang tidak diarsipkan.
// haid[key] = hari libur sholat (haid): sholat dikecualikan dari skor (tidak dianggap gagal).
export function dayScore(
  key: string,
  prayerLogs: PrayerLogs,
  habitLogs: HabitLogs,
  habits: Habit[],
  haid: Record<string, boolean> = {},
): DayScore {
  const pl = prayerLogs[key] ?? {}
  const isHaid = !!haid[key]
  let prayersDone = 0
  let prayersOnTime = 0
  for (const p of PRAYERS) {
    const st = pl[p]
    if (st && st !== 'pending') prayersDone++
    if (st === 'ontime') prayersOnTime++
  }

  const active = habits.filter((h) => !h.archived)
  let habitsDone = 0
  for (const h of active) {
    const v = habitLogs[key]?.[h.id] ?? 0
    if (isHabitDone(h, v)) habitsDone++
  }

  const itemsDone = (isHaid ? 0 : prayersDone) + habitsDone
  const itemsTotal = (isHaid ? 0 : PRAYERS.length) + active.length
  return {
    key,
    prayersDone,
    prayersOnTime,
    habitsDone,
    itemsDone,
    itemsTotal,
    ratio: itemsTotal === 0 ? 0 : itemsDone / itemsTotal,
  }
}

const STREAK_THRESHOLD = 0.6 // hari "berhasil" jika >=60% target tercapai

// Streak hari berturut-turut yang berhasil, dihitung mundur dari hari ini.
// Hari ini boleh belum tercapai (tidak memutus streak kemarin).
export function overallStreak(
  prayerLogs: PrayerLogs,
  habitLogs: HabitLogs,
  habits: Habit[],
  today = new Date(),
  haid: Record<string, boolean> = {},
): number {
  let streak = 0
  for (let i = 0; i < 400; i++) {
    const d = addDays(today, -i)
    const key = dateKey(d)
    const s = dayScore(key, prayerLogs, habitLogs, habits, haid)
    if (s.itemsTotal === 0) {
      // hari libur (haid) tanpa habit aktif — lewati, jangan putus streak
      continue
    } else if (s.ratio >= STREAK_THRESHOLD) {
      streak++
    } else if (i === 0) {
      // hari ini belum tercapai — jangan putus, lanjut cek kemarin
      continue
    } else {
      break
    }
  }
  return streak
}

// Streak per habit (hari berturut-turut habit tercapai, mundur dari hari ini).
export function habitStreak(
  habit: Habit,
  habitLogs: HabitLogs,
  today = new Date(),
): number {
  let streak = 0
  for (let i = 0; i < 400; i++) {
    const key = dateKey(addDays(today, -i))
    const v = habitLogs[key]?.[habit.id] ?? 0
    if (isHabitDone(habit, v)) {
      streak++
    } else if (i === 0) {
      continue
    } else {
      break
    }
  }
  return streak
}

// Streak khusus sholat 5 waktu (semua 5 tercatat non-pending).
export function prayerStreak(prayerLogs: PrayerLogs, today = new Date(), haid: Record<string, boolean> = {}): number {
  let streak = 0
  for (let i = 0; i < 400; i++) {
    const key = dateKey(addDays(today, -i))
    if (haid[key]) continue // hari libur (haid) — lewati, tidak memutus streak
    const pl = prayerLogs[key] ?? {}
    const all = PRAYERS.every((p) => pl[p] && pl[p] !== 'pending')
    if (all) streak++
    else if (i === 0) continue
    else break
  }
  return streak
}

// Streak rawatib muakkadah lengkap (ke-5 slot tercentang) berturut-turut.
export function rawatibStreak(
  rawatibLogs: Record<string, Record<string, boolean>>,
  keys: string[],
  today = new Date(),
): number {
  let streak = 0
  for (let i = 0; i < 400; i++) {
    const key = dateKey(addDays(today, -i))
    const day = rawatibLogs[key] ?? {}
    const all = keys.length > 0 && keys.every((k) => day[k])
    if (all) streak++
    else if (i === 0) continue
    else break
  }
  return streak
}

// Konsistensi rata-rata (%) selama n hari terakhir.
export function consistency(
  n: number,
  prayerLogs: PrayerLogs,
  habitLogs: HabitLogs,
  habits: Habit[],
  end = new Date(),
  haid: Record<string, boolean> = {},
): number {
  const keys = lastNDays(n, end)
  let sum = 0
  let count = 0
  for (const k of keys) {
    const s = dayScore(k, prayerLogs, habitLogs, habits, haid)
    if (s.itemsTotal === 0) continue // hari libur (haid) tanpa habit — tak dihitung
    sum += s.ratio
    count++
  }
  return count === 0 ? 0 : Math.round((sum / count) * 100)
}

// Tren 7 hari terakhir untuk bar chart.
export interface TrendPoint {
  key: string
  label: string
  done: number
  total: number
}

export function trend7(
  prayerLogs: PrayerLogs,
  habitLogs: HabitLogs,
  habits: Habit[],
  end = new Date(),
  haid: Record<string, boolean> = {},
): TrendPoint[] {
  return lastNDays(7, end).map((k) => {
    const s = dayScore(k, prayerLogs, habitLogs, habits, haid)
    return { key: k, label: namaHari(fromKey(k), true), done: s.itemsDone, total: s.itemsTotal }
  })
}
