import { useEffect, useRef, useState } from 'react'
import { usePwaInstall } from '../lib/pwaInstall'

// Popup pengingat pasang aplikasi — muncul saat app dibuka di browser (belum terpasang)
// setelah user login. Tampil sekilas lalu hilang otomatis (2 detik), bisa ditutup manual.
export default function InstallReminder() {
  const { canPrompt, promptInstall, isIOS, isIOSSafari, isStandalone } = usePwaInstall()
  const [show, setShow] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Hilang otomatis setelah 2 detik.
  useEffect(() => {
    timer.current = setTimeout(() => setShow(false), 2000)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  // Jangan tampilkan bila sudah dibuka dari aplikasi terpasang (mode standalone).
  if (isStandalone || !show) return null

  // Hentikan hitung mundur saat user menyentuh kartu, agar sempat menekan tombol.
  const holdTimer = () => {
    if (timer.current) clearTimeout(timer.current)
  }

  async function doPrompt() {
    holdTimer()
    await promptInstall()
    setShow(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ocean-900/40 px-8 backdrop-blur-sm"
      onClick={() => setShow(false)}
    >
      <div
        className="relative w-full max-w-xs rounded-3xl bg-white px-6 py-7 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={holdTimer}
      >
        <button
          onClick={() => setShow(false)}
          aria-label="Tutup"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-sand-100 text-ocean-900/50 transition active:bg-sand-200"
        >
          ✕
        </button>
        <div className="text-4xl">📲</div>
        <p className="mt-3 text-base font-bold leading-snug text-ocean-900">Pasang aplikasi</p>
        <p className="mt-1 text-xs leading-relaxed text-ocean-900/60">
          Pasang Dawam untuk akses lebih cepat & bisa dibuka offline.
        </p>

        {canPrompt ? (
          <button onClick={doPrompt} className="btn-primary mt-4 w-full">
            Pasang sekarang
          </button>
        ) : isIOS ? (
          <p className="mt-3 rounded-xl bg-sand-100 px-3 py-2 text-[11px] leading-relaxed text-ocean-900/65">
            {isIOSSafari ? (
              <>Tap <b>Bagikan</b> di Safari › <b>Tambah ke Layar Utama</b>.</>
            ) : (
              <>Buka lewat <b>Safari</b>, lalu <b>Bagikan › Tambah ke Layar Utama</b>.</>
            )}
          </p>
        ) : (
          <p className="mt-3 rounded-xl bg-sand-100 px-3 py-2 text-[11px] leading-relaxed text-ocean-900/65">
            Buka menu browser <b>⋮</b> › <b>Pasang aplikasi</b>. Detail di tab <b>Profil</b>.
          </p>
        )}
      </div>
    </div>
  )
}
