import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PrayerName } from '../lib/prayer'
import type { MethodKey, MadhabKey } from '../lib/prayer'
import { dateKey } from '../lib/date'
import { applyGrade, type HafalanGrade } from '../lib/hafalan'

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

// Progres khatam Qur'an (mushaf 604 halaman)
export interface QuranState {
  target: number // total halaman khatam (default 604)
  read: number // halaman terbaca pada khatam berjalan
  targetMonths: number // target selesai: 1/3/6/12 bulan
  startedAt: string // dateKey mulai khatam berjalan
  khatamCount: number // berapa kali khatam selesai
  lifetime: number // total halaman terbaca seumur pakai
}

// Tipe Tasbih dipakai di beberapa tempat
type Tasbih = { count: number; target: number; sets: number }

// Satu item hafalan (rentang ayat dalam sebuah surah) dengan box Leitner.
export interface HafalanItem {
  id: string
  surah: number
  nama: string
  fromAyah: number
  toAyah: number
  box: number // 1..5
  nextDue: string // dateKey jatuh tempo murojaah
  addedAt: string
  lastReviewed?: string
}

// Refleksi malam (muhasabah) per tanggal
export interface MuhasabahEntry {
  rating: number // 1..5 (mood)
  syukur: string
  perbaikan: string
  niat: string
  updatedAt: string
}

// Status pembaca Al-Qur'an
export interface QuranReaderState {
  lastRead?: { surah: number; ayah: number }
  bookmarks: { surah: number; ayah: number }[]
}

export type ThemeMode = 'system' | 'light' | 'dark'

// Pengaturan notifikasi adzan
export interface NotifSettings {
  enabled: boolean
  prayers: PrayerName[] // sholat yang diingatkan
  minutesBefore: number // 0 = tepat waktu adzan
  sound: boolean // putar audio adzan saat app terbuka
  adzanUrl: string // URL audio adzan kustom (opsional)
}

// Potongan data yang disinkronkan ke cloud (satu dokumen JSON per akun)
export interface SyncSnapshot {
  profile: Profile
  prayerLogs: PrayerLogs
  habits: Habit[]
  habitLogs: HabitLogs
  tasbih: Tasbih
  quran: QuranState
  quranDaily: Record<string, number> // halaman dibaca per hari (untuk streak)
  hafalan: HafalanItem[]
  setoranDaily: Record<string, number> // jumlah setoran murojaah per hari
  muhasabah: Record<string, MuhasabahEntry> // refleksi malam per tanggal
  reader: QuranReaderState
  rawatibLogs: Record<string, Record<string, boolean>> // dateKey → slotKey → done
  doaFav: string[] // id doa Qur'ani yang difavoritkan
  dashboardShortcuts: string[] // id pintasan di "Akses cepat" Beranda
  notif: NotifSettings
}

interface State {
  profile: Profile
  prayerLogs: PrayerLogs
  habits: Habit[]
  habitLogs: HabitLogs
  tasbih: Tasbih
  quran: QuranState
  quranDaily: Record<string, number>
  hafalan: HafalanItem[]
  setoranDaily: Record<string, number>
  muhasabah: Record<string, MuhasabahEntry>
  reader: QuranReaderState
  rawatibLogs: Record<string, Record<string, boolean>>
  doaFav: string[]
  dashboardShortcuts: string[]
  notif: NotifSettings
  theme: ThemeMode // preferensi tampilan (lokal perangkat, tidak disinkron)
  uiScale: number // skala teks & UI keseluruhan (lokal perangkat)
  arabicScale: number // skala tambahan khusus teks Arab (lokal perangkat)

  // actions — profil
  setProfile: (p: Partial<Profile>) => void
  setTheme: (t: ThemeMode) => void
  setUiScale: (n: number) => void
  setArabicScale: (n: number) => void

  // actions — sholat
  setPrayer: (date: string, prayer: PrayerName, status: PrayerStatus) => void
  cyclePrayer: (date: string, prayer: PrayerName) => void
  toggleRawatib: (date: string, key: string) => void

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

  // actions — quran
  addQuranPages: (n: number) => void
  setQuranTargetMonths: (m: number) => void
  resetKhatam: () => void

