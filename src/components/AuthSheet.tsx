import { useState } from 'react'
import { useAuth } from '../lib/useAuth'

export default function AuthSheet({ onClose }: { onClose: () => void }) {
  const { signInEmail, signUpEmail, signInGoogle } = useAuth()
  const [mode, setMode] = useState<'in' | 'up'>('in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [info, setInfo] = useState('')

  async function submit() {
    setErr('')
    setInfo('')
    if (!email.trim() || password.length < 6) {
      setErr('Isi email dan password (min. 6 karakter).')
      return
    }
    setBusy(true)
    const fn = mode === 'in' ? signInEmail : signUpEmail
    const error = await fn(email.trim(), password)
    setBusy(false)
    if (error) {
      setErr(error)
    } else if (mode === 'up') {
      setInfo('Akun dibuat! Cek email untuk konfirmasi bila diminta, lalu masuk.')
    } else {
      onClose()
    }
  }

  async function google() {
    setErr('')
    setBusy(true)
    const error = await signInGoogle()
    setBusy(false)
    if (error) setErr(error)
    // jika sukses, browser akan redirect ke Google
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-t-3xl bg-sand-50 p-5 pb-8"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-sand-300" />
        <h2 className="text-lg font-bold">
          {mode === 'in' ? 'Masuk ke akunmu' : 'Buat akun baru'}
        </h2>
        <p className="mb-4 mt-0.5 text-sm text-ocean-900/60">
          Simpan & sinkronkan amalmu di semua perangkat.
        </p>

        <button
          onClick={google}
          disabled={busy}
          className="mb-3 flex w-full items-center justify-center gap-2.5 rounded-2xl border border-sand-300 bg-white px-4 py-3.5 font-semibold text-ocean-900 transition active:scale-[0.98] disabled:opacity-60"
        >
          <GoogleIcon /> Lanjut dengan Google
        </button>

        <div className="my-3 flex items-center gap-3 text-xs text-ocean-900/40">
          <span className="h-px flex-1 bg-sand-200" /> atau email <span className="h-px flex-1 bg-sand-200" />
        </div>

        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@contoh.com"
          className="mb-3 w-full rounded-2xl border border-sand-200 bg-white px-4 py-3 outline-none focus:border-ocean-400"
        />
        <input
          type="password"
          autoComplete={mode === 'in' ? 'current-password' : 'new-password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min. 6 karakter)"
          className="mb-2 w-full rounded-2xl border border-sand-200 bg-white px-4 py-3 outline-none focus:border-ocean-400"
        />

        {err && <p className="mb-2 text-xs text-cheer">{err}</p>}
        {info && <p className="mb-2 text-xs text-ocean-600">{info}</p>}

        <button onClick={submit} disabled={busy} className="btn-primary mt-1 w-full disabled:opacity-60">
          {busy ? 'Memproses…' : mode === 'in' ? 'Masuk' : 'Daftar'}
        </button>

        <button
          onClick={() => {
            setMode(mode === 'in' ? 'up' : 'in')
            setErr('')
            setInfo('')
          }}
          className="mt-3 w-full text-center text-sm text-ocean-600"
        >
          {mode === 'in' ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}
        </button>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8a12 12 0 1 1 0-24c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 1 0 24 44c11 0 20-9 20-20 0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C40.9 35.7 44 30.4 44 24c0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  )
}
