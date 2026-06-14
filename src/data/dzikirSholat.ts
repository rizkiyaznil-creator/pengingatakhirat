// Dzikir setelah sholat fardhu sesuai sunnah (rujukan: Hisnul Muslim & hadits sahih).
// Mohon verifikasi penulisan Arab dengan kitab terpercaya sebelum diamalkan luas.

export interface DzikirSholatItem {
  no: number
  judul: string
  arab: string
  latin: string
  arti: string
  ulang: number
  catatan?: string
}

export const DZIKIR_SHOLAT: DzikirSholatItem[] = [
  {
    no: 1,
    judul: 'Istighfar',
    arab: 'أَسْتَغْفِرُ اللَّهَ',
    latin: 'Astaghfirullāh.',
    arti: 'Aku memohon ampun kepada Allah.',
    ulang: 3,
    catatan: 'Dibaca 3× seusai salam.',
  },
  {
    no: 2,
    judul: 'Memohon Keselamatan',
    arab: 'اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    latin: 'Allāhumma antas-salām, wa minkas-salām, tabārakta yā żal-jalāli wal-ikrām.',
    arti:
      'Ya Allah, Engkau Mahasejahtera dan dari-Mu kesejahteraan. Mahasuci Engkau, wahai Pemilik keagungan dan kemuliaan.',
    ulang: 1,
  },
  {
    no: 3,
    judul: 'Tahlil & Pujian',
    arab: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ',
    latin:
      'Lā ilāha illallāhu waḥdahū lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa ‘alā kulli syai’in qadīr. Allāhumma lā māni‘a limā a‘ṭaita, wa lā mu‘ṭiya limā mana‘ta, wa lā yanfa‘u żal-jaddi minkal-jadd.',
    arti:
      'Tiada tuhan selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan pujian, dan Dia Mahakuasa atas segala sesuatu. Ya Allah, tak ada yang dapat mencegah apa yang Engkau beri, dan tak ada yang dapat memberi apa yang Engkau cegah; tak berguna kekayaan/kedudukan pemiliknya di hadapan-Mu.',
    ulang: 1,
  },
  {
    no: 4,
    judul: 'Ayat Kursi',
    arab: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin:
      'Allāhu lā ilāha illā huwal-ḥayyul-qayyūm… (QS Al-Baqarah: 255).',
    arti:
      'Allah, tidak ada tuhan selain Dia Yang Mahahidup, Yang terus-menerus mengurus makhluk-Nya… (QS Al-Baqarah: 255).',
    ulang: 1,
    catatan: 'Siapa membacanya seusai sholat fardhu, tak ada penghalang masuk surga kecuali kematian.',
  },
  {
    no: 5,
    judul: 'Tasbih',
    arab: 'سُبْحَانَ اللَّهِ',
    latin: 'Subḥānallāh.',
    arti: 'Mahasuci Allah.',
    ulang: 33,
  },
  {
    no: 6,
    judul: 'Tahmid',
    arab: 'الْحَمْدُ لِلَّهِ',
    latin: 'Al-ḥamdu lillāh.',
    arti: 'Segala puji bagi Allah.',
    ulang: 33,
  },
  {
    no: 7,
    judul: 'Takbir',
    arab: 'اللَّهُ أَكْبَرُ',
    latin: 'Allāhu akbar.',
    arti: 'Allah Mahabesar.',
    ulang: 33,
  },
  {
    no: 8,
    judul: 'Penyempurna 100',
    arab: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    latin:
      'Lā ilāha illallāhu waḥdahū lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa ‘alā kulli syai’in qadīr.',
    arti:
      'Tiada tuhan selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan pujian, dan Dia Mahakuasa atas segala sesuatu.',
    ulang: 1,
    catatan: 'Menggenapkan tasbih+tahmid+takbir menjadi 100; dosa-dosa diampuni walau sebanyak buih lautan.',
  },
  {
    no: 9,
    judul: 'Tiga Surah Pelindung',
    arab: 'قُلْ هُوَ اللَّهُ أَحَدٌ … قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ … قُلْ أَعُوذُ بِرَبِّ النَّاسِ …',
    latin: 'Qul huwallāhu aḥad… Qul a‘ūżu birabbil-falaq… Qul a‘ūżu birabbin-nās…',
    arti: 'Membaca surah Al-Ikhlāṣ, Al-Falaq, dan An-Nās.',
    ulang: 1,
    catatan: 'Dibaca 1× tiap seusai sholat; 3× setelah Subuh & Maghrib.',
  },
]
