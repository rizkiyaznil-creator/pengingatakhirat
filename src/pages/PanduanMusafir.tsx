import { useState } from 'react'
import { MUSAFIR_DUA } from '../data/musafir'
import StickyBack from '../components/StickyBack'

type Tab = 'doa' | 'qashar' | 'jamak' | 'skenario' | 'tayamum'

const TABS: { id: Tab; label: string }[] = [
  { id: 'doa', label: 'Doa' },
  { id: 'qashar', label: 'Qashar' },
  { id: 'jamak', label: 'Jamak' },
  { id: 'skenario', label: 'Skenario' },
  { id: 'tayamum', label: 'Tayamum' },
]

export default function PanduanMusafir() {
  const [tab, setTab] = useState<Tab>('doa')

  return (
    <div className="space-y-4 pb-4">
      <StickyBack label="Lainnya" />
      <header className="pt-2">
        <h1 className="text-xl font-bold">Panduan Musafir</h1>
        <p className="text-sm text-ocean-900/60">Doa, qashar, jamak, & tayamum saat bepergian</p>
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
      {tab === 'qashar' && <QasharSection />}
      {tab === 'jamak' && <JamakSection />}
      {tab === 'skenario' && <SkenarioSection />}
      {tab === 'tayamum' && <TayamumSection />}

      <p className="px-2 text-center text-[11px] text-ocean-900/40">
        Materi fiqih bersifat ringkas & lintas-madzhab. Untuk penerapan, rujuk ustadz/kitab terpercaya
        karena ada perbedaan pendapat di antara ulama.
      </p>
    </div>
  )
}

