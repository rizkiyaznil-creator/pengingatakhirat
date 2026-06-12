import { useEffect, useState } from 'react'

// Tangkap event install Android/Chrome sedini mungkin (bisa terpicu sebelum React mount).
interface BIPEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferred: BIPEvent | null = null
const listeners = new Set<() => void>()
const notify = () => listeners.forEach((l) => l())

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e as BIPEvent
    notify()
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    notify()
  })
}

export async function promptInstall(): Promise<'accepted' | 'dismissed' | null> {
  if (!deferred) return null
  await deferred.prompt()
  const choice = await deferred.userChoice
  deferred = null
  notify()
  return choice.outcome
}

// Deteksi platform & status terpasang
export function detectPlatform() {
  const ua = navigator.userAgent || ''
  const isIOS =
    /iphone|ipad|ipod/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const isAndroid = /android/i.test(ua)
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    (navigator as unknown as { standalone?: boolean }).standalone === true
  // Browser iOS selain Safari tidak bisa Add to Home Screen
  const isIOSSafari = isIOS && /safari/i.test(ua) && !/crios|fxios|edgios|opios/i.test(ua)
  return { isIOS, isAndroid, isStandalone, isIOSSafari }
}

export function usePwaInstall() {
  const [canPrompt, setCanPrompt] = useState(deferred !== null)
  useEffect(() => {
    const l = () => setCanPrompt(deferred !== null)
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  }, [])
  return { canPrompt, promptInstall, ...detectPlatform() }
}
