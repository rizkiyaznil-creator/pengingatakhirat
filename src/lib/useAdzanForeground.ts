import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import { getSchedule, PRAYERS, PRAYER_LABEL, type PrayerName } from './prayer'
import { dateKey, jam } from './date'

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

function playAdzan(sound: boolean, url: string) {
  if (!sound) return
  if (url) {
    const a = new Audio(url)
    a.play().catch(() => chime())
  } else {
    chime()
  }
}

// Nada panggilan singkat (tanpa berkas) bila tak ada URL audio adzan.
function chime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const notes = [523.25, 659.25, 783.99, 659.25] // C-E-G-E
    notes.forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = f
      o.connect(g)
      g.connect(ctx.destination)
      const start = ctx.currentTime + i * 0.28
      g.gain.setValueAtTime(0.0001, start)
      g.gain.exponentialRampToValueAtTime(0.25, start + 0.04)
      g.gain.exponentialRampToValueAtTime(0.0001, start + 0.26)
      o.start(start)
      o.stop(start + 0.28)
    })
    setTimeout(() => ctx.close(), 1600)
  } catch {
    /* audio diblokir — abaikan */
  }
}
