import { useStore } from '../store/useStore'

// Pop-up wajib pilih jenis kelamin untuk pengguna lama yang belum mengisinya.
// Memblokir (tak bisa ditutup) sampai dipilih. Bisa diubah lagi di Profil.
export default function GenderGate() {
  const setProfile = useStore((s) => s.setProfile)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ocean-900/50 px-6 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-sand-50 p-6 text-center shadow-card">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean-700 text-3xl">
          👋
        </div>
        <h2 className="text-lg font-bold">Lengkapi profilmu</h2>
        <p className="mt-1 text-sm text-ocean-900/60">
          Pilih jenis kelamin untuk menyesuaikan fitur ibadah. Bisa diubah lagi di Profil.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {([['male', 'Laki-laki', '👨'], ['female', 'Perempuan', '👩']] as const).map(([g, label, icon]) => (
            <button
              key={g}
              onClick={() => setProfile({ gender: g })}
              className="flex flex-col items-center gap-1 rounded-2xl bg-sand-50 py-4 text-sm font-semibold text-ocean-900/70 ring-1 ring-sand-200 transition active:scale-[0.97] hover:bg-ocean-50"
            >
              <span className="text-2xl">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
