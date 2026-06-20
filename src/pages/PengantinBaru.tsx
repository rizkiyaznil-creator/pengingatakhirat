import { useEffect, useState } from 'react'
import { PENGANTIN_DUA } from '../data/pengantin'
import StickyBack from '../components/StickyBack'

type Tab = 'doa' | 'sunnah' | 'nasihat'

const TABS: { id: Tab; label: string }[] = [
  { id: 'doa', label: 'Doa' },
  { id: 'sunnah', label: 'Malam Pertama' },
  { id: 'nasihat', label: 'Nasihat' },
]

export default function PengantinBaru() {
  const [tab, setTab] = useState<Tab>('doa')

  return (
    <div className="space-y-4 pb-4">
      <GiftPopup />
      <StickyBack label="Lainnya" />
      <header className="pt-2">
        <h1 className="text-xl font-bold">Pengantin Baru</h1>
        <p className="text-sm text-ocean-900/60">Doa, sunnah malam pertama, & nasihat sakinah</p>
      </header>

      {/* Navigasi bagian */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t.id ? 'bg-ocean-700 text-white' : 'bg-sand-200 text-ocean-900/60'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'doa' && <DoaSection />}
      {tab === 'sunnah' && <SunnahSection />}
      {tab === 'nasihat' && <NasihatSection />}

      <p className="px-2 text-center text-[11px] text-ocean-900/40">
        Materi bersifat ringkas & lintas-madzhab. Untuk penerapan, rujuk ustadz/kitab terpercaya
        karena ada perbedaan pendapat di antara ulama.
      </p>
    </div>
  )
}

// ---------- Popup hadiah (muncul saat halaman dibuka) ----------
function GiftPopup() {
  // Tampil saat halaman dibuka, lalu tutup otomatis setelah 5 detik.
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 5000)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ocean-900/40 px-8 backdrop-blur-sm"
      onClick={() => setShow(false)}
    >
      <div
        className="relative w-full max-w-xs rounded-3xl bg-white px-6 py-7 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShow(false)}
          aria-label="Tutup"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-sand-100 text-ocean-900/50 transition active:bg-sand-200"
        >
          ✕
        </button>
        <div className="text-4xl">💝</div>
        <p className="mt-3 text-lg font-bold leading-snug text-ocean-900">
          A gift to Zulpan &amp; Nisa
        </p>
      </div>
    </div>
  )
}

// ---------- Komponen kecil ----------
function Dalil({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 rounded-xl bg-ocean-50 px-3 py-2 text-[12px] leading-relaxed text-ocean-700">
      <span className="font-semibold">Dalil: </span>
      {children}
    </div>
  )
}
function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2 text-sm leading-relaxed text-ocean-900/80">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ocean-500" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

