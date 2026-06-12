import { useEffect, useMemo, useRef, useState } from 'react'
import { useStore, type HafalanItem } from '../store/useStore'
import { SURAH_LIST } from '../data/surahList'
import { fetchSurah, type Ayah } from '../lib/quranApi'
import {
  categoryOf,
  isDue,
  setoranStreak,
  CATEGORY_LABEL,
  type HafalanCategory,
  type HafalanGrade,
} from '../lib/hafalan'
import { FlameIcon, PlusIcon, TrashIcon } from '../components/icons'
import StickyBack from '../components/StickyBack'
import { useBackable, navBack } from '../lib/navStack'

export default function Hafalan() {
  const hafalan = useStore((s) => s.hafalan)
  const setoranDaily = useStore((s) => s.setoranDaily)
  const [view, setView] = useState<'list' | 'add'>('list')
  const [review, setReview] = useState<HafalanItem | null>(null)

  const streak = useMemo(() => setoranStreak(setoranDaily), [setoranDaily])

  useBackable(review !== null, () => setReview(null))
  useBackable(view === 'add', () => setView('list'))

  if (review) return <Review item={review} />
  if (view === 'add') return <AddHafalan />

  const due = hafalan.filter((h) => isDue(h.nextDue))
  const groups: Record<HafalanCategory, HafalanItem[]> = { sabaq: [], sabqi: [], manzil: [] }
  for (const h of due) groups[categoryOf(h.box)].push(h)

  return (
    <div className="space-y-4">
      <StickyBack label="Lainnya" />
      <header className="flex items-start justify-between pt-2">
        <div>
          <h1 className="text-xl font-bold">Hafalan Qur’an</h1>
          <p className="text-sm text-ocean-900/60">Metode Sabaq · Sabqi · Manzil</p>
        </div>
        {streak > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-clay-400/20 px-3 py-1 text-sm font-semibold text-clay-600">
            <FlameIcon size={14} /> {streak} hari
          </span>
        )}
      </header>

      {/* Setoran hari ini */}
      {due.length === 0 ? (
        <div className="card px-5 py-6 text-center">
          <p className="text-3xl">🎉</p>
          <p className="mt-1 font-semibold">Setoran hari ini selesai</p>
          <p className="text-xs text-ocean-900/55">
            {hafalan.length === 0 ? 'Tambah hafalan untuk mulai.' : 'Murojaah berikutnya dijadwalkan otomatis.'}
          </p>
        </div>
      ) : (
        (['sabaq', 'sabqi', 'manzil'] as HafalanCategory[]).map((cat) =>
          groups[cat].length === 0 ? null : (
            <div key={cat} className="card overflow-hidden">
              <p className="border-b border-sand-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ocean-900/45">
                {CATEGORY_LABEL[cat]} · {groups[cat].length}
              </p>
              <ul className="divide-y divide-sand-200">
                {groups[cat].map((h) => (
                  <li key={h.id}>
                    <button
                      onClick={() => setReview(h)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition active:bg-sand-100"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-600">
                        {h.surah}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold leading-tight">{h.nama}</p>
                        <p className="text-xs text-ocean-900/55">Ayat {h.fromAyah}–{h.toAyah} · box {h.box}</p>
                      </div>
                      <span className="text-xs font-semibold text-ocean-600">Setor →</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ),
        )
      )}

      {/* Semua hafalan */}
      {hafalan.length > 0 && (
        <div className="card overflow-hidden">
          <p className="border-b border-sand-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ocean-900/45">
            Semua hafalan · {hafalan.length}
          </p>
          <ul className="divide-y divide-sand-200">
            {hafalan.map((h) => (
              <AllRow key={h.id} item={h} />
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setView('add')}
        className="btn-primary flex w-full items-center justify-center gap-1.5"
      >
        <PlusIcon size={18} /> Tambah hafalan
      </button>
    </div>
  )
}

function AllRow({ item }: { item: HafalanItem }) {
  const remove = useStore((s) => s.removeHafalan)
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-200 text-xs font-bold text-ocean-600">
        {item.surah}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium leading-tight">{item.nama}</p>
        <p className="text-xs text-ocean-900/55">
          Ayat {item.fromAyah}–{item.toAyah} · {CATEGORY_LABEL[categoryOf(item.box)].split(' ·')[0]} · jatuh tempo {item.nextDue}
        </p>
      </div>
      <button
        onClick={() => remove(item.id)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-cheer/10 text-cheer transition active:scale-90"
        aria-label="Hapus"
      >
        <TrashIcon size={16} />
      </button>
    </div>
  )
}

// ---------- Tambah hafalan ----------
function AddHafalan() {
  const addHafalan = useStore((s) => s.addHafalan)
  const [surah, setSurah] = useState(114) // default An-Nas
  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(6)
  const [q, setQ] = useState('')

  const meta = SURAH_LIST.find((s) => s.no === surah)!
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? SURAH_LIST.filter((x) => x.nama.toLowerCase().includes(s) || String(x.no) === s) : SURAH_LIST
  }, [q])

  function pick(no: number, ayat: number) {
    setSurah(no)
    setFrom(1)
    setTo(ayat)
    setQ('')
  }

  function save() {
    const f = Math.max(1, Math.min(from, meta.ayat))
    const t = Math.max(f, Math.min(to, meta.ayat))
    addHafalan(surah, meta.nama, f, t)
    navBack()
  }

  return (
    <div className="space-y-4">
      <StickyBack label="Hafalan" />
      <h1 className="text-xl font-bold">Tambah Hafalan</h1>

      <div className="card px-4 py-4">
        <p className="mb-2 text-sm font-semibold">Pilih surah</p>
        <p className="mb-2 rounded-xl bg-ocean-100 px-3 py-2 text-sm font-semibold text-ocean-600">
          {meta.no}. {meta.nama} — {meta.arti} ({meta.ayat} ayat)
        </p>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari surah / nomor…"
          className="mb-2 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2.5 text-sm outline-none focus:border-ocean-400"
        />
        <div className="max-h-48 overflow-y-auto rounded-xl border border-sand-200">
          {filtered.map((s) => (
            <button
              key={s.no}
              onClick={() => pick(s.no, s.ayat)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition active:bg-sand-100 ${
                s.no === surah ? 'bg-ocean-50' : ''
              }`}
            >
              <span className="w-6 text-xs text-ocean-900/45">{s.no}</span>
              <span className="flex-1 font-medium">{s.nama}</span>
              <span className="text-xs text-ocean-900/45">{s.ayat} ayat</span>
            </button>
          ))}
        </div>
      </div>

      <div className="card px-4 py-4">
        <p className="mb-2 text-sm font-semibold">Rentang ayat</p>
        <div className="flex items-center gap-3">
          <label className="flex-1 text-sm">
            <span className="mb-1 block text-xs text-ocean-900/55">Dari ayat</span>
            <input
              type="number"
              min={1}
              max={meta.ayat}
              value={from}
              onChange={(e) => setFrom(Number(e.target.value))}
              className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2.5 outline-none focus:border-ocean-400"
            />
          </label>
          <label className="flex-1 text-sm">
            <span className="mb-1 block text-xs text-ocean-900/55">Sampai ayat</span>
            <input
              type="number"
              min={1}
              max={meta.ayat}
              value={to}
              onChange={(e) => setTo(Number(e.target.value))}
              className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2.5 outline-none focus:border-ocean-400"
            />
          </label>
        </div>
      </div>

      <button onClick={save} className="btn-primary w-full">
        Simpan & jadikan setoran hari ini
      </button>
    </div>
  )
}

// ---------- Review / setoran ----------
function Review({ item }: { item: HafalanItem }) {
  const grade = useStore((s) => s.gradeHafalan)
  const [ayat, setAyat] = useState<Ayah[] | null>(null)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  const [showTerjemah, setShowTerjemah] = useState(false)
  const [count, setCount] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [repeat, setRepeat] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const idxRef = useRef(0)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setErr('')
    fetchSurah(item.surah)
      .then((all) => {
        if (!alive) return
        setAyat(all.filter((a) => a.no >= item.fromAyah && a.no <= item.toAyah))
      })
      .catch((e) => alive && setErr(e instanceof Error ? e.message : 'Gagal memuat'))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
      audioRef.current?.pause()
    }
  }, [item])

  function playFrom(i: number) {
    if (!ayat || ayat.length === 0) return
    idxRef.current = i
    const el = audioRef.current!
    el.src = ayat[i].audio
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }

  function onEnded() {
    if (!ayat) return
    const next = idxRef.current + 1
    if (next < ayat.length) {
      playFrom(next)
    } else if (repeat) {
      setCount((c) => Math.min(20, c + 1)) // satu kali ulang penuh = +1 hitungan
      playFrom(0)
    } else {
      setPlaying(false)
    }
  }

  function togglePlay() {
    const el = audioRef.current!
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      if (!el.src) playFrom(0)
      else el.play().then(() => setPlaying(true))
    }
  }

  function doGrade(g: HafalanGrade) {
    audioRef.current?.pause()
    grade(item.id, g)
    navBack()
  }

  return (
    <div className="space-y-4 pb-4">
      <StickyBack label="Selesai nanti" />

      <header>
        <h1 className="text-xl font-bold">{item.nama}</h1>
        <p className="text-sm text-ocean-900/60">Ayat {item.fromAyah}–{item.toAyah} · setoran</p>
      </header>

      {/* Talqin & hitungan ulang */}
      <div className="card px-5 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={togglePlay}
            disabled={loading || !!err}
            className="flex items-center gap-2 rounded-xl bg-ocean-700 px-4 py-2.5 text-sm font-semibold text-white transition active:scale-95 disabled:opacity-50"
          >
            {playing ? '⏸ Jeda' : '▶ Talqin'}
          </button>
          <button
            onClick={() => setRepeat((v) => !v)}
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
              repeat ? 'bg-ocean-100 text-ocean-600' : 'bg-sand-200 text-ocean-900/55'
            }`}
          >
            🔁 Ulang terus {repeat ? 'on' : 'off'}
          </button>
        </div>

        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs text-ocean-900/55">
            <span>Hitungan ulang</span>
            <span className="font-semibold text-ocean-600">{count}/20</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-sand-200">
            <div className="h-full rounded-full bg-clay-500 transition-all" style={{ width: `${(count / 20) * 100}%` }} />
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setCount((c) => Math.min(20, c + 1))}
              className="flex-1 rounded-xl bg-clay-500 py-2.5 text-sm font-semibold text-white transition active:scale-95"
            >
              + Sudah saya ulang
            </button>
            <button
              onClick={() => setCount(0)}
              className="rounded-xl bg-sand-200 px-3 py-2.5 text-sm font-medium text-ocean-900/60"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Ayat */}
      {loading && <div className="card px-5 py-8 text-center text-sm text-ocean-900/50">Memuat ayat…</div>}
      {err && (
        <div className="card px-5 py-6 text-center">
          <p className="text-sm font-semibold text-cheer">Gagal memuat ayat</p>
          <p className="mt-1 text-xs text-ocean-900/55">{err}. Butuh internet saat pertama kali memuat surah ini.</p>
        </div>
      )}
      {ayat && (
        <div className="card px-5 py-4">
          <div className="mb-3 flex justify-end">
            <button
              onClick={() => setShowTerjemah((v) => !v)}
              className="rounded-lg bg-sand-200 px-3 py-1.5 text-xs font-semibold text-ocean-600"
            >
              {showTerjemah ? 'Sembunyikan terjemah' : 'Tampilkan terjemah'}
            </button>
          </div>
          <div className="space-y-4">
            {ayat.map((a, i) => (
              <div key={a.no} className="border-b border-sand-200 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start gap-2">
                  <button
                    onClick={() => playFrom(i)}
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-[11px] font-bold text-ocean-600"
                    aria-label={`Putar ayat ${a.no}`}
                  >
                    {a.no}
                  </button>
                  <p className="font-arabic flex-1 text-right text-2xl leading-loose text-ocean-900" dir="rtl">
                    {a.arab}
                  </p>
                </div>
                {showTerjemah && <p className="mt-2 text-sm leading-relaxed text-ocean-900/70">{a.terjemah}</p>}
              </div>
            ))}
          </div>
          {!showTerjemah && (
            <p className="mt-3 text-center text-[11px] text-ocean-900/40">
              Terjemahan disembunyikan — latih hafalan dengan active recall 🧠
            </p>
          )}
        </div>
      )}

      {/* Penilaian */}
      <div className="card px-5 py-4">
        <p className="mb-2 text-center text-xs text-ocean-900/55">Bagaimana hafalanmu?</p>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => doGrade('lupa')} className="rounded-xl bg-cheer/10 py-3 text-sm font-semibold text-cheer transition active:scale-95">
            Lupa
          </button>
          <button onClick={() => doGrade('ragu')} className="rounded-xl bg-clay-400/20 py-3 text-sm font-semibold text-clay-600 transition active:scale-95">
            Ragu
          </button>
          <button onClick={() => doGrade('lancar')} className="rounded-xl bg-ocean-700 py-3 text-sm font-semibold text-white transition active:scale-95">
            Lancar
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-ocean-900/40">
          Jadwal murojaah berikutnya diatur otomatis (Leitner).
        </p>
      </div>

      <audio ref={audioRef} onEnded={onEnded} preload="none" />
    </div>
  )
}
