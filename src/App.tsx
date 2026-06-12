import { useState } from 'react'
import { useStore } from './store/useStore'
import { useAuth } from './lib/useAuth'
import { isCloudEnabled } from './lib/supabase'
import BottomNav, { type Tab } from './components/BottomNav'
import Onboarding from './pages/Onboarding'
import AuthScreen from './pages/AuthScreen'
import Dashboard from './pages/Dashboard'
import Sholat from './pages/Sholat'
import Habits from './pages/Habits'
import More from './pages/More'
import Profile from './pages/Profile'

export default function App() {
  const onboarded = useStore((s) => s.profile.onboarded)
  const ready = useAuth((s) => s.ready)
  const user = useAuth((s) => s.user)
  const [tab, setTab] = useState<Tab>('beranda')

  // Wajib login (saat cloud aktif): tampilkan layar login dulu bila belum masuk.
  if (isCloudEnabled) {
    if (!ready) return <Splash />
    if (!user) return <AuthScreen />
  }

  if (!onboarded) return <Onboarding />

  return (
    <div className="min-h-screen bg-sand-100">
      <main className="safe-top mx-auto max-w-md px-4 pt-3 safe-bottom">
        {tab === 'beranda' && <Dashboard onGo={setTab} />}
        {tab === 'sholat' && <Sholat />}
        {tab === 'habit' && <Habits />}
        {tab === 'lainnya' && <More />}
        {tab === 'profil' && <Profile />}
      </main>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  )
}

function Splash() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-100">
      <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-ocean-700 text-3xl">
        💧
      </div>
    </div>
  )
}
