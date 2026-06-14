// Analitik catatan haid — turunkan periode & pola siklus dari haidLogs (per-hari).
import { fromKey, dateKey, addDays } from './date'

export interface HaidPeriod {
  startKey: string
  endKey: string
  start: Date
  end: Date
  days: number
  cycleFromPrev: number | null // jarak (hari) dari awal periode sebelumnya
}

const MS = 86400000
const dayDiff = (aKey: string, bKey: string) =>
  Math.round((fromKey(bKey).getTime() - fromKey(aKey).getTime()) / MS)

// Kelompokkan hari-hari haid berurutan menjadi periode.
export function derivePeriods(haidLogs: Record<string, boolean>): HaidPeriod[] {
  const keys = Object.keys(haidLogs).filter((k) => haidLogs[k]).sort()
  const out: HaidPeriod[] = []
  let runStart: string | null = null
  let prev: string | null = null

  const close = () => {
    if (runStart && prev) {
      const prevStart = out.length ? out[out.length - 1].startKey : null
      out.push({
        startKey: runStart,
        endKey: prev,
        start: fromKey(runStart),
        end: fromKey(prev),
        days: dayDiff(runStart, prev) + 1,
        cycleFromPrev: prevStart ? dayDiff(prevStart, runStart) : null,
      })
    }
  }

  for (const k of keys) {
    if (runStart === null) {
      runStart = k
      prev = k
    } else if (dayDiff(prev!, k) === 1) {
      prev = k
    } else {
      close()
      runStart = k
      prev = k
    }
  }
  close()
  return out
}

export interface HaidSummary {
  periods: HaidPeriod[] // urut lama → baru
  count: number
  avgCycle: number | null
  avgDuration: number | null
  last: HaidPeriod | null
  isToday: boolean
  currentDay: number | null // hari ke-berapa jika sedang haid
  nextStart: Date | null
  daysToNext: number | null // + akan datang, − terlambat
}

export function haidSummary(haidLogs: Record<string, boolean>, today = new Date()): HaidSummary {
  const periods = derivePeriods(haidLogs)
  const count = periods.length
  const last = count ? periods[count - 1] : null

  const cycles = periods.map((p) => p.cycleFromPrev).filter((c): c is number => c != null && c > 0)
  const avgCycle = cycles.length ? Math.round(cycles.reduce((a, b) => a + b, 0) / cycles.length) : null
  const avgDuration = count ? Math.round(periods.reduce((a, p) => a + p.days, 0) / count) : null

  const todayKey = dateKey(today)
  const isToday = !!haidLogs[todayKey]
  let currentDay: number | null = null
  if (isToday && last) currentDay = dayDiff(last.startKey, todayKey) + 1

  let nextStart: Date | null = null
  let daysToNext: number | null = null
  if (last && avgCycle) {
    nextStart = addDays(last.start, avgCycle)
    daysToNext = Math.round((nextStart.getTime() - fromKey(todayKey).getTime()) / MS)
  }

  return { periods, count, avgCycle, avgDuration, last, isToday, currentDay, nextStart, daysToNext }
}
