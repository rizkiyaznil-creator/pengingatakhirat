// Perhitungan jadwal sholat — dihitung di perangkat (offline) memakai library adhan.
import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  Madhab,
  type CalculationParameters,
} from 'adhan'

export type PrayerName = 'subuh' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya'

export const PRAYERS: PrayerName[] = ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya']

export const PRAYER_LABEL: Record<PrayerName, string> = {
  subuh: 'Subuh',
  dzuhur: 'Dzuhur',
  ashar: 'Ashar',
  maghrib: 'Maghrib',
  isya: 'Isya',
}

export type MethodKey = 'Kemenag' | 'MWL' | 'UmmAlQura' | 'Egyptian' | 'Karachi'

export const METHOD_LABEL: Record<MethodKey, string> = {
  Kemenag: 'Indonesia (Kemenag)',
  MWL: 'Muslim World League',
  UmmAlQura: 'Umm al-Qura (Makkah)',
  Egyptian: 'Egyptian',
  Karachi: 'Karachi',
}

export type MadhabKey = 'syafii' | 'hanafi'

function buildParams(method: MethodKey, madhab: MadhabKey): CalculationParameters {
  let params: CalculationParameters
  switch (method) {
    case 'Kemenag':
      // Pendekatan parameter Kemenag RI: Fajr 20°, Isya 18°
      params = CalculationMethod.Other()
      params.fajrAngle = 20
      params.ishaAngle = 18
      break
    case 'MWL':
      params = CalculationMethod.MuslimWorldLeague()
      break
    case 'UmmAlQura':
      params = CalculationMethod.UmmAlQura()
      break
    case 'Egyptian':
      params = CalculationMethod.Egyptian()
      break
    case 'Karachi':
      params = CalculationMethod.Karachi()
      break
    default:
      params = CalculationMethod.MuslimWorldLeague()
  }
  params.madhab = madhab === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi
  return params
}

export interface PrayerSchedule {
  times: Record<PrayerName, Date>
  current: PrayerName | null
  next: PrayerName | null
  nextTime: Date | null
}

export function getSchedule(
  lat: number,
  lng: number,
  method: MethodKey,
  madhab: MadhabKey,
  date: Date = new Date(),
): PrayerSchedule {
  const coords = new Coordinates(lat, lng)
  const params = buildParams(method, madhab)
  const pt = new PrayerTimes(coords, date, params)

  const times: Record<PrayerName, Date> = {
    subuh: pt.fajr,
    dzuhur: pt.dhuhr,
    ashar: pt.asr,
    maghrib: pt.maghrib,
    isya: pt.isha,
  }

  // Tentukan sholat berikutnya secara manual agar nama konsisten (subuh..isya)
  const now = date.getTime()
  let next: PrayerName | null = null
  let nextTime: Date | null = null
  for (const p of PRAYERS) {
    if (times[p].getTime() > now) {
      next = p
      nextTime = times[p]
      break
    }
  }

  let current: PrayerName | null = null
  for (let i = PRAYERS.length - 1; i >= 0; i--) {
    if (times[PRAYERS[i]].getTime() <= now) {
      current = PRAYERS[i]
      break
    }
  }

  return { times, current, next, nextTime }
}

// Sisa waktu menuju sholat berikutnya, format "1j 23m"
export function countdown(target: Date | null, from: Date = new Date()): string {
  if (!target) return '—'
  let diff = Math.max(0, target.getTime() - from.getTime())
  const h = Math.floor(diff / 3_600_000)
  diff -= h * 3_600_000
  const m = Math.floor(diff / 60_000)
  if (h > 0) return `${h}j ${m}m`
  return `${m}m`
}
