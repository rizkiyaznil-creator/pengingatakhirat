import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import { DOA_QURANI, DOA_KATEGORI, type DoaRef } from '../data/doaQurani'
import { SURAH_LIST } from '../data/surahList'
import { fetchSurah, type Ayah } from '../lib/quranApi'
import StickyBack from '../components/StickyBack'
import { useBackable } from '../lib/navStack'

function surahName(n: number) {
  return SURAH_LIST.find((s) => s.no === n)?.nama ?? `Surah ${n}`
}
function refLabel(d: DoaRef) {
  return `QS ${surahName(d.surah)} : ${d.from === d.to ? d.from : `${d.from}–${d.to}`}`
}

export default function DoaQurani() {
  const [open, setOpen] = useState<DoaRef | null>(null)
  const [q, setQ] = useState('')
  const [kat, setKat] = useState<string>('Semua')
  const [favOnly, setFavOnly] = useState(false)
  const doaFav = useStore((s) => s.doaFav)
  useBackable(open !== null, () => setOpen(null))

  if (open) return <Detail doa={open} />

  const list = DOA_QURANI.filter((d) => {
    if (favOnly && !doaFav.includes(d.id)) return false
    if (kat !== 'Semua' && d.kategori !== kat) return false
    const s = q.trim().toLowerCase()
    if (s && !d.judul.toLowerCase().includes(s) && !surahName(d.surah).toLowerCase().includes(s)) return false
    return true
  })

  return (
    <div className="space-y-4">
      <StickyBack label="Lainnya" />
      <header className="pt-2">
        <h1 className="text-xl font-bold">Doa dari Al-Qur’an</h1>
        <p className="text-sm text-ocean-900/60">{DOA_QURANI.length} doa pilihan · teks dari mushaf</p>
      </header>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cari doa / surah…"
        className="w-full rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3 outline-none focus:border-ocean-400"
      />

      {/* Filter kategori */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        <Chip active={favOnly} onClick={() => setFavOnly((v) => !v)}>★ Favorit</Chip>
        <Chip active={kat === 'Semua' && !favOnly} onClick={() => { setKat('Semua'); setFavOnly(false) }}>Semua</Chip>
        {DOA_KATEGORI.map((k) => (
          <Chip key={k} active={kat === k} onClick={() => { setKat(k); setFavOnly(false) }}>{k}</Chip>
        ))}
      </div>

      <div className="card overflow-hidden">
        <ul className="divide-y divide-sand-200">
          {list.map((d) => (
            <li key={d.id}>
              <button onClick={() => setOpen(d)} className="flex w-full items-center gap-3 px-4 py-3 text-left transition active:bg-sand-100">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-tight">{d.judul}</p>
                  <p className="text-xs text-ocean-900/55">{refLabel(d)} · {d.kategori}</p>
                </div>
                {doaFav.includes(d.id) && <span className="text-clay-500">★</span>}
              </button>
            </li>
          ))}
          {list.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-ocean-900/50">Tidak ada doa yang cocok.</p>
          )}
        </ul>
      </div>
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        active ? 'bg-ocean-700 text-white' : 'bg-sand-200 text-ocean-900/60'
      }`}
    >
      {children}
    </button>
  )
}

function Detail({ doa }: { doa: DoaRef }) {
  const doaFav = useStore((s) => s.doaFav)
  const toggleFav = useStore((s) => s.toggleDoaFav)
  const isFav = doaFav.includes(doa.id)
  const [ayat, setAyat] = useState<Ayah[] | null>(null)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setErr('')
    fetchSurah(doa.surah)
      .then((all) => alive && setAyat(all.filter((a) => a.no >= doa.from && a.no <= doa.to)))
      .catch((e) => alive && setErr(e instanceof Error ? e.message : 'Gagal memuat'))
      .finally(() => alive && setLoading(false))
    return () => { alive = false }
  }, [doa])

  return (
    <div className="space-y-4 pb-4">
      <StickyBack
        label="Daftar doa"
        right={
          <button
            onClick={() => toggleFav(doa.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${isFav ? 'bg-clay-400/20 text-clay-600' : 'bg-sand-200 text-ocean-900/55'}`}
          >
            {isFav ? '★ Favorit' : '☆ Favoritkan'}
          </button>
        }
      />

      <header>
        <h1 className="text-xl font-bold">{doa.judul}</h1>
        <p className="text-sm text-ocean-900/60">{refLabel(doa)} · {doa.kategori}</p>
      </header>

      {loading && <div className="card px-5 py-8 text-center text-sm text-ocean-900/50">Memuat ayat…</div>}
      {err && (
        <div className="card px-5 py-6 text-center">
          <p className="text-sm font-semibold text-cheer">Gagal memuat</p>
          <p className="mt-1 text-xs text-ocean-900/55">{err}. Butuh internet saat pertama memuat doa ini.</p>
        </div>
      )}
      {ayat && (
        <div className="card px-5 py-5">
          {ayat.map((a) => (
            <div key={a.no} className="mb-4 border-b border-sand-200 pb-4 last:mb-0 last:border-0 last:pb-0">
              <p className="font-arabic arabic-text text-right leading-loose text-ocean-900" dir="rtl">{a.arab}</p>
              <p className="mt-2 text-sm leading-relaxed text-ocean-900/75">{a.terjemah}</p>
              <p className="mt-1 text-[11px] text-ocean-900/40">{surahName(doa.surah)} : {a.no}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
