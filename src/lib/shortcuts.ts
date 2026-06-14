// Daftar pintasan yang bisa ditaruh di "Akses cepat" Beranda.
// kind 'tab' → pindah tab; kind 'sub' → buka modul di tab Lainnya.
export interface Shortcut {
  id: string
  label: string
  sub: string
  icon: string
  kind: 'tab' | 'sub'
  target: string
}

export const SHORTCUTS: Shortcut[] = [
  { id: 'sholat', label: 'Catat Sholat', sub: 'Update hari ini', icon: '🕌', kind: 'tab', target: 'sholat' },
  { id: 'habit', label: 'Habit', sub: 'Jaga rutinitas', icon: '✅', kind: 'tab', target: 'habit' },
  { id: 'baca', label: 'Baca Qur’an', sub: 'Tilawah & audio', icon: '📕', kind: 'sub', target: 'baca' },
  { id: 'quran', label: 'Khatam Qur’an', sub: 'Target & progres', icon: '📖', kind: 'sub', target: 'quran' },
  { id: 'hafalan', label: 'Hafalan', sub: 'Setoran hari ini', icon: '🧠', kind: 'sub', target: 'hafalan' },
  { id: 'doa', label: 'Doa Qur’ani', sub: 'Doa pilihan', icon: '🤲', kind: 'sub', target: 'doa' },
  { id: 'dzikir', label: 'Dzikir', sub: 'Pagi & petang', icon: '🌅', kind: 'sub', target: 'dzikir' },
  { id: 'muhasabah', label: 'Muhasabah', sub: 'Refleksi malam', icon: '🌙', kind: 'sub', target: 'muhasabah' },
  { id: 'kalender', label: 'Kalender', sub: 'Hijriah & puasa', icon: '🗓️', kind: 'sub', target: 'kalender' },
  { id: 'asma', label: 'Asmaul Husna', sub: '99 nama', icon: '✨', kind: 'sub', target: 'asma' },
  { id: 'hadits', label: 'Hadits Arba’in', sub: '42 hadits', icon: '📜', kind: 'sub', target: 'hadits' },
]

export const SHORTCUT_BY_ID: Record<string, Shortcut> = Object.fromEntries(
  SHORTCUTS.map((s) => [s.id, s]),
)
