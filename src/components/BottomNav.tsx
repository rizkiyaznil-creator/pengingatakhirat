import { HomeIcon, MosqueIcon, CheckCircleIcon, UserIcon, GridIcon } from './icons'

export type Tab = 'beranda' | 'sholat' | 'habit' | 'lainnya' | 'profil'

const TABS: { id: Tab; label: string; Icon: typeof HomeIcon }[] = [
  { id: 'beranda', label: 'Beranda', Icon: HomeIcon },
  { id: 'sholat', label: 'Sholat', Icon: MosqueIcon },
  { id: 'habit', label: 'Habit', Icon: CheckCircleIcon },
  { id: 'lainnya', label: 'Lainnya', Icon: GridIcon },
  { id: 'profil', label: 'Profil', Icon: UserIcon },
]

export default function BottomNav({
  active,
  onChange,
}: {
  active: Tab
  onChange: (t: Tab) => void
}) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-sand-200 bg-sand-50/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 py-1.5">
        {TABS.map(({ id, label, Icon }) => {
          const on = active === id
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 transition ${
                on ? 'text-ocean-600' : 'text-ocean-900/40'
              }`}
              aria-label={label}
            >
              <Icon size={24} strokeWidth={on ? 2.3 : 1.9} />
              <span className={`text-[11px] ${on ? 'font-semibold' : 'font-medium'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
