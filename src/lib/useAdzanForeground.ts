import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import { getSchedule, PRAYERS, PRAYER_LABEL, type PrayerName } from './prayer'
import { dateKey, jam } from './date'
import { playAdzan } from './adzan'

export interface AdzanAlert {
  prayer: PrayerName
  label: string
  timeStr: string
}

// Pemantau waktu sholat saat aplikasi terbuka: tampilkan banner + bunyikan adzan.
export function useAdzanForeground(): { alert: AdzanAlert | null; dismiss: () => void } {
  const profile = useStore((s) => s.profile)
  const notif = useStore((s) => s.notif)
  const [alert, setAlert] = useState<AdzanAlert | null>(null)
  const fired = useRef<Set<string>>(new Set())
  const lastCheck = useRef<number>(Date.now())

  useEffect(() => {
    if (!notif.enabled) return
    lastCheck.current = Date.now()

    const tick = () => {
      const now = new Date()
      const sched = getSchedule(profile.lat, profile.lng, profile.method, profile.madhab, now)
      const today = dateKey(now)
      for (const p of PRAYERS) {
        if (!notif.prayers.includes(p)) continue
        const t = sched.times[p].getTime() - notif.minutesBefore * 60000
        const key = `${today}-${p}`
        if (t <= now.getTime() && t > lastCheck.current && !fired.current.has(key)) {
          fired.current.add(key)
          setAlert({ prayer: p, label: PRAYER_LABEL[p], timeStr: jam(sched.times[p]) })
          playAdzan(notif.sound, notif.adzanUrl)
        }
      }
      lastCheck.current = now.getTime()
    }

    tick()
    const id = setInterval(tick, 20000)
    return () => clearInterval(id)
  }, [
    notif.enabled,
    notif.prayers,
    notif.minutesBefore,
    notif.sound,
    notif.adzanUrl,
    profile.lat,
    profile.lng,
    profile.method,
    profile.madhab,
  ])

  return { alert, dismiss: () => setAlert(null) }
}
