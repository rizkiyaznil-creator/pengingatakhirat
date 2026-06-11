import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PrayerName } from '../lib/prayer'
import type { MethodKey, MadhabKey } from '../lib/prayer'
import { dateKey } from '../lib/date'

// ---- Tipe data ----

export type PrayerStatus = 'pending' | 'ontime' | 'late' | 'qadha'

export type HabitType = 'checkbox' | 'counter' | 'timer'

export interface Habit {
  id: string
  name: string
  type: HabitType
  target: number // checkbox: 1, counter: jumlah, timer: menit
  unit: string // 'x', 'menit', 'hal', dst
  icon: string // emoji
  order: number
  archived?: boolean
}

export interface Profile {
  name: string
  city: string
  lat: number
  lng: number
  method: MethodKey
  madhab: MadhabKey
  onboarded: boolean
}

// habitLogs[dateKey][habitId] = nilai tercapai (checkbox 0/1, counter, menit)
export type PrayerLogs = Record<string, Partial<Record<PrayerName, PrayerStatus>>>
export type HabitLogs = Record<string, Record<string, number>>

// Potongan data yang disinkronkan ke cloud (satu dokumen JSON per akun)
export interface SyncSnapshot {
  profile: Profile
  prayerLogs: PrayerLogs
  habits: Habit[]
  habitLogs: HabitLogs
  tasbih: { count: number; target: number; sets: number }
}

interface State {
  profile: Profile
  prayerLogs: PrayerLogs
  habits: Habit[]
  habitLogs: HabitLogs
  tasbih: { count: number; target: number; sets: number }

  // actions — profil
  setProfile: (p: Partial<Profile>) => void

  // actions — sholat
  setPrayer: (date: string, prayer: PrayerName, status: PrayerStatus) => void
  cyclePrayer: (date: string, prayer: PrayerName) => void

  // actions — habit
  addHabit: (h: Omit<Habit, 'id' | 'order'>) => void
  updateHabit: (id: string, patch: Partial<Habit>) => void
  removeHabit: (id: string) => void
  setHabitValue: (date: string, habitId: string, value: number) => void
  toggleCheckbox: (date: string, habitId: string) => void
  incHabit: (date: string, habitId: string, by: number) => void

  // actions — tasbih
  tapTasbih: () => void
  resetTasbih: () => void
  setTasbihTarget: (n: number) => void

  // sinkronisasi — ganti seluruh data (mis. hasil merge dari cloud)
  replaceData: (d: SyncSnapshot) => void
}

const DEFAULT_HABITS: Habit[] = [
  { id: 'h-tahajud', name: 'Tahajud', type: 'checkbox', target: 1, unit: '', icon: '🌙', order: 0 },
  { id: 'h-dhuha', name: 'Sholat Dhuha', type: 'checkbox', target: 1, unit: '', icon: '☀️', order: 1 },
  { id: 'h-dzikir', name: 'Dzikir pagi', type: 'counter', target: 100, unit: 'x', icon: '📿', order: 2 },
  { id: 'h-tilawah', name: 'Tilawah Qur’an', type: 'counter', target: 5, unit: 'hal', icon: '📖', order: 3 },
  { id: 'h-baca', name: 'Baca buku', type: 'timer', target: 30, unit: 'menit', icon: '📚', order: 4 },
]

const DEFAULT_PROFILE: Profile = {
  name: '',
  city: 'Jakarta',
  lat: -6.2088,
  lng: 106.8456,
  method: 'Kemenag',
  madhab: 'syafii',
  onboarded: false,
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      profile: DEFAULT_PROFILE,
      prayerLogs: {},
      habits: DEFAULT_HABITS,
      habitLogs: {},
      tasbih: { count: 0, target: 33, sets: 0 },

      setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),

      setPrayer: (date, prayer, status) =>
        set((s) => ({
          prayerLogs: {
            ...s.prayerLogs,
            [date]: { ...s.prayerLogs[date], [prayer]: status },
          },
        })),

      cyclePrayer: (date, prayer) =>
        set((s) => {
          const order: PrayerStatus[] = ['pending', 'ontime', 'late', 'qadha']
          const cur = s.prayerLogs[date]?.[prayer] ?? 'pending'
          const next = order[(order.indexOf(cur) + 1) % order.length]
          return {
            prayerLogs: {
              ...s.prayerLogs,
              [date]: { ...s.prayerLogs[date], [prayer]: next },
            },
          }
        }),

      addHabit: (h) =>
        set((s) => ({
          habits: [
            ...s.habits,
            { ...h, id: `h-${Date.now().toString(36)}`, order: s.habits.length },
          ],
        })),

      updateHabit: (id, patch) =>
        set((s) => ({
          habits: s.habits.map((h) => (h.id === id ? { ...h, ...patch } : h)),
        })),

      removeHabit: (id) =>
        set((s) => ({ habits: s.habits.filter((h) => h.id !== id) })),

      setHabitValue: (date, habitId, value) =>
        set((s) => ({
          habitLogs: {
            ...s.habitLogs,
            [date]: { ...s.habitLogs[date], [habitId]: Math.max(0, value) },
          },
        })),

      toggleCheckbox: (date, habitId) =>
        set((s) => {
          const cur = s.habitLogs[date]?.[habitId] ?? 0
          return {
            habitLogs: {
              ...s.habitLogs,
              [date]: { ...s.habitLogs[date], [habitId]: cur ? 0 : 1 },
            },
          }
        }),

      incHabit: (date, habitId, by) =>
        set((s) => {
          const cur = s.habitLogs[date]?.[habitId] ?? 0
          return {
            habitLogs: {
              ...s.habitLogs,
              [date]: { ...s.habitLogs[date], [habitId]: Math.max(0, cur + by) },
            },
          }
        }),

      tapTasbih: () =>
        set((s) => {
          const count = s.tasbih.count + 1
          if (count >= s.tasbih.target) {
            return { tasbih: { ...s.tasbih, count: 0, sets: s.tasbih.sets + 1 } }
          }
          return { tasbih: { ...s.tasbih, count } }
        }),

      resetTasbih: () => set((s) => ({ tasbih: { ...s.tasbih, count: 0, sets: 0 } })),

      setTasbihTarget: (n) =>
        set((s) => ({ tasbih: { ...s.tasbih, target: n, count: 0 } })),

      replaceData: (d) =>
        set(() => ({
          profile: d.profile,
          prayerLogs: d.prayerLogs,
          habits: d.habits,
          habitLogs: d.habitLogs,
          tasbih: d.tasbih,
        })),
    }),
    {
      name: 'niyatin-store-v1',
      version: 1,
    },
  ),
)

// Ambil potongan data yang disinkronkan dari state penuh.
export function snapshotOf(s: SyncSnapshot): SyncSnapshot {
  return {
    profile: s.profile,
    prayerLogs: s.prayerLogs,
    habits: s.habits,
    habitLogs: s.habitLogs,
    tasbih: s.tasbih,
  }
}

// Helper: status habit hari ini selesai atau belum
export function isHabitDone(habit: Habit, value: number): boolean {
  if (habit.type === 'checkbox') return value >= 1
  return value >= habit.target
}

export const todayKey = () => dateKey()
