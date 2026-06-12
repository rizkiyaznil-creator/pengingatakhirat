import { useState } from 'react'
import { usePwaInstall } from '../lib/pwaInstall'

export default function InstallCard() {
  const { canPrompt, promptInstall, isIOS, isIOSSafari, isStandalone } = usePwaInstall()
  const [sheet, setSheet] = useState<null | 'ios' | 'android'>(null)
  const [msg, setMsg] = useState('')

  // Sudah dibuka dari ikon home screen → sudah terpasang
  if (isStandalone) {
    return (
      <div className="card flex items-center gap-3 px-5 py-4">
        <span className="text-2xl">✅</span>
        <div>
          <p className="font-semibold leading-tight">Aplikasi sudah terpasang</p>
          <p className="text-xs text-ocean-900/55">Kamu membuka Dawam dari layar utama.</p>
        </div>
      </div>
    )
  }

  async function doPrompt() {
    const r = await promptInstall()
    if (r === 'dismissed') setMsg('Pemasangan dibatalkan. Bisa dicoba lagi kapan saja.')
  }

  return (
    <>
      <div className="card px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ocean-700 text-2xl">
            📲
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold leading-tight">Pasang aplikasi</p>
            <p className="text-xs text-ocean-900/55">Akses lebih cepat & bisa dibuka offline.</p>
          </div>
        </div>

        {canPrompt ? (
          // Android / Chrome desktop → tombol pasang satu-ketuk
          <button onClick={doPrompt} className="btn-primary mt-4 w-full">
            Pasang sekarang
          </button>
        ) : isIOS ? (
          <>
            <button onClick={() => setSheet('ios')} className="btn-primary mt-4 w-full">
              Cara pasang di iPhone
            </button>
            {!isIOSSafari && (
              <p className="mt-2 text-center text-[11px] text-clay-600">
                Buka lewat <b>Safari</b> dulu agar bisa dipasang.
              </p>
            )}
          </>
        ) : (
          // Android tanpa event prompt / browser lain → panduan manual
          <button onClick={() => setSheet('android')} className="btn-primary mt-4 w-full">
            Cara pasang
          </button>
        )}

        {msg && <p className="mt-2 text-center text-xs text-ocean-900/55">{msg}</p>}
      </div>

      {sheet === 'ios' && <IosSheet onClose={() => setSheet(null)} />}
      {sheet === 'android' && <AndroidSheet onClose={() => setSheet(null)} />}
    </>
  )
}

function Sheet({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-t-3xl bg-sand-50 p-5 pb-8"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-sand-300" />
        <h2 className="mb-4 text-lg font-bold">{title}</h2>
        <div className="space-y-3">{children}</div>
        <button onClick={onClose} className="btn-primary mt-5 w-full">Mengerti</button>
      </div>
    </div>
  )
}

function Step({ n, icon, children }: { n: number; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-sand-100 px-4 py-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-sm font-bold text-white">
        {n}
      </span>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sand-50 text-ocean-700">
        {icon}
      </div>
      <p className="text-sm leading-snug">{children}</p>
    </div>
  )
}

function IosSheet({ onClose }: { onClose: () => void }) {
  return (
    <Sheet title="Pasang di iPhone (Safari)" onClose={onClose}>
      <Step n={1} icon={<ShareIcon />}>
        Tap tombol <b>Bagikan</b> (kotak dengan panah ke atas) di bilah Safari.
      </Step>
      <Step n={2} icon={<AddBoxIcon />}>
        Gulir, lalu pilih <b>“Add to Home Screen”</b> / <b>“Tambah ke Layar Utama”</b>.
      </Step>
      <Step n={3} icon={<span className="text-sm font-bold">✓</span>}>
        Tap <b>Add</b> / <b>Tambah</b>. Ikon Dawam muncul di layar utama.
      </Step>
    </Sheet>
  )
}

function AndroidSheet({ onClose }: { onClose: () => void }) {
  return (
    <Sheet title="Pasang di Android (Chrome)" onClose={onClose}>
      <Step n={1} icon={<DotsIcon />}>
        Tap menu <b>⋮</b> di pojok kanan atas Chrome.
      </Step>
      <Step n={2} icon={<AddBoxIcon />}>
        Pilih <b>“Pasang aplikasi”</b> atau <b>“Tambahkan ke layar utama”</b>.
      </Step>
      <Step n={3} icon={<span className="text-sm font-bold">✓</span>}>
        Konfirmasi <b>Pasang</b>. Ikon Dawam muncul di layar utama.
      </Step>
    </Sheet>
  )
}

// ---- ikon kecil ----
function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <path d="m8 7 4-4 4 4" />
      <path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" />
    </svg>
  )
}
function AddBoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  )
}
function DotsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
    </svg>
  )
}
