import { create } from 'zustand'

export type Tab = 'beranda' | 'sholat' | 'habit' | 'lainnya' | 'profil'

interface UiState {
  tab: Tab
  pendingSub: string | null // modul "Lainnya" yang ingin dibuka dari pintasan
  setTab: (t: Tab) => void
  goSub: (sub: string) => void
  consumeSub: () => string | null
}

export const useUi = create<UiState>((set, get) => ({
  tab: 'beranda',
  pendingSub: null,
  setTab: (t) => set({ tab: t }),
  goSub: (sub) => set({ tab: 'lainnya', pendingSub: sub }),
  consumeSub: () => {
    const s = get().pendingSub
    if (s) set({ pendingSub: null })
    return s
  },
}))
