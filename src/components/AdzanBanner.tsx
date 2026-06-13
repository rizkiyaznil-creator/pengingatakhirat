import type { AdzanAlert } from '../lib/useAdzanForeground'

export default function AdzanBanner({ alert, onDismiss }: { alert: AdzanAlert | null; onDismiss: () => void }) {
  if (!alert) return null
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 px-3"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.5rem)' }}
    >
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-ocean-700 px-4 py-3 text-white shadow-card">
        <span className="text-2xl">🕌</span>
        <div className="min-w-0 flex-1">
          <p className="font-bold leading-tight">Waktu {alert.label} · {alert.timeStr}</p>
          <p className="text-xs text-white/80">Hayya ‘alash-shalah — saatnya menunaikan sholat.</p>
        </div>
        <button
          onClick={onDismiss}
          className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold"
        >
          Tutup
        </button>
      </div>
    </div>
  )
}
