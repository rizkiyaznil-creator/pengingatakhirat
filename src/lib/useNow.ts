import { useEffect, useState } from 'react'

// Re-render berkala (default tiap 30 detik) agar countdown & status waktu sholat akurat.
export function useNow(intervalMs = 30_000): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}
