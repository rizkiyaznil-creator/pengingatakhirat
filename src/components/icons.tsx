// Ikon SVG inline ringan (tanpa dependensi). Mengikuti currentColor.
interface P extends React.SVGProps<SVGSVGElement> {
  size?: number
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export const HomeIcon = ({ size = 24, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M9.5 21v-6h5v6" />
  </svg>
)

export const MosqueIcon = ({ size = 24, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 2c2.5 2.2 4 4 4 6 0 2.2-1.8 3.5-4 3.5S8 10.2 8 8c0-2 1.5-3.8 4-6Z" />
    <path d="M4 21v-7a3 3 0 0 1 3-3" />
    <path d="M20 21v-7a3 3 0 0 0-3-3" />
    <path d="M4 21h16" />
    <path d="M10 21v-3a2 2 0 0 1 4 0v3" />
  </svg>
)

export const CheckCircleIcon = ({ size = 24, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
)

export const UserIcon = ({ size = 24, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-3.3 3.6-5.5 8-5.5s8 2.2 8 5.5" />
  </svg>
)

export const FlameIcon = ({ size = 24, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3c1 3 4 4.2 4 7.5A4 4 0 0 1 8 11c0-1 .3-1.8.8-2.5C9 9.5 10 10 10.5 10 9 7.5 11 4.5 12 3Z" />
    <path d="M12 21a5 5 0 0 1-5-5c0-1.5.8-3 2-4 .2 1.3 1 2 2 2.3-.4-1.6.6-3 1-3.6.8 1.2 3 2.3 3 5.3a5 5 0 0 1-3 5Z" />
  </svg>
)

export const PlusIcon = ({ size = 24, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const TrashIcon = ({ size = 24, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </svg>
)

export const LocationIcon = ({ size = 24, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const ChevronRight = ({ size = 24, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)

export const TrendUpIcon = ({ size = 24, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="m3 16 5-5 4 3 6-7" />
    <path d="M18 7h3v3" />
  </svg>
)

export const GridIcon = ({ size = 24, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </svg>
)
