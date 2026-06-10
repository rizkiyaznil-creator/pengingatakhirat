// Ambil lokasi perangkat. Reverse-geocode nama kota dilakukan best-effort (butuh internet);
// jika gagal, koordinat tetap dipakai dan nama kota bisa diisi manual.

export interface GeoResult {
  lat: number
  lng: number
  city?: string
}

export function getCurrentLocation(): Promise<GeoResult> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Perangkat tidak mendukung geolokasi'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        let city: string | undefined
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&accept-language=id`,
            { headers: { 'Accept': 'application/json' } },
          )
          if (res.ok) {
            const data = await res.json()
            city =
              data.address?.city ||
              data.address?.town ||
              data.address?.county ||
              data.address?.state
          }
        } catch {
          // offline / diblokir — abaikan, pakai koordinat saja
        }
        resolve({ lat, lng, city })
      },
      (err) => reject(new Error(humanizeGeoError(err))),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    )
  })
}

function humanizeGeoError(err: GeolocationPositionError): string {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      return 'Izin lokasi ditolak. Aktifkan lewat pengaturan browser.'
    case err.POSITION_UNAVAILABLE:
      return 'Lokasi tidak tersedia saat ini.'
    case err.TIMEOUT:
      return 'Permintaan lokasi habis waktu. Coba lagi.'
    default:
      return 'Gagal mendapatkan lokasi.'
  }
}