  // actions — hafalan
  addHafalan: (surah: number, nama: string, fromAyah: number, toAyah: number) => void
  gradeHafalan: (id: string, grade: HafalanGrade) => void
  removeHafalan: (id: string) => void

  // actions — muhasabah
  setMuhasabah: (date: string, patch: Partial<MuhasabahEntry>) => void

  // actions — quran reader
  setLastRead: (surah: number, ayah: number) => void
  toggleBookmark: (surah: number, ayah: number) => void

  // actions — doa
  toggleDoaFav: (id: string) => void

  // actions — beranda
  setDashboardShortcuts: (ids: string[]) => void

  // actions — notifikasi
  setNotif: (patch: Partial<NotifSettings>) => void

  // sinkronisasi — ganti seluruh data (mis. hasil merge dari cloud)
  replaceData: (d: SyncSnapshot) => void
  // reset ke kondisi awal bersih (akun baru / hapus data)
  resetData: () => void
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

const DEFAULT_NOTIF: NotifSettings = {
  enabled: false,
  prayers: ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'],
  minutesBefore: 0,
  sound: true,
  adzanUrl: '',
}

const QURAN_PAGES = 604

function defaultQuran(): QuranState {
  return {
    target: QURAN_PAGES,
    read: 0,
    targetMonths: 3,
    startedAt: dateKey(),
    khatamCount: 0,
    lifetime: 0,
  }
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      profile: DEFAULT_PROFILE,
      prayerLogs: {},
      habits: DEFAULT_HABITS,
      habitLogs: {},
      tasbih: { count: 0, target: 33, sets: 0 },
      quran: defaultQuran(),
      quranDaily: {},
      hafalan: [],
      setoranDaily: {},
      muhasabah: {},
      reader: { bookmarks: [] },
      rawatibLogs: {},
      doaFav: [],
      dashboardShortcuts: ['sholat', 'habit'],
      notif: { ...DEFAULT_NOTIF },
      theme: 'system',
      uiScale: 1,
      arabicScale: 1,

      setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      setTheme: (t) => set(() => ({ theme: t })),
      setUiScale: (n) => set(() => ({ uiScale: n })),
      setArabicScale: (n) => set(() => ({ arabicScale: n })),
      setDashboardShortcuts: (ids) => set(() => ({ dashboardShortcuts: ids })),
      setNotif: (patch) => set((s) => ({ notif: { ...s.notif, ...patch } })),

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

      toggleRawatib: (date, key) =>
        set((s) => {
          const day = s.rawatibLogs[date] ?? {}
          return {
            rawatibLogs: {
              ...s.rawatibLogs,
              [date]: { ...day, [key]: !day[key] },
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

      addQuranPages: (n) =>
        set((s) => {
          const today = dateKey()
          const dailyVal = Math.max(0, (s.quranDaily[today] ?? 0) + n)
          let read = s.quran.read + n
          let { khatamCount, lifetime } = s.quran
          lifetime = Math.max(0, lifetime + n)
          let startedAt = s.quran.startedAt
          // selesai satu khatam → naikkan hitungan & mulai khatam baru
          while (read >= s.quran.target) {
            read -= s.quran.target
            khatamCount += 1
            startedAt = today
          }
          if (read < 0) read = 0
          return {
            quran: { ...s.quran, read, khatamCount, lifetime, startedAt },
            quranDaily: { ...s.quranDaily, [today]: dailyVal },
          }
        }),

      setQuranTargetMonths: (m) =>
        set((s) => ({ quran: { ...s.quran, targetMonths: m } })),

      resetKhatam: () =>
        set((s) => ({ quran: { ...s.quran, read: 0, startedAt: dateKey() } })),

      addHafalan: (surah, nama, fromAyah, toAyah) =>
        set((s) => {
          const today = dateKey()
          const item: HafalanItem = {
            id: `hf-${Date.now().toString(36)}`,
            surah,
            nama,
            fromAyah,
            toAyah,
            box: 1,
            nextDue: today, // langsung jadi setoran hari ini
            addedAt: today,
          }
          return { hafalan: [...s.hafalan, item] }
        }),

      gradeHafalan: (id, grade) =>
        set((s) => {
          const today = dateKey()
          const hafalan = s.hafalan.map((h) => {
            if (h.id !== id) return h
            const { box, nextDue } = applyGrade(h.box, grade)
            return { ...h, box, nextDue, lastReviewed: today }
          })
          return {
            hafalan,
            setoranDaily: { ...s.setoranDaily, [today]: (s.setoranDaily[today] ?? 0) + 1 },
          }
        }),

      removeHafalan: (id) =>
        set((s) => ({ hafalan: s.hafalan.filter((h) => h.id !== id) })),

      setMuhasabah: (date, patch) =>
        set((s) => {
          const prev = s.muhasabah[date] ?? { rating: 0, syukur: '', perbaikan: '', niat: '', updatedAt: '' }
          return {
            muhasabah: {
              ...s.muhasabah,
              [date]: { ...prev, ...patch, updatedAt: new Date().toISOString() },
            },
          }
        }),

      setLastRead: (surah, ayah) =>
        set((s) => ({ reader: { ...s.reader, lastRead: { surah, ayah } } })),

      toggleBookmark: (surah, ayah) =>
        set((s) => {
          const exists = s.reader.bookmarks.some((b) => b.surah === surah && b.ayah === ayah)
          const bookmarks = exists
            ? s.reader.bookmarks.filter((b) => !(b.surah === surah && b.ayah === ayah))
            : [...s.reader.bookmarks, { surah, ayah }]
          return { reader: { ...s.reader, bookmarks } }
        }),

      toggleDoaFav: (id) =>
        set((s) => ({
          doaFav: s.doaFav.includes(id) ? s.doaFav.filter((x) => x !== id) : [...s.doaFav, id],
        })),

      replaceData: (d) =>
        set(() => ({
          profile: d.profile,
          prayerLogs: d.prayerLogs,
          habits: d.habits,
          habitLogs: d.habitLogs,
          tasbih: d.tasbih,
          quran: d.quran ?? defaultQuran(),
          quranDaily: d.quranDaily ?? {},
          hafalan: d.hafalan ?? [],
          setoranDaily: d.setoranDaily ?? {},
          muhasabah: d.muhasabah ?? {},
          reader: d.reader ?? { bookmarks: [] },
          rawatibLogs: d.rawatibLogs ?? {},
          doaFav: d.doaFav ?? [],
          dashboardShortcuts: d.dashboardShortcuts ?? ['sholat', 'habit'],
          notif: { ...DEFAULT_NOTIF, ...(d.notif ?? {}) },
        })),

      resetData: () => set(() => defaultSnapshot()),
    }),
    {
      name: 'niyatin-store-v1',
      version: 1,
    },
  ),
)

// Kondisi data awal yang bersih (untuk akun baru / reset).
export function defaultSnapshot(): SyncSnapshot {
  return {
    profile: { ...DEFAULT_PROFILE },
    prayerLogs: {},
    habits: DEFAULT_HABITS.map((h) => ({ ...h })),
    habitLogs: {},
    tasbih: { count: 0, target: 33, sets: 0 },
    quran: defaultQuran(),
    quranDaily: {},
    hafalan: [],
    setoranDaily: {},
    muhasabah: {},
    reader: { bookmarks: [] },
    rawatibLogs: {},
    doaFav: [],
    dashboardShortcuts: ['sholat', 'habit'],
    notif: { ...DEFAULT_NOTIF },
  }
}

// Ambil potongan data yang disinkronkan dari state penuh.
export function snapshotOf(s: SyncSnapshot): SyncSnapshot {
  return {
    profile: s.profile,
    prayerLogs: s.prayerLogs,
    habits: s.habits,
    habitLogs: s.habitLogs,
    tasbih: s.tasbih,
    quran: s.quran,
    quranDaily: s.quranDaily,
    hafalan: s.hafalan,
    setoranDaily: s.setoranDaily,
    muhasabah: s.muhasabah,
    reader: s.reader,
    rawatibLogs: s.rawatibLogs,
    doaFav: s.doaFav,
    dashboardShortcuts: s.dashboardShortcuts,
    notif: s.notif,
  }
}

// Helper: status habit hari ini selesai atau belum
export function isHabitDone(habit: Habit, value: number): boolean {
  if (habit.type === 'checkbox') return value >= 1
  return value >= habit.target
}

export const todayKey = () => dateKey()
