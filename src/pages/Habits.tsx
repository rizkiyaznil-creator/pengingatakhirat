import { useState } from 'react'
import { useStore, type HabitType, isHabitDone } from '../store/useStore'
import { dateKey, tanggalPanjang } from '../lib/date'
import { useNow } from '../lib/useNow'
import HabitRow from '../components/HabitRow'
import Tasbih from '../components/Tasbih'
import { PlusIcon, TrashIcon } from '../components/icons'

export default function Habits() {
  const now = useNow(60_000)
  const today = dateKey(now)
  const habits = useStore((s) => s.habits.filter((h) => !h.archived))
  const habitLogs = useStore((s) => s.habitLogs)
  const [adding, setAdding] = useState(false)
  const [manage, setManage] = useState(false)

  const doneCount = habits.filter((h) =>
    isHabitDone(h, habitLogs[today]?.[h.id] ?? 0),
  ).length

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between pt-2">
        <div>
          <h1 className="text-xl font-bold">Habit Hari Ini</h1>
          <p className="text-sm text-pondok-900/60">{tanggalPanjang(now)}</p>
        </div>
        <span className="rounded-full bg-pondok-100 px-3 py-1 text-sm font-semibold text-pondok-700">
          {doneCount}/{habits.length} ✓
        </span>
      </header>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-cream-200 px-4 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-pondok-900/45">
            Rutinitas
          </p>
          <button
            onClick={() => setManage((v) => !v)}
            className="text-xs font-semibold text-pondok-600"
          >
            {manage ? 'Selesai' : 'Kelola'}
          </button>
        </div>
        <div className="divide-y divide-cream-200">
          {habits.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-pondok-900/50">
              Belum ada habit. Tambah satu untuk mulai 🌱
            </p>
          )}
          {habits.map((h) =>
            manage ? <ManageRow key={h.id} id={h.id} name={h.name} icon={h.icon} /> : (
              <HabitRow key={h.id} habit={h} date={today} />
            ),
          )}
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center justify-center gap-1.5 border-t border-cream-200 py-3 text-sm font-semibold text-pondok-600 transition active:bg-cream-100"
        >
          <PlusIcon size={18} /> Tambah habit
        </button>
      </div>

      <Tasbih />

      {adding && <AddHabitSheet onClose={() => setAdding(false)} />}
    </div>
  )
}

function ManageRow({ id, name, icon }: { id: string; name: string; icon: string }) {
  const remove = useStore((s) => s.removeHabit)
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="text-2xl">{icon}</span>
      <p className="flex-1 font-medium">{name}</p>
      <button
        onClick={() => remove(id)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-cheer/10 text-cheer transition active:scale-90"
        aria-label="Hapus habit"
      >
        <TrashIcon size={18} />
      </button>
    </div>
  )
}

const EMOJIS = ['🌙', '☀️', '📿', '📖', '📚', '🤲', '💧', '🏃', '🍴', '💝', '🕌', '✨']

function AddHabitSheet({ onClose }: { onClose: () => void }) {
  const addHabit = useStore((s) => s.addHabit)
  const [name, setName] = useState('')
  const [type, setType] = useState<HabitType>('checkbox')
  const [target, setTarget] = useState(1)
  const [unit, setUnit] = useState('')
  const [icon, setIcon] = useState('✨')

  function save() {
    if (!name.trim()) return
    addHabit({
      name: name.trim(),
      type,
      target: type === 'checkbox' ? 1 : Math.max(1, target),
      unit: type === 'checkbox' ? '' : unit || (type === 'timer' ? 'menit' : 'x'),
      icon,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-t-3xl bg-cream-50 p-5 pb-8"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-cream-300" />
        <h2 className="mb-4 text-lg font-bold">Tambah Habit</h2>

        <label className="mb-1.5 block text-sm font-semibold">Nama</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="mis. Sholat Dhuha"
          className="mb-4 w-full rounded-2xl border border-cream-200 bg-white px-4 py-3 outline-none focus:border-pondok-400"
        />

        <label className="mb-1.5 block text-sm font-semibold">Ikon</label>
        <div className="mb-4 flex flex-wrap gap-2">
          {EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => setIcon(e)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl transition ${
                icon === e ? 'bg-pondok-100 ring-2 ring-pondok-500' : 'bg-white'
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        <label className="mb-1.5 block text-sm font-semibold">Tipe</label>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {(['checkbox', 'counter', 'timer'] as HabitType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                type === t ? 'bg-pondok-700 text-cream-50' : 'bg-white text-pondok-900/60'
              }`}
            >
              {t === 'checkbox' ? 'Ceklis' : t === 'counter' ? 'Hitung' : 'Timer'}
            </button>
          ))}
        </div>

        {type !== 'checkbox' && (
          <div className="mb-4 flex gap-3">
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-semibold">Target</label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full rounded-2xl border border-cream-200 bg-white px-4 py-3 outline-none focus:border-pondok-400"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-semibold">Satuan</label>
              <input
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder={type === 'timer' ? 'menit' : 'x / hal'}
                className="w-full rounded-2xl border border-cream-200 bg-white px-4 py-3 outline-none focus:border-pondok-400"
              />
            </div>
          </div>
        )}

        <button onClick={save} className="btn-primary w-full">
          Simpan habit
        </button>
      </div>
    </div>
  )
}
