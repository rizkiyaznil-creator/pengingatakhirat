import { useState } from 'react'
import { useStore } from './store/useStore'
import BottomNav, { type Tab } from './components/BottomNav'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Sholat from './pages/Sholat'
import Habits from './pages/Habits'
import Profile from './pages/Profile'

export default function App() {
  const onboarded = useStore((s) => s.profile.onboarded)
  const [tab, setTab] = useState<Tab>('beranda')

  if (!onboarded) return <Onboarding />

  return (
    <div className="min-h-screen bg-sand-100">
      <main className="safe-top mx-auto max-w-md px-4 pt-3 safe-bottom">
        {tab === 'beranda' && <Dashboard onGo={setTab} />}
        {tab === 'sholat' && <Sholat />}
        {tab === 'habit' && <Habits />}
        {tab === 'profil' && <Profile />}
      </main>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  )
}