// ---------- Doa ----------
function DoaSection() {
  return (
    <div className="space-y-3">
      {PENGANTIN_DUA.map((d) => (
        <div key={d.no} className="card px-5 py-4">
          <p className="font-semibold leading-tight">{d.judul}</p>
          <p className="mt-3 font-arabic arabic-text text-right leading-loose text-ocean-900" dir="rtl">
            {d.arab}
          </p>
          <p className="mt-2 text-xs italic leading-relaxed text-ocean-900/55">{d.latin}</p>
          <p className="mt-2 text-sm leading-relaxed text-ocean-900/80">{d.arti}</p>
          {d.sumber && (
            <p className="mt-2 rounded-xl bg-sand-100 px-3 py-2 text-[11px] leading-relaxed text-ocean-900/55">
              📖 {d.sumber}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

// ---------- Sunnah Malam Pertama ----------
function SunnahSection() {
  return (
    <div className="space-y-3">
      <div className="card px-5 py-4">
        <p className="font-semibold">Menyambut dengan lembut</p>
        <p className="mt-1 text-sm leading-relaxed text-ocean-900/80">
          Awali dengan kasih sayang, sapaan baik, dan tidak tergesa-gesa. Sebagian ulama menyebut
          dianjurkan memberi sesuatu yang menyenangkan (mis. minuman) sebagai bentuk keramahan.
        </p>
        <Dalil>
          “Dan pergaulilah mereka (istri) dengan cara yang baik (ma’ruf).” (QS An-Nisā’ 4:19).
        </Dalil>
      </div>

      <div className="card px-5 py-4">
        <p className="font-semibold">Meletakkan tangan di ubun-ubun & mendoakan</p>
        <p className="mt-1 text-sm leading-relaxed text-ocean-900/80">
          Disunnahkan suami meletakkan tangannya di ubun-ubun (bagian depan kepala) istri lalu
          mendoakannya. Lafal doanya ada di tab <b>Doa</b> (doa no. 2).
        </p>
        <Dalil>
          “Apabila salah seorang kalian menikahi wanita… hendaklah memegang ubun-ubunnya dan
          mendoakan keberkahan.” (HR. Abu Dawud & Ibnu Majah).
        </Dalil>
      </div>

      <div className="card px-5 py-4">
        <p className="font-semibold">Sholat dua rakaat bersama</p>
        <p className="mt-1 text-sm leading-relaxed text-ocean-900/80">
          Diriwayatkan dari sebagian sahabat & tabi’in bahwa dianjurkan mengerjakan sholat dua rakaat
          bersama istri di malam pertama, memohon keberkahan rumah tangga kepada Allah.
        </p>
        <Bullets
          items={[
            'Niatkan rumah tangga sebagai ibadah dan ladang pahala.',
            'Berdoa memohon keberkahan, kasih sayang, dan keturunan yang saleh.',
          ]}
        />
        <Dalil>
          Atsar dari Ibnu Mas’ud & Abu Sa’id (diriwayatkan Ibnu Abi Syaibah & Ath-Thabrani). Amalan
          ini bersifat anjuran (mustahab), bukan kewajiban.
        </Dalil>
      </div>

      <div className="card px-5 py-4">
        <p className="font-semibold">Doa sebelum berkumpul & menjaga rahasia</p>
        <Bullets
          items={[
            <span>Membaca doa sebelum berkumpul (lihat tab <b>Doa</b>, no. 5) agar dijauhkan dari setan.</span>,
            'Menjaga rahasia keluarga — tidak menceritakan urusan ranjang kepada orang lain.',
            'Lemah lembut, saling memuliakan, dan menjauhi sikap kasar.',
          ]}
        />
        <Dalil>
          “Sesungguhnya termasuk manusia yang paling buruk kedudukannya di sisi Allah adalah suami
          yang menggauli istrinya lalu menyebarkan rahasianya.” (HR. Muslim).
        </Dalil>
      </div>
    </div>
  )
}

// ---------- Nasihat Sakinah ----------
function NasihatSection() {
  return (
    <div className="space-y-3">
      <div className="card px-5 py-4">
        <p className="font-semibold">Tujuan pernikahan: sakinah, mawaddah, rahmah</p>
        <p className="mt-1 text-sm leading-relaxed text-ocean-900/80">
          Pernikahan adalah sarana meraih ketenangan (sakinah), cinta (mawaddah), dan kasih sayang
          (rahmah). Rawat ketiganya dengan komunikasi dan kesabaran.
        </p>
        <Dalil>
          “Dan di antara tanda-tanda (kebesaran)-Nya, Dia menciptakan pasangan-pasangan untukmu…
          agar kamu merasa tenteram, dan Dia menjadikan di antaramu rasa cinta dan kasih sayang.”
          (QS Ar-Rūm 30:21).
        </Dalil>
      </div>

      <div className="card px-5 py-4">
        <p className="font-semibold">Pergauli pasangan dengan baik</p>
        <Bullets
          items={[
            'Saling menghargai, lembut dalam ucapan, dan menahan emosi.',
            'Maklum terhadap kekurangan — tak ada manusia yang sempurna.',
            'Bermusyawarah dalam urusan rumah tangga.',
          ]}
        />
        <Dalil>
          “Sebaik-baik kalian adalah yang paling baik kepada keluarganya, dan akulah yang paling baik
          kepada keluargaku.” (HR. Tirmidzi, sahih).
        </Dalil>
      </div>

      <div className="card px-5 py-4">
        <p className="font-semibold">Hak & kewajiban yang seimbang</p>
        <Bullets
          items={[
            'Suami: memimpin dengan kasih, memberi nafkah, melindungi, dan membimbing agama keluarga.',
            'Istri: menjaga kehormatan & amanah, taat dalam kebaikan, dan menenteramkan rumah.',
            'Keduanya: saling memenuhi hak, saling memaafkan, dan tumbuh bersama dalam ketaatan.',
          ]}
        />
        <Dalil>
          “Dan mereka (para istri) mempunyai hak seimbang dengan kewajibannya menurut cara yang
          ma’ruf.” (QS Al-Baqarah 2:228).
        </Dalil>
      </div>

      <div className="card px-5 py-4">
        <p className="font-semibold">Rawat cinta setiap hari</p>
        <Bullets
          items={[
            'Sering ungkapkan terima kasih & pujian yang tulus.',
            'Selesaikan masalah berdua, jangan dibawa tidur dengan amarah.',
            'Doakan pasangan, dan jadikan ibadah sebagai pondasi rumah tangga.',
          ]}
        />
      </div>
    </div>
  )
}
