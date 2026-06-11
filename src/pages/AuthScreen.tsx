import AuthForm from '../components/AuthForm'

// Layar login wajib — tampil sebelum masuk aplikasi bila belum login.
export default function AuthScreen() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-16">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ocean-700 text-3xl">
          💧
        </div>
        <h1 className="text-2xl font-bold">Dawam</h1>
        <p className="font-arabic mt-2 text-xl text-ocean-700" dir="rtl">
          إنّما الأعمال بالنيّات
        </p>
        <p className="mt-1 text-sm italic text-ocean-900/60">
          “Sesungguhnya amal itu tergantung niatnya” — HR. Bukhari
        </p>
        <p className="mt-4 text-sm text-ocean-900/60">
          Masuk untuk mulai mencatat amal & menyimpannya di semua perangkat.
        </p>
      </div>

      <AuthForm />

      <p className="mt-auto pt-8 text-center text-[11px] text-ocean-900/40">
        Datamu privat & dilindungi. Tersimpan aman di akunmu.
      </p>
    </div>
  )
}
