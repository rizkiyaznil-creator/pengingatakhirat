import { useStore } from './store/useStore'
import { useAuth } from './lib/useAuth'
import { useTheme, useDisplayScale } from './lib/useTheme'
import { useUi } from './lib/useUi'
import { useAdzanForeground } from './lib/useAdzanForeground'
import { isCloudEnabled } from './lib/supabase'
import BottomNav from './components/BottomNav'
import AdzanBanner from './components/AdzanBanner'
import Onboarding from './pages/Onboarding'
import AuthScreen from './pages/AuthScreen'
import Dashboard from './pages/Dashboard'
import Sholat from './pages/Sholat'
import Habits from './pages/Habits'
import More from './pages/More'
import Profile from './pages/Profile'

export default function App() {
  useTheme()
  useDisplayScale()
  const onboarded = useStore((s) => s.profile.onboarded)
  const ready = useAuth((s) => s.ready)
  const user = useAuth((s) => s.user)
  const tab = useUi((s) => s.tab)
  const setTab = useUi((s) => s.setTab)
  const { alert, dismiss } = useAdzanForeground()

  // Wajib login (saat cloud aktif): tampilkan layar login dulu bila belum masuk.
  if (isCloudEnabled) {
    if (!ready) return <Splash />
    if (!user) return <AuthScreen />
  }

  if (!onboarded) return <Onboarding />

  return (
    <div className="min-h-screen bg-sand-100">
      <AdzanBanner alert={alert} onDismiss={dismiss} />
      <main className="safe-top mx-auto max-w-md px-4 pt-3 safe-bottom">
        {tab === 'beranda' && <Dashboard />}
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
