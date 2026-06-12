import { useEffect, useRef, useState } from 'react'
import { useStore, type Habit, isHabitDone } from '../store/useStore'
import { habitStreak } from '../lib/stats'
import { FlameIcon } from './icons'

export default function HabitRow({ habit, date }: { habit: Habit; date: string }) {
  const value = useStore((s) => s.habitLogs[date]?.[habit.id] ?? 0)
  const habitLogs = useStore((s) => s.habitLogs)
  const toggle = useStore((s) => s.toggleCheckbox)
  const inc = useStore((s) => s.incHabit)

  const done = isHabitDone(habit, value)
  const streak = habitStreak(habit, habitLogs)

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 transition ${
        done ? 'opacity-60' : ''
      }`}
    >
      <span className="text-2xl">{habit.icon}</span>
      <div className="min-w-0 flex-1">
        <p className={`font-semibold leading-tight ${done ? 'line-through' : ''}`}>
          {habit.name}
        </p>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-ocean-900/55">
          {habit.type !== 'checkbox' && (
            <span>
              {Math.min(value, habit.target * 3) || value}/{habit.target} {habit.unit}
            </span>
          )}
          {streak > 0 && (
            <span className="inline-flex items-center gap-0.5 text-clay-600">
              <FlameIcon size={13} /> {streak} hari
            </span>
          )}
        </div>
      </div>

      {habit.type === 'checkbox' && (
        <CheckBox done={done} onClick={() => toggle(date, habit.id)} />
      )}
      {habit.type === 'counter' && (
        <Counter
          value={value}
          onMinus={() => inc(date, habit.id, -1)}
          onPlus={() => inc(date, habit.id, 1)}
        />
      )}
      {habit.type === 'timer' && (
        <TimerControl habitId={habit.id} date={date} value={value} target={habit.target} />
      )}
    </div>
  )
}

function CheckBox({ done, onClick }: { done: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition active:scale-90 ${
        done
          ? 'border-ocean-700 bg-ocean-700 text-white'
          : 'border-sand-300 text-transparent'
      }`}
      aria-label="Tandai selesai"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 12 5 5 9-10" />
      </svg>
    </button>
  )
}

function Counter({
  value,
  onMinus,
  onPlus,
}: {
  value: number
  onMinus: () => void
  onPlus: () => void
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={onMinus}
        disabled={value <= 0}
        className="h-8 w-8 rounded-full bg-sand-200 text-lg font-bold text-ocean-900/60 transition active:scale-90 disabled:opacity-40"
      >
        −
      </button>
      <button
        onClick={onPlus}
        className="h-9 w-9 rounded-full bg-ocean-700 text-lg font-bold text-white transition active:scale-90"
      >
        +
      </button>
    </div>
  )
}

function TimerControl({
  habitId,
  date,
  value,
  target,
}: {
  habitId: string
  date: string
  value: number
  target: number
}) {
  const setValue = useStore((s) => s.setHabitValue)
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0) // detik berjalan sesi ini
  const startRef = useRef<number>(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  function toggle() {
    if (running) {
      // pause → commit menit ke store
      const mins = elapsed / 60
      setValue(date, habitId, Math.round((value + mins) * 10) / 10)
      setElapsed(0)
      setRunning(false)
    } else {
      startRef.current = Date.now()
      setRunning(true)
    }
  }

  const liveMin = value + elapsed / 60
  const reached = liveMin >= target

  return (
    <button
      onClick={toggle}
      className={`min-w-[78px] rounded-xl px-3 py-2 text-sm font-semibold transition active:scale-95 ${
        running
          ? 'bg-cheer/10 text-cheer'
          : reached
            ? 'bg-ocean-100 text-ocean-600'
            : 'bg-ocean-700 text-white'
      }`}
    >
      {running ? `⏸ ${fmt(elapsed)}` : reached ? '✓ Selesai' : '▶ Mulai'}
    </button>
  )
}

function fmt(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
