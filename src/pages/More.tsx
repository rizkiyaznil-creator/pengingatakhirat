import { useEffect, useState } from 'react'
import { useUi } from '../lib/useUi'
import { useStore } from '../store/useStore'
import Quran from './Quran'
import QuranReader from './QuranReader'
import Hafalan from './Hafalan'
import DoaQurani from './DoaQurani'
import Dzikir from './Dzikir'
import DzikirSholat from './DzikirSholat'
import Kalender from './Kalender'
import AsmaulHusna from './AsmaulHusna'
import HaditsArbain from './HaditsArbain'
import HaidReport from './HaidReport'
import PanduanMusafir from './PanduanMusafir'
import { ChevronRight } from '../components/icons'
import { useBackable } from '../lib/navStack'

type Sub = 'baca' | 'quran' | 'hafalan' | 'doa' | 'dzikir' | 'dzikirsholat' | 'kalender' | 'asma' | 'hadits' | 'haid' | 'musafir'

const MENU: { id: Sub; icon: string; title: string; sub: string; femaleOnly?: boolean }[] = [
  { id: 'baca', icon: '📕', title: 'Baca Al-Qur’an', sub: '114 surah · audio · penanda' },
  { id: 'quran', icon: '📖', title: 'Khatam Qur’an', sub: 'Target & progres bacaan' },
  { id: 'hafalan', icon: '🧠', title: 'Hafalan Qur’an', sub: 'Sabaq–Sabqi–Manzil + talqin' },
  { id: 'doa', icon: '🤲', title: 'Doa dari Al-Qur’an', sub: '36 doa pilihan · teks dari mushaf' },
  { id: 'dzikir', icon: '🌅', title: 'Dzikir Pagi & Petang', sub: 'Dzikir masyhur + penghitung' },
  { id: 'dzikirsholat', icon: '📿', title: 'Dzikir Setelah Sholat', sub: 'Bacaan ba’da sholat fardhu' },
  { id: 'musafir', icon: '🧳', title: 'Panduan Musafir', sub: 'Doa, qashar, jamak, & tayamum' },
  { id: 'kalender', icon: '🗓️', title: 'Kalender Hijriah', sub: 'Tanggal Hijriah & puasa sunnah' },
  { id: 'asma', icon: '✨', title: '99 Asmaul Husna', sub: 'Nama-nama indah Allah' },
  { id: 'hadits', icon: '📜', title: 'Hadits Arba’in', sub: '42 hadits Imam An-Nawawi' },
  { id: 'haid', icon: '🌸', title: 'Catatan Haid', sub: 'Pencatatan & pola siklus', femaleOnly: true },
]

export default function More() {
  const [sub, setSub] = useState<Sub | null>(null)
  const isFemale = useStore((s) => s.profile.gender === 'female')
  const menu = MENU.filter((m) => !m.femaleOnly || isFemale)
  const consumeSub = useUi((s) => s.consumeSub)
  // Buka modul yang diminta lewat pintasan Beranda.
  useEffect(() => {
    const target = consumeSub()
    if (target) setSub(target as Sub)
  }, [consumeSub])
  // Tombol back perangkat menutup sub-halaman ini (kembali ke menu Lainnya).
  useBackable(sub !== null, () => setSub(null))

  if (sub) {
    return (
      <div>
        {sub === 'baca' && <QuranReader />}
        {sub === 'quran' && <Quran />}
        {sub === 'hafalan' && <Hafalan />}
        {sub === 'doa' && <DoaQurani />}
        {sub === 'dzikir' && <Dzikir />}
        {sub === 'dzikirsholat' && <DzikirSholat />}
        {sub === 'kalender' && <Kalender />}
        {sub === 'asma' && <AsmaulHusna />}
        {sub === 'hadits' && <HaditsArbain />}
        {sub === 'haid' && <HaidReport />}
        {sub === 'musafir' && <PanduanMusafir />}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <header className="pt-2">
        <h1 className="text-xl font-bold">Lainnya</h1>
        <p className="text-sm text-ocean-900/60">Qur’an, kalender, & bacaan</p>
      </header>

      <div className="card overflow-hidden">
        <ul className="divide-y divide-sand-200">
          {menu.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => setSub(m.id)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition active:bg-sand-100"
              >
                <span className="text-2xl">{m.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-tight">{m.title}</p>
                  <p className="text-xs text-ocean-900/55">{m.sub}</p>
                </div>
                <ChevronRight size={18} className="shrink-0 text-ocean-900/30" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
