import { useState } from 'react'
import Quran from './Quran'
import QuranReader from './QuranReader'
import Hafalan from './Hafalan'
import Muhasabah from './Muhasabah'
import DoaQurani from './DoaQurani'
import Kalender from './Kalender'
import AsmaulHusna from './AsmaulHusna'
import HaditsArbain from './HaditsArbain'
import { ChevronRight } from '../components/icons'

type Sub = 'baca' | 'quran' | 'hafalan' | 'muhasabah' | 'doa' | 'kalender' | 'asma' | 'hadits'

const MENU: { id: Sub; icon: string; title: string; sub: string }[] = [
  { id: 'baca', icon: '📕', title: 'Baca Al-Qur’an', sub: '114 surah · audio · penanda' },
  { id: 'quran', icon: '📖', title: 'Khatam Qur’an', sub: 'Target & progres bacaan' },
  { id: 'hafalan', icon: '🧠', title: 'Hafalan Qur’an', sub: 'Sabaq–Sabqi–Manzil + talqin' },
  { id: 'doa', icon: '🤲', title: 'Doa dari Al-Qur’an', sub: '36 doa pilihan · teks dari mushaf' },
  { id: 'muhasabah', icon: '🌙', title: 'Muhasabah Malam', sub: 'Refleksi & heatmap mood' },
  { id: 'kalender', icon: '🗓️', title: 'Kalender Hijriah', sub: 'Tanggal Hijriah & puasa sunnah' },
  { id: 'asma', icon: '✨', title: '99 Asmaul Husna', sub: 'Nama-nama indah Allah' },
  { id: 'hadits', icon: '📜', title: 'Hadits Arba’in', sub: '42 hadits Imam An-Nawawi' },
]

export default function More() {
  const [sub, setSub] = useState<Sub | null>(null)

  if (sub) {
    return (
      <div>
        <button
          onClick={() => setSub(null)}
          className="mb-1 flex items-center gap-1 pt-2 text-sm font-semibold text-ocean-600"
        >
          ← Menu
        </button>
        {sub === 'baca' && <QuranReader />}
        {sub === 'quran' && <Quran />}
        {sub === 'hafalan' && <Hafalan />}
        {sub === 'doa' && <DoaQurani />}
        {sub === 'muhasabah' && <Muhasabah />}
        {sub === 'kalender' && <Kalender />}
        {sub === 'asma' && <AsmaulHusna />}
        {sub === 'hadits' && <HaditsArbain />}
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
          {MENU.map((m) => (
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
