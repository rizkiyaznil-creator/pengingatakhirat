// Supabase Edge Function (Deno) — pengirim notifikasi adzan via Web Push.
// Dua mode:
//   • cron (tanpa body): kirim adzan yang jatuh pada menit ini (dipanggil tiap menit).
//   • tes (body {test:true} + token pengguna): kirim push uji ke perangkat pengguna sekarang.
//
// Secret yang perlu di-set: VAPID_PUBLIC, VAPID_PRIVATE, VAPID_SUBJECT.
// PENTING: matikan "Verify JWT" pada function agar cron & pemanggilan dari browser jalan.

import webpush from 'npm:web-push@3.6.7'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from 'npm:adhan@4.4.3'

webpush.setVapidDetails(
  Deno.env.get('VAPID_SUBJECT') ?? 'mailto:admin@dawam.app',
  Deno.env.get('VAPID_PUBLIC')!,
  Deno.env.get('VAPID_PRIVATE')!,
)

const URL = Deno.env.get('SUPABASE_URL')!
const admin = createClient(URL, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

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

// deno-lint-ignore no-explicit-any
async function pushTo(s: any, payload: string): Promise<boolean> {
  try {
    await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload)
    return true
  } catch (e) {
    const code = (e as { statusCode?: number }).statusCode
    if (code === 404 || code === 410) await admin.from('push_subscriptions').delete().eq('endpoint', s.endpoint)
    return false
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  let body: { test?: boolean } = {}
  try { body = await req.json() } catch { /* cron tanpa body */ }

  // ----- Mode tes: kirim push uji ke perangkat pengguna -----
  if (body && body.test) {
    const authHeader = req.headers.get('Authorization') ?? ''
    const userClient = createClient(URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    })
    const { data: u } = await userClient.auth.getUser()
    if (!u.user) return json({ error: 'unauthorized' }, 401)
    const { data: subs } = await admin.from('push_subscriptions').select('*').eq('user_id', u.user.id)
    const payload = JSON.stringify({
      title: 'Tes Adzan · Dawam',
      body: 'Push dari server berhasil! 🎉 Notifikasi adzan siap.',
      tag: 'adzan-test',
      url: './',
    })
    let sent = 0
    for (const s of subs ?? []) if (await pushTo(s, payload)) sent++
    return json({ tested: sent })
  }

  // ----- Mode cron: kirim adzan yang jatuh pada menit ini -----
  const now = Date.now()
  const { data: subs, error } = await admin.from('push_subscriptions').select('*').eq('enabled', true)
  if (error) return json({ error: error.message }, 500)

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
    if (await pushTo(s, payload)) sent++
  }
  return json({ sent })
})
