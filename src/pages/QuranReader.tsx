import { useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import { SURAH_LIST } from '../data/surahList'
import { fetchSurah, type Ayah } from '../lib/quranApi'
import StickyBack from '../components/StickyBack'
import { useBackable } from '../lib/navStack'

export default function QuranReader() {
  const [surah, setSurah] = useState<number | null>(null)
  useBackable(surah !== null, () => setSurah(null))
  if (surah) return <Reader surah={surah} />
  return <SurahList onOpen={setSurah} />
}

function SurahList({ onOpen }: { onOpen: (n: number) => void }) {
  const [q, setQ] = useState('')
  const lastRead = useStore((s) => s.reader.lastRead)
  const bookmarks = useStore((s) => s.reader.bookmarks)

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? SURAH_LIST.filter((x) => x.nama.toLowerCase().includes(s) || String(x.no) === s) : SURAH_LIST
  }, [q])

  const lastMeta = lastRead ? SURAH_LIST.find((s) => s.no === lastRead.surah) : null

  return (
    <div className="space-y-4">
      <StickyBack label="Lainnya" />
      <header className="pt-2">
        <h1 className="text-xl font-bold">Al-Qur’an</h1>
        <p className="text-sm text-ocean-900/60">114 surah · teks Utsmani</p>
      </header>

      {lastMeta && lastRead && (
        <button
          onClick={() => onOpen(lastRead.surah)}
          className="card flex w-full items-center gap-3 px-4 py-3.5 text-left transition active:scale-[0.99]"
        >
          <span className="text-2xl">🔖</span>
          <div className="flex-1">
            <p className="text-xs text-ocean-900/55">Lanjut baca</p>
            <p className="font-semibold">{lastMeta.nama} : ayat {lastRead.ayah}</p>
          </div>
          <span className="text-sm font-semibold text-ocean-600">Buka →</span>
        </button>
      )}

      {bookmarks.length > 0 && (
        <div className="card overflow-hidden">
          <p className="border-b border-sand-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ocean-900/45">
            Penanda · {bookmarks.length}
          </p>
          <ul className="divide-y divide-sand-200">
            {bookmarks.map((b) => {
              const m = SURAH_LIST.find((s) => s.no === b.surah)
              return (
                <li key={`${b.surah}-${b.ayah}`}>
                  <button onClick={() => onOpen(b.surah)} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm active:bg-sand-100">
                    <span className="text-clay-500">🔖</span>
                    <span className="flex-1 font-medium">{m?.nama}</span>
                    <span className="text-xs text-ocean-900/45">ayat {b.ayah}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cari surah / nomor…"
        className="w-full rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3 outline-none focus:border-ocean-400"
      />

      <div className="card overflow-hidden">
        <ul className="divide-y divide-sand-200">
          {list.map((s) => (
            <li key={s.no}>
              <button onClick={() => onOpen(s.no)} className="flex w-full items-center gap-3 px-4 py-3 text-left transition active:bg-sand-100">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-600">
                  {s.no}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-tight">{s.nama}</p>
                  <p className="text-xs text-ocean-900/55">{s.arti} · {s.ayat} ayat</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Reader({ surah }: { surah: number }) {
  const meta = SURAH_LIST.find((s) => s.no === surah)!
  const setLastRead = useStore((s) => s.setLastRead)
  const toggleBookmark = useStore((s) => s.toggleBookmark)
  const bookmarks = useStore((s) => s.reader.bookmarks)
  const [ayat, setAyat] = useState<Ayah[] | null>(null)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  const [showTerjemah, setShowTerjemah] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setErr('')
    setLastRead(surah, 1)
    fetchSurah(surah)
      .then((all) => alive && setAyat(all))
      .catch((e) => alive && setErr(e instanceof Error ? e.message : 'Gagal memuat'))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
      audioRef.current?.pause()
    }
  }, [surah, setLastRead])

  function playAyah(a: Ayah) {
    setLastRead(surah, a.no)
    const el = audioRef.current!
    el.src = a.audio
    el.play().catch(() => {})
  }

  const isMarked = (n: number) => bookmarks.some((b) => b.surah === surah && b.ayah === n)

  return (
    <div className="space-y-4 pb-4">
      <StickyBack
        label="Daftar surah"
        right={
          <button
            onClick={() => setShowTerjemah((v) => !v)}
            className="rounded-lg bg-sand-200 px-3 py-1.5 text-xs font-semibold text-ocean-600"
          >
            {showTerjemah ? 'Sembunyikan terjemah' : 'Tampilkan terjemah'}
          </button>
        }
      />

      <header className="text-center">
        <h1 className="text-xl font-bold">{meta.nama}</h1>
        <p className="text-sm text-ocean-900/60">{meta.arti} · {meta.ayat} ayat</p>
      </header>

      {loading && <div className="card px-5 py-8 text-center text-sm text-ocean-900/50">Memuat surah…</div>}
      {err && (
        <div className="card px-5 py-6 text-center">
          <p className="text-sm font-semibold text-cheer">Gagal memuat</p>
          <p className="mt-1 text-xs text-ocean-900/55">{err}. Butuh internet saat pertama memuat surah ini.</p>
        </div>
      )}

      {ayat?.map((a) => (
        <div key={a.no} className="card px-5 py-4">
          <div className="mb-2 flex items-center justify-between">
            <button
              onClick={() => playAyah(a)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-600"
              aria-label={`Putar ayat ${a.no}`}
            >
              ▶
            </button>
            <span className="text-xs text-ocean-900/45">Ayat {a.no}</span>
            <button
              onClick={() => toggleBookmark(surah, a.no)}
              className={`text-lg ${isMarked(a.no) ? 'text-clay-500' : 'text-ocean-900/25'}`}
              aria-label="Tandai"
            >
              {isMarked(a.no) ? '🔖' : '🏷️'}
            </button>
          </div>
          <p className="font-arabic arabic-text text-right leading-loose text-ocean-900" dir="rtl">{a.arab}</p>
          {showTerjemah && <p className="mt-2 text-sm leading-relaxed text-ocean-900/70">{a.terjemah}</p>}
        </div>
      ))}

      <audio ref={audioRef} preload="none" />
    </div>
  )
}
