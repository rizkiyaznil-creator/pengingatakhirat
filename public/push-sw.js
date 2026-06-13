// Handler Web Push untuk notifikasi adzan. Diimpor oleh service worker utama
// (lihat vite.config.ts → workbox.importScripts).
self.addEventListener('push', (event) => {
  let data = {}
  try {
    data = event.data ? event.data.json() : {}
  } catch (e) {
    data = { title: 'Dawam', body: event.data ? event.data.text() : '' }
  }
  const title = data.title || 'Waktu Sholat'
  const options = {
    body: data.body || 'Saatnya menunaikan sholat.',
    icon: 'icon.svg',
    badge: 'icon.svg',
    tag: data.tag || 'adzan',
    renotify: true,
    vibrate: [200, 100, 200],
    data: { url: data.url || './' },
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = (event.notification.data && event.notification.data.url) || './'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ('focus' in c) return c.focus()
      }
      if (self.clients.openWindow) return self.clients.openWindow(url)
    }),
  )
})
