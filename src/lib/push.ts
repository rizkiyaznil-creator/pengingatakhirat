import { supabase, isCloudEnabled } from './supabase'
import { useStore } from '../store/useStore'

// Kunci VAPID publik (aman tampil di frontend). Bisa di-override lewat env.
const VAPID_PUBLIC =
  (import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined)?.trim() ||
  'BMEg2gDHRbk23RTgC3YFVw03uMfUUel69A25IKkNND_3dkctS2hYXS8XMWgz1EJw7JCeKoqs-WVpFVHMB_QdRXk'

export const pushSupported =
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator &&
  'PushManager' in window &&
  'Notification' in window

export function notifPermission(): NotificationPermission {
  return typeof Notification !== 'undefined' ? Notification.permission : 'denied'
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64)
  const out = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i)
  return out
}

async function saveSubscription(sub: PushSubscription) {
  if (!supabase) return
  const { data } = await supabase.auth.getUser()
  const user = data.user
  if (!user) return
  const st = useStore.getState()
  const json = sub.toJSON()
  await supabase.from('push_subscriptions').upsert(
    {
      user_id: user.id,
      endpoint: sub.endpoint,
      p256dh: json.keys?.p256dh,
      auth: json.keys?.auth,
      lat: st.profile.lat,
      lng: st.profile.lng,
      method: st.profile.method,
      madhab: st.profile.madhab,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      prayers: st.notif.prayers,
      minutes_before: st.notif.minutesBefore,
      enabled: st.notif.enabled,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'endpoint' },
  )
}

// Aktifkan: minta izin, langganan push, simpan ke server. Kembalikan pesan error / null.
export async function enableAdzanPush(): Promise<string | null> {
  if (!pushSupported) return 'Perangkat/browser ini tidak mendukung notifikasi.'
  const perm = await Notification.requestPermission()
  if (perm !== 'granted') return 'Izin notifikasi ditolak. Aktifkan lewat pengaturan browser.'
  try {
    const reg = await navigator.serviceWorker.ready
    let sub = await reg.pushManager.getSubscription()
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC) as BufferSource,
      })
    }
    await saveSubscription(sub)
    return null
  } catch (e) {
    return e instanceof Error ? e.message : 'Gagal mengaktifkan notifikasi.'
  }
}

// Perbarui data langganan di server (mis. saat pengaturan/lokasi berubah).
export async function syncSubscription() {
  if (!pushSupported || !isCloudEnabled) return
  try {
    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.getSubscription()
    if (sub) await saveSubscription(sub)
  } catch {
    /* abaikan */
  }
}

export async function disableAdzanPush() {
  if (!pushSupported) return
  try {
    const reg = await navigator.serviceWorker.ready
    const sub = await reg.pushManager.getSubscription()
    if (sub) {
      if (supabase) await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint)
      await sub.unsubscribe()
    }
  } catch {
    /* abaikan */
  }
}

// Minta server (Edge Function) mengirim push ke perangkat ini — uji jalur lengkap.
export async function testServerPush(): Promise<string | null> {
  if (!isCloudEnabled || !supabase) return 'Server cloud belum aktif.'
  try {
    const { data, error } = await supabase.functions.invoke('send-adzan', {
      body: { test: true },
    })
    if (error) return error.message || 'Gagal memanggil server push.'
    const tested = (data as { tested?: number } | null)?.tested ?? 0
    if (tested === 0)
      return 'Server jalan, tapi belum ada langganan. Aktifkan notifikasi dulu, lalu coba lagi.'
    return null
  } catch (e) {
    return e instanceof Error ? e.message : 'Gagal memanggil server push.'
  }
}

// Tampilkan notifikasi uji lokal (tanpa server) untuk memastikan izin & SW jalan.
export async function testNotification(): Promise<string | null> {
  if (!pushSupported) return 'Perangkat/browser ini tidak mendukung notifikasi.'
  const perm = notifPermission() === 'granted' ? 'granted' : await Notification.requestPermission()
  if (perm !== 'granted') return 'Izin notifikasi ditolak.'
  const reg = await navigator.serviceWorker.ready
  await reg.showNotification('Tes Adzan · Dawam', {
    body: 'Notifikasi berhasil! Begini tampilannya saat masuk waktu sholat.',
    icon: 'icon.svg',
    badge: 'icon.svg',
    vibrate: [200, 100, 200],
    tag: 'adzan-test',
  } as NotificationOptions)
  return null
}
