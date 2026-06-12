import { navBack } from '../lib/navStack'

// Bar "kembali" yang menempel di atas layar saat menggulir (selalu satu ketuk).
export default function StickyBack({ label, right }: { label: string; right?: React.ReactNode }) {
  return (
    <div
      className="sticky z-30 -mx-4 -mt-3 mb-1 flex items-center justify-between gap-2 border-b border-sand-200 bg-sand-100/85 px-4 py-2.5 backdrop-blur"
      style={{ top: 'env(safe-area-inset-top)' }}
    >
      <button
        onClick={navBack}
        className="flex items-center gap-1.5 text-sm font-semibold text-ocean-600"
      >
        <span className="text-base leading-none">←</span> {label}
      </button>
      {right}
    </div>
  )
}
