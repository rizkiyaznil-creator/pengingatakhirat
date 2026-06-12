import { useState } from 'react'
import { useStore } from '../store/useStore'

const PRESETS = [33, 99, 100]

export default function Tasbih() {
  const tasbih = useStore((s) => s.tasbih)
  const tap = useStore((s) => s.tapTasbih)
  const reset = useStore((s) => s.resetTasbih)
  const setTarget = useStore((s) => s.setTasbihTarget)
  const [pop, setPop] = useState(false)

  function onTap() {
    tap()
    setPop(true)
    if (navigator.vibrate) navigator.vibrate(12)
    setTimeout(() => setPop(false), 180)
  }

  const pct = Math.min(100, (tasbih.count / tasbih.target) * 100)

  return (
    <div className="card px-5 py-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-ocean-900/45">Tasbih Digital</p>
          <p className="text-sm text-ocean-900/60">
            {tasbih.sets} set selesai{tasbih.sets > 0 ? ' ✓' : ''}
          </p>
        </div>
        <div className="flex gap-1.5">
          {PRESETS.map((n) => (
            <button
              key={n}
              onClick={() => setTarget(n)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                tasbih.target === n
                  ? 'bg-ocean-700 text-white'
                  : 'bg-sand-200 text-ocean-900/60'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onTap}
        className="relative mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-ocean-50 transition active:scale-[0.97]"
        aria-label="Hitung tasbih"
      >
        {/* Ring progress */}
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#cfe9ea" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#0e5b61"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * 283} 283`}
            className="transition-all duration-200"
          />
        </svg>
        <div className={`text-center ${pop ? 'animate-pop' : ''}`}>
          <p className="text-5xl font-bold text-ocean-600">{tasbih.count}</p>
          <p className="text-sm text-ocean-900/50">/ {tasbih.target}</p>
        </div>
      </button>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-xl bg-sand-200 px-4 py-2 text-sm font-medium text-ocean-900/60 transition active:scale-95"
        >
          Reset
        </button>
        <span className="text-xs text-ocean-900/40">Ketuk lingkaran untuk berdzikir</span>
      </div>
    </div>
  )
}