// ---------- Komponen kecil ----------
function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 rounded-xl border-l-4 border-clay-400 bg-clay-400/10 px-3 py-2 text-[12px] leading-relaxed text-ocean-900/70">
      <span className="font-semibold text-clay-600">Catatan perbedaan: </span>
      {children}
    </div>
  )
}
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
      {MUSAFIR_DUA.map((d) => (
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

// ---------- Qashar ----------
function QasharSection() {
  return (
    <div className="space-y-3">
      <div className="card px-5 py-4">
        <p className="font-semibold">Apa itu qashar?</p>
        <p className="mt-1 text-sm leading-relaxed text-ocean-900/80">
          Meringkas sholat 4 rakaat menjadi <b>2 rakaat</b>: Dzuhur, Ashar, dan Isya.
          <b> Subuh (2) dan Maghrib (3) tidak diqashar.</b>
        </p>
        <Dalil>
          “Apabila kamu bepergian di muka bumi, tidak mengapa kamu mengqashar sholat…” (QS An-Nisā’ 4:101);
          dipraktikkan Nabi ﷺ (HR. Bukhari–Muslim dari Ibnu Umar & Aisyah).
        </Dalil>
      </div>

      <div className="card px-5 py-4">
        <p className="font-semibold">Syarat qashar</p>
        <Bullets
          items={[
            'Perjalanan mencapai jarak safar dan tujuannya mubah (bukan untuk maksiat).',
            'Sudah keluar dari batas kota/kampung tempat tinggal.',
            'Berniat qashar (menurut sebagian madzhab), dan belum berniat menetap (mukim) lama di tujuan.',
          ]}
        />
        <Note>
          <b>Jarak:</b> jumhur (Maliki, Syafi’i, Hanbali) ± 4 burud ≈ <b>80–88 km</b>; Hanafi mengukur dengan
          lama perjalanan (± 3 marhalah). <b>Hukum:</b> jumhur menilai qashar sebagai rukhsah (keringanan)
          yang dianjurkan, sedangkan Hanafi menilainya ‘azimah (ketetapan) bagi musafir.
        </Note>
        <Note>
          <b>Batas mukim:</b> Syafi’i & Maliki — bila berniat tinggal ≥ 4 hari (di luar hari datang & pergi)
          dianggap mukim, sholat kembali sempurna; Hanafi — batasnya 15 hari; Hanbali — lebih dari 4 hari /
          20 waktu sholat.
        </Note>
      </div>
    </div>
  )
}

// ---------- Jamak ----------
function JamakSection() {
  return (
    <div className="space-y-3">
      <div className="card px-5 py-4">
        <p className="font-semibold">Apa itu jamak?</p>
        <p className="mt-1 text-sm leading-relaxed text-ocean-900/80">
          Menggabung dua sholat dalam satu waktu: <b>Dzuhur + Ashar</b> dan <b>Maghrib + Isya</b>.
          <b> Subuh tidak boleh dijamak.</b>
        </p>
        <Dalil>
          Nabi ﷺ menjamak sholat ketika safar (HR. Bukhari–Muslim dari Anas, Ibnu Abbas, Mu’adz).
        </Dalil>
      </div>

      <div className="card px-5 py-4">
        <p className="font-semibold">Dua cara jamak</p>
        <Bullets
          items={[
            <span><b>Jamak taqdim</b> — keduanya dikerjakan di <b>waktu sholat pertama</b> (mis. Ashar dimajukan ke waktu Dzuhur).</span>,
            <span><b>Jamak ta’khir</b> — keduanya dikerjakan di <b>waktu sholat kedua</b> (mis. Dzuhur diakhirkan ke waktu Ashar).</span>,
          ]}
        />
        <p className="mt-3 text-sm font-semibold text-ocean-900/80">Syarat ringkas</p>
        <Bullets
          items={[
            'Jamak taqdim: niat menjamak saat sholat pertama, tertib (urut), dan beruntun (muwalah/tanpa jeda lama).',
            'Jamak ta’khir: berniat akan menjamak sebelum waktu sholat pertama habis.',
          ]}
        />
        <Note>
          Jumhur (Maliki, Syafi’i, Hanbali) membolehkan jamak karena safar. <b>Hanafi</b> berpendapat tidak ada
          jamak hakiki kecuali di Arafah & Muzdalifah; selainnya cukup “jamak shuri” (mengerjakan di ujung
          waktu masing-masing). Maliki & Hanbali juga membolehkan jamak karena hujan/uzur tertentu meski tidak safar.
        </Note>
      </div>

      <div className="card px-5 py-4">
        <p className="font-semibold">Jamak di hari Jumat</p>
        <p className="mt-1 text-sm leading-relaxed text-ocean-900/80">
          Bagi musafir, hari Jumat punya <b>dua pilihan — pilih salah satu, jangan digabung.</b>
        </p>

        <p className="mt-3 text-sm font-semibold text-ocean-900/80">Pilihan 1 — Ikut sholat Jumat</p>
        <Bullets
          items={[
            <span>Bila singgah di daerah yang menegakkan Jumat, ikut Jumat. <b>Jumat sudah menggantikan Dzuhur</b> — tidak perlu Dzuhur lagi.</span>,
            <span>Jumat tetap <b>2 rakaat</b> (memang jumlahnya, bukan diqashar).</span>,
            <span>Menjamak <b>Ashar ke Jumat</b> (taqdim): ada perbedaan pendapat — lihat catatan.</span>,
          ]}
        />
        <Note>
          Sebagian ulama <b>membolehkan</b> musafir menjamak Ashar setelah Jumat, dengan mengqiyaskan Jumat pada
          Dzuhur. Namun pendapat yang lebih hati-hati (dan lebih kuat menurut banyak ulama): <b>Jumat bukan Dzuhur</b>
          {' '}dan tidak ada dalil tegas menjamak Ashar ke Jumat — maka <b>Ashar dikerjakan pada waktunya</b>.
        </Note>

        <p className="mt-4 text-sm font-semibold text-ocean-900/80">Pilihan 2 — Sholat Dzuhur (tanpa Jumat)</p>
        <Bullets
          items={[
            <span>Menurut jumhur, <b>safar menggugurkan kewajiban Jumat</b>, sehingga musafir boleh tidak Jumat dan menggantinya dengan Dzuhur.</span>,
            <span>Dengan pilihan ini, boleh <b>menjamak-qashar Dzuhur + Ashar</b> (taqdim/ta’khir) seperti hari biasa.</span>,
            <span><b>Jangan</b> sholat Jumat lalu tetap Dzuhur — cukup salah satu.</span>,
          ]}
        />
        <Dalil>
          Pada Haji Wada’ yang jatuh hari Jumat, di Arafah Nabi ﷺ <b>menjamak-qashar Dzuhur & Ashar</b> dan
          tidak menegakkan sholat Jumat (HR. Bukhari–Muslim) — dalil bahwa musafir tidak wajib Jumat.
        </Dalil>
        <Note>
          Bila tidak menyulitkan, <b>tetap ikut Jumat lebih utama</b> karena keutamaannya; rukhsah safar hanya
          keringanan bagi yang berat menunaikannya.
        </Note>
      </div>
    </div>
  )
}

// ---------- Skenario (asisten interaktif) ----------
type Jauh = 'ya' | 'tidak'
type Pasangan = 'dz_as' | 'mg_is' | 'subuh'
type Waktu = 'taqdim' | 'takhir'

function Choice({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
        active ? 'bg-ocean-700 text-white' : 'bg-sand-200 text-ocean-900/65'
      }`}
    >
      {label}
    </button>
  )
}

function SkenarioSection() {
  const [jauh, setJauh] = useState<Jauh | null>(null)
  const [pasangan, setPasangan] = useState<Pasangan | null>(null)
  const [waktu, setWaktu] = useState<Waktu | null>(null)

  function reset() {
    setJauh(null)
    setPasangan(null)
    setWaktu(null)
  }

  return (
    <div className="space-y-3">
      <div className="card px-5 py-4">
        <p className="font-semibold">Asisten skenario</p>
        <p className="mt-0.5 text-xs text-ocean-900/55">
          Jawab pertanyaan berikut, lalu kami sarankan jamak/qashar yang sesuai.
        </p>

        {/* Q1 */}
        <p className="mt-4 text-sm font-semibold text-ocean-900/80">
          1. Apakah perjalananmu memenuhi jarak safar (± 80 km atau lebih)?
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Choice label="Ya, jarak jauh" active={jauh === 'ya'} onClick={() => { setJauh('ya'); setPasangan(null); setWaktu(null) }} />
          <Choice label="Tidak / dekat" active={jauh === 'tidak'} onClick={() => { setJauh('tidak'); setPasangan(null); setWaktu(null) }} />
        </div>

        {/* Q2 */}
        {jauh === 'ya' && (
          <>
            <p className="mt-4 text-sm font-semibold text-ocean-900/80">2. Sholat mana yang ingin digabung?</p>
            <div className="mt-2 grid grid-cols-1 gap-2">
              <Choice label="Dzuhur + Ashar" active={pasangan === 'dz_as'} onClick={() => { setPasangan('dz_as'); setWaktu(null) }} />
              <Choice label="Maghrib + Isya" active={pasangan === 'mg_is'} onClick={() => { setPasangan('mg_is'); setWaktu(null) }} />
              <Choice label="Subuh" active={pasangan === 'subuh'} onClick={() => { setPasangan('subuh'); setWaktu(null) }} />
            </div>
          </>
        )}

        {/* Q3 */}
        {jauh === 'ya' && (pasangan === 'dz_as' || pasangan === 'mg_is') && (
          <>
            <p className="mt-4 text-sm font-semibold text-ocean-900/80">3. Kapan kamu bisa berhenti untuk sholat?</p>
            <div className="mt-2 grid grid-cols-1 gap-2">
              <Choice
                label={pasangan === 'dz_as' ? 'Saat waktu Dzuhur (awal)' : 'Saat waktu Maghrib (awal)'}
                active={waktu === 'taqdim'}
                onClick={() => setWaktu('taqdim')}
              />
              <Choice
                label={pasangan === 'dz_as' ? 'Nanti saat waktu Ashar (akhir)' : 'Nanti saat waktu Isya (akhir)'}
                active={waktu === 'takhir'}
                onClick={() => setWaktu('takhir')}
              />
            </div>
          </>
        )}

        {(jauh === 'tidak' || pasangan === 'subuh' || (pasangan && waktu)) && (
          <button onClick={reset} className="mt-4 text-xs font-semibold text-ocean-600">
            ↺ Ulangi
          </button>
        )}
      </div>

      <Rekomendasi jauh={jauh} pasangan={pasangan} waktu={waktu} />
    </div>
  )
}

function Rekomendasi({ jauh, pasangan, waktu }: { jauh: Jauh | null; pasangan: Pasangan | null; waktu: Waktu | null }) {
  if (!jauh) return null

  if (jauh === 'tidak') {
    return (
      <ResultCard title="Sholat seperti biasa (bukan musafir)">
        <p className="text-sm leading-relaxed text-ocean-900/80">
          Karena jarak belum memenuhi safar (menurut jumhur), keringanan qashar & jamak safar tidak berlaku.
          Kerjakan sholat <b>sempurna pada waktunya</b>.
        </p>
        <Note>
          Maliki & Hanbali membolehkan jamak karena uzur tertentu (mis. hujan lebat) meski tidak safar. Bila
          benar-benar darurat, sebagian ulama membolehkan jamak agar tidak meninggalkan sholat — rujuk ustadz.
        </Note>
      </ResultCard>
    )
  }

  if (pasangan === 'subuh') {
    return (
      <ResultCard title="Subuh tetap 2 rakaat">
        <p className="text-sm leading-relaxed text-ocean-900/80">
          Sholat Subuh <b>tidak boleh dijamak maupun diqashar</b>. Kerjakan 2 rakaat pada waktunya.
        </p>
      </ResultCard>
    )
  }

  if (!pasangan || !waktu) return null

  const isDz = pasangan === 'dz_as'
  const first = isDz ? 'Dzuhur' : 'Maghrib'
  const second = isDz ? 'Ashar' : 'Isya'
  const firstRak = isDz ? 2 : 3 // Maghrib tidak diqashar
  const secondRak = 2
  const atTime = waktu === 'taqdim' ? first : second
  const jenis = waktu === 'taqdim' ? 'Jamak Taqdim' : 'Jamak Ta’khir'

  const steps =
    waktu === 'taqdim'
      ? [
          `Masuk waktu ${first}, berniat jamak taqdim (menggabung ${second} ke waktu ${first}).`,
          `Kerjakan ${first} ${firstRak} rakaat.`,
          `Langsung (tanpa jeda lama) kerjakan ${second} ${secondRak} rakaat.`,
        ]
      : [
          `Saat masih di waktu ${first}, niatkan akan menjamak ta’khir (mengakhirkan ${first} ke waktu ${second}).`,
          `Setelah masuk waktu ${second}, kerjakan ${first} ${firstRak} rakaat lebih dulu (tertib).`,
          `Lalu kerjakan ${second} ${secondRak} rakaat, beruntun.`,
        ]

  return (
    <ResultCard title={`${jenis} + Qashar — di waktu ${atTime}`}>
      <div className="flex gap-2">
        <span className="rounded-lg bg-ocean-100 px-2.5 py-1 text-xs font-semibold text-ocean-600">
          {first} {firstRak} rakaat
        </span>
        <span className="rounded-lg bg-ocean-100 px-2.5 py-1 text-xs font-semibold text-ocean-600">
          {second} {secondRak} rakaat
        </span>
      </div>
      <Bullets items={steps} />
      {!isDz && (
        <p className="mt-2 text-[12px] text-ocean-900/60">Catatan: Maghrib tetap 3 rakaat (tidak diqashar).</p>
      )}
      <Note>
        Berlaku menurut jumhur. <b>Hanafi</b>: tidak ada jamak hakiki selain di Arafah/Muzdalifah — cukup
        kerjakan tiap sholat di ujung waktunya (jamak shuri), namun qashar tetap berlaku.
      </Note>
    </ResultCard>
  )
}

function ResultCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card overflow-hidden">
      <div className="bg-ocean-700 px-5 py-3 text-white">
        <p className="text-xs uppercase tracking-wide text-white/70">Saran</p>
        <p className="font-bold leading-tight">{title}</p>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

// ---------- Tayamum ----------
function TayamumSection() {
  return (
    <div className="space-y-3">
      <div className="card px-5 py-4">
        <p className="font-semibold">Kapan boleh tayamum?</p>
        <Bullets
          items={[
            'Tidak ada air, atau air ada tetapi tidak cukup untuk bersuci.',
            'Tidak mampu memakai air karena sakit/uzur, atau air sangat dingin yang membahayakan.',
            'Sudah masuk waktu sholat (menurut sebagian madzhab).',
          ]}
        />
        <Dalil>
          “…jika kamu sakit atau dalam perjalanan… lalu kamu tidak mendapat air, maka bertayamumlah dengan
          debu yang baik (suci)…” (QS Al-Mā’idah 5:6; lihat juga An-Nisā’ 4:43).
        </Dalil>
      </div>

      <div className="card px-5 py-4">
        <p className="font-semibold">Tatacara tayamum</p>
        <ol className="mt-2 space-y-2">
          {[
            'Berniat dalam hati untuk bersuci (tayamum) agar boleh sholat.',
            'Membaca basmalah, lalu menepukkan kedua telapak tangan ke permukaan berdebu yang suci.',
            'Mengusap seluruh wajah dengan kedua telapak tangan.',
            'Mengusap kedua tangan (punggung & telapak).',
          ].map((t, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-ocean-900/80">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-600">
                {i + 1}
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
        <Note>
          <b>Jumlah tepukan & batas tangan:</b> Hanafi & Syafi’i — dua tepukan, tangan diusap <b>sampai siku</b>.
          Sebagian ulama (berdasar hadis ‘Ammar, HR. Bukhari–Muslim) — cukup <b>satu tepukan</b> dan mengusap
          <b> telapak tangan sampai pergelangan</b>. Keduanya punya dalil.
        </Note>
      </div>

      <div className="card px-5 py-4">
        <p className="font-semibold">Pembatal tayamum</p>
        <Bullets
          items={[
            'Semua yang membatalkan wudhu (buang air, tidur nyenyak, dll.).',
            'Ditemukannya air (bagi yang uzurnya karena ketiadaan air) sebelum sholat.',
            'Hilangnya uzur (mis. sembuh dari sakit).',
          ]}
        />
      </div>
    </div>
  )
}
