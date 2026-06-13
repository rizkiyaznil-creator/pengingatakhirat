// Supabase Edge Function (Deno) — pengirim notifikasi adzan via Web Push.
// Dijalankan tiap menit oleh cron. Untuk tiap langganan aktif, hitung waktu sholat
// di lokasi pengguna; bila ada sholat (terpilih) yang jatuh pada menit ini
// (dikurangi "minutes_before"), kirim Web Push.
//
// Secret yang perlu di-set (Project Settings → Edge Functions → Secrets):
//   VAPID_PUBLIC, VAPID_PRIVATE, VAPID_SUBJECT (mis. mailto:kamu@email.com)
// SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY otomatis tersedia di runtime.

import webpush from 'npm:web-push@3.6.7'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from 'npm:adhan@4.4.3'

webpush.setVapidDetails(
  Deno.env.get('VAPID_SUBJECT') ?? 'mailto:admin@dawam.app',
  Deno.env.get('VAPID_PUBLIC')!,
  Deno.env.get('VAPID_PRIVATE')!,
)

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

const LABEL: Record<string, string> = {
  subuh: 'Subuh', dzuhur: 'Dzuhur', ashar: 'Ashar', maghrib: 'Maghrib', isya: 'Isya',
}
const ALL = ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya']

function buildParams(method: string, madhab: string) {
  let p
  switch (method) {
    case 'Kemenag': p = CalculationMethod.Other(); p.fajrAngle = 20; p.ishaAngle = 18; break
    case 'MWL': p = CalculationMethod.MuslimWorldLeague(); break
    case 'UmmAlQura': p = CalculationMethod.UmmAlQura(); break
    case 'Egyptian': p = CalculationMethod.Egyptian(); break
    case 'Karachi': p = CalculationMethod.Karachi(); break
    default: p = CalculationMethod.MuslimWorldLeague()
  }
  p.madhab = madhab === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi
  return p
}

function timesOf(pt: PrayerTimes): Record<string, Date> {
  return { subuh: pt.fajr, dzuhur: pt.dhuhr, ashar: pt.asr, maghrib: pt.maghrib, isya: pt.isha }
}

Deno.serve(async () => {
  const now = Date.now()
  const { data: subs, error } = await supabase
    .from('push_subscriptions')
    .select('*')
    .eq('enabled', true)
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })

  let sent = 0
  for (const s of subs ?? []) {
    const coords = new Coordinates(s.lat, s.lng)
    const par = buildParams(s.method ?? 'MWL', s.madhab ?? 'syafii')
    const enabled: string[] = (s.prayers && s.prayers.length ? s.prayers : ALL)

    let due: string | null = null
    for (const off of [-1, 0, 1]) {
      const d = new Date(now + off * 86400000)
      const times = timesOf(new PrayerTimes(coords, d, par))
      for (const p of enabled) {
        const target = times[p].getTime() - (s.minutes_before ?? 0) * 60000
        if (now >= target && now < target + 60000) { due = p; break }
      }
      if (due) break
    }
    if (!due) continue

    const payload = JSON.stringify({
      title: `Waktu ${LABEL[due] ?? 'Sholat'}`,
      body: 'Saatnya menunaikan sholat. Hayya ‘alash-shalah.',
      tag: `adzan-${due}`,
      url: './',
    })
    try {
      await webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        payload,
      )
      sent++
    } catch (e) {
      const code = (e as { statusCode?: number }).statusCode
      if (code === 404 || code === 410) {
        await supabase.from('push_subscriptions').delete().eq('endpoint', s.endpoint)
      }
    }
  }
  return new Response(JSON.stringify({ sent }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
