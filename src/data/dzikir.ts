// Dzikir Pagi & Petang — kumpulan dzikir masyhur (rujukan: Hisnul Muslim & hadits sahih).
// Mohon verifikasi penulisan Arab dengan kitab terpercaya sebelum diamalkan luas.
// waktu: 'pagi' | 'petang' | 'both' (dibaca pagi & petang dengan teks sama).

export type DzikirWaktu = 'pagi' | 'petang' | 'both'

export interface Dzikir {
  no: number
  judul: string
  arab: string
  latin: string
  arti: string
  ulang: number
  catatan?: string
  waktu: DzikirWaktu
}

export const DZIKIR: Dzikir[] = [
  {
    no: 1,
    judul: 'Ayat Kursi',
    arab: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin:
      'Allāhu lā ilāha illā huwal-ḥayyul-qayyūm. Lā ta’khużuhū sinatuw wa lā naum. Lahū mā fis-samāwāti wa mā fil-arḍ. Man żal-lażī yasyfa‘u ‘indahū illā bi’iżnih. Ya‘lamu mā baina aidīhim wa mā khalfahum. Wa lā yuḥīṭūna bisyai’im min ‘ilmihī illā bimā syā’. Wasi‘a kursiyyuhus-samāwāti wal-arḍ. Wa lā ya’ūduhū ḥifẓuhumā. Wa huwal-‘aliyyul-‘aẓīm.',
    arti:
      'Allah, tidak ada tuhan selain Dia Yang Maha Hidup, Yang terus-menerus mengurus makhluk-Nya… (QS Al-Baqarah: 255).',
    ulang: 1,
    catatan: 'Siapa membacanya pagi/petang dijaga dari gangguan setan hingga waktu berikutnya.',
    waktu: 'both',
  },
  {
    no: 2,
    judul: 'Al-Ikhlāṣ, Al-Falaq, An-Nās',
    arab: 'قُلْ هُوَ اللَّهُ أَحَدٌ … قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ … قُلْ أَعُوذُ بِرَبِّ النَّاسِ …',
    latin: 'Qul huwallāhu aḥad… Qul a‘ūżu birabbil-falaq… Qul a‘ūżu birabbin-nās…',
    arti: 'Membaca tiga surah pelindung (Al-Ikhlāṣ, Al-Falaq, An-Nās) masing-masing 3 kali.',
    ulang: 3,
    catatan: 'Cukup bagimu dari segala sesuatu (HR. Abu Dawud & Tirmidzi).',
    waktu: 'both',
  },
  {
    no: 3,
    judul: 'Sayyidul Istighfar',
    arab: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    latin:
      'Allāhumma anta rabbī lā ilāha illā anta, khalaqtanī wa anā ‘abduka, wa anā ‘alā ‘ahdika wa wa‘dika mastaṭa‘tu, a‘ūżu bika min syarri mā ṣana‘tu, abū’u laka bini‘matika ‘alayya, wa abū’u biżanbī faghfir lī fa’innahū lā yaghfiruż-żunūba illā anta.',
    arti:
      'Ya Allah, Engkau Tuhanku, tiada tuhan selain Engkau. Engkau menciptakanku dan aku hamba-Mu… ampunilah aku, sebab tiada yang mengampuni dosa kecuali Engkau.',
    ulang: 1,
    catatan: 'Penghulu istighfar — yang membacanya yakin lalu wafat hari itu, menjadi penghuni surga.',
    waktu: 'both',
  },
  {
    no: 4,
    judul: 'Memasuki Pagi',
    arab: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    latin:
      'Aṣbaḥnā wa aṣbaḥal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa ‘alā kulli syai’in qadīr.',
    arti:
      'Kami memasuki waktu pagi dan kerajaan hanya milik Allah. Segala puji bagi Allah, tiada tuhan selain Allah semata, tiada sekutu bagi-Nya.',
    ulang: 1,
    waktu: 'pagi',
  },
  {
    no: 5,
    judul: 'Memasuki Petang',
    arab: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    latin:
      'Amsainā wa amsal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa ‘alā kulli syai’in qadīr.',
    arti:
      'Kami memasuki waktu petang dan kerajaan hanya milik Allah. Segala puji bagi Allah, tiada tuhan selain Allah semata, tiada sekutu bagi-Nya.',
    ulang: 1,
    waktu: 'petang',
  },
  {
    no: 6,
    judul: 'Berlindung dengan Kalimat Allah',
    arab: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    latin: 'A‘ūżu bikalimātillāhit-tāmmāti min syarri mā khalaq.',
    arti: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk-Nya.',
    ulang: 3,
    catatan: 'Terutama dibaca petang; tidak ada yang membahayakannya malam itu.',
    waktu: 'petang',
  },
  {
    no: 7,
    judul: 'Ridha kepada Allah',
    arab: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    latin: 'Raḍītu billāhi rabbā, wa bil-islāmi dīnā, wa bimuḥammadin ṣallallāhu ‘alaihi wa sallama nabiyyā.',
    arti: 'Aku ridha Allah sebagai Tuhan, Islam sebagai agama, dan Muhammad ﷺ sebagai nabi.',
    ulang: 3,
    catatan: 'Allah pasti meridhainya pada hari kiamat.',
    waktu: 'both',
  },
  {
    no: 8,
    judul: 'Permohonan Kesehatan & Penjagaan',
    arab: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ',
    latin:
      'Allāhumma ‘āfinī fī badanī, allāhumma ‘āfinī fī sam‘ī, allāhumma ‘āfinī fī baṣarī, lā ilāha illā anta.',
    arti:
      'Ya Allah, sehatkanlah tubuhku, pendengaranku, dan penglihatanku. Tiada tuhan selain Engkau.',
    ulang: 3,
    waktu: 'both',
  },
  {
    no: 9,
    judul: 'Cukuplah Allah',
    arab: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    latin: 'Ḥasbiyallāhu lā ilāha illā huwa, ‘alaihi tawakkaltu, wa huwa rabbul-‘arsyil-‘aẓīm.',
    arti:
      'Cukuplah Allah bagiku, tiada tuhan selain Dia. Kepada-Nya aku bertawakal, dan Dia Tuhan ‘Arsy yang agung.',
    ulang: 7,
    catatan: 'Allah mencukupi urusan dunia & akhiratnya.',
    waktu: 'both',
  },
  {
    no: 10,
    judul: 'Tidak Membahayakan dengan Nama-Nya',
    arab: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    latin:
      'Bismillāhil-lażī lā yaḍurru ma‘asmihī syai’un fil-arḍi wa lā fis-samā’i wa huwas-samī‘ul-‘alīm.',
    arti:
      'Dengan nama Allah yang bersama nama-Nya tidak ada sesuatu pun yang membahayakan, di bumi maupun di langit. Dia Maha Mendengar lagi Maha Mengetahui.',
    ulang: 3,
    catatan: 'Tidak akan ditimpa bahaya mendadak.',
    waktu: 'both',
  },
  {
    no: 11,
    judul: 'Wahai Yang Maha Hidup',
    arab: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
    latin:
      'Yā ḥayyu yā qayyūmu biraḥmatika astagīṡu, aṣliḥ lī sya’nī kullah, wa lā takilnī ilā nafsī ṭarfata ‘ain.',
    arti:
      'Wahai Yang Maha Hidup, Maha Berdiri Sendiri, dengan rahmat-Mu aku memohon pertolongan. Perbaikilah seluruh urusanku dan jangan serahkan aku pada diriku walau sekejap mata.',
    ulang: 1,
    waktu: 'both',
  },
  {
    no: 12,
    judul: 'Tasbih & Tahmid',
    arab: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    latin: 'Subḥānallāhi wa biḥamdih.',
    arti: 'Maha Suci Allah dan segala puji bagi-Nya.',
    ulang: 100,
    catatan: 'Dihapus dosa-dosanya walau sebanyak buih lautan (dibaca 100×).',
    waktu: 'both',
  },
  {
    no: 13,
    judul: 'Tahlil Sempurna',
    arab: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    latin:
      'Lā ilāha illallāhu waḥdahū lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa ‘alā kulli syai’in qadīr.',
    arti:
      'Tiada tuhan selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan pujian, dan Dia Maha Kuasa atas segala sesuatu.',
    ulang: 10,
    catatan: 'Setara memerdekakan budak & menjadi perisai dari setan (dibaca 10×/100×).',
    waktu: 'both',
  },
  {
    no: 14,
    judul: 'Ampunan & Keselamatan',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
    latin: 'Allāhumma innī as’alukal-‘afwa wal-‘āfiyata fid-dun-yā wal-ākhirah.',
    arti:
      'Ya Allah, aku memohon kepada-Mu ampunan dan keselamatan di dunia dan akhirat.',
    ulang: 1,
    waktu: 'both',
  },
  {
    no: 15,
    judul: 'Doa Fitrah (Petang)',
    arab: 'أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ',
    latin:
      'Amsainā ‘alā fiṭratil-islām, wa ‘alā kalimatil-ikhlāṣ, wa ‘alā dīni nabiyyinā Muḥammadin ṣallallāhu ‘alaihi wa sallam, wa ‘alā millati abīnā Ibrāhīma ḥanīfan musliman wa mā kāna minal-musyrikīn.',
    arti:
      'Di waktu sore kami berada di atas fitrah agama Islam, kalimat ikhlas, agama Nabi kita Muhammad ﷺ, dan agama ayah kami Ibrahim, yang lurus, muslim, dan tidak tergolong orang-orang musyrik.',
    ulang: 1,
    catatan: 'HR. Ahmad III/406–407, ad-Darimi II/292, dan Ibnus Sunni dalam Amalul Yaum wal Lailah no. 34 — shahih.',
    waktu: 'petang',
  },
  {
    no: 16,
    judul: 'Doa Perlindungan (Petang)',
    arab: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ',
    latin:
      'Allāhumma ‘ālimal-ghaibi wasy-syahādah, fāṭiras-samāwāti wal-arḍ, rabba kulli syai’in wa malīkah, asyhadu an lā ilāha illā anta, a‘ūżu bika min syarri nafsī, wa min syarrisy-syaiṭāni wa syirkih, wa an aqtarifa ‘alā nafsī sū’an au ajurrahū ilā muslim.',
    arti:
      'Ya Allah Yang Maha Mengetahui yang gaib dan yang nyata, wahai Rabb pencipta langit dan bumi, Rabb dan Raja segala sesuatu. Aku bersaksi tiada tuhan yang berhak disembah kecuali Engkau. Aku berlindung kepada-Mu dari kejahatan diriku, dari kejahatan setan dan ajakan syiriknya, serta dari berbuat kejelekan atas diriku atau menyeret seorang muslim kepadanya.',
    ulang: 1,
    catatan: 'Diajarkan Nabi ﷺ kepada Abu Bakar: dibaca pagi, petang, dan menjelang tidur. HR. Al-Bukhari (Al-Adabul Mufrad 1202), at-Tirmidzi no. 3392 — shahih.',
    waktu: 'petang',
  },
]
