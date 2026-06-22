// Dzikir Pagi & Petang — kumpulan dzikir masyhur (rujukan: Hisnul Muslim & hadits sahih).
// Mohon verifikasi penulisan Arab dengan kitab terpercaya sebelum diamalkan luas.
// waktu: 'pagi' | 'petang' | 'both' (dibaca pagi & petang dengan teks sama).
// Urutan tampil mengikuti urutan array ini; nomor badge dihitung dari posisi pada daftar.

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
    no: 18,
    judul: 'Ta‘awudz',
    arab: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    latin: 'A‘ūżu billāhi minasy-syaiṭānir-rajīm.',
    arti: 'Aku berlindung kepada Allah dari setan yang terkutuk.',
    ulang: 1,
    catatan: 'Dibaca sebagai pembuka sebelum Ayat Kursi & surah-surah pelindung.',
    waktu: 'both',
  },
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
    no: 19,
    judul: 'Surah Al-Ikhlāṣ',
    arab: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
    latin:
      'Qul huwallāhu aḥad. Allāhuṣ-ṣamad. Lam yalid wa lam yūlad. Wa lam yakul-lahū kufuwan aḥad.',
    arti:
      'Katakanlah: Dialah Allah Yang Maha Esa. Allah tempat bergantung segala sesuatu. Dia tidak beranak dan tidak diperanakkan. Dan tidak ada sesuatu pun yang setara dengan Dia.',
    ulang: 3,
    catatan: 'Tiga surah pelindung (Al-Ikhlāṣ, Al-Falaq, An-Nās) masing-masing 3×, cukup dari segala sesuatu (HR. Abu Dawud & Tirmidzi).',
    waktu: 'both',
  },
  {
    no: 20,
    judul: 'Surah Al-Falaq',
    arab: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    latin:
      'Qul a‘ūżu birabbil-falaq. Min syarri mā khalaq. Wa min syarri ghāsiqin iżā waqab. Wa min syarrin-naffāṡāti fil-‘uqad. Wa min syarri ḥāsidin iżā ḥasad.',
    arti:
      'Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh, dari kejahatan makhluk-Nya, dari kejahatan malam apabila telah gelap gulita, dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul, dan dari kejahatan orang yang dengki apabila ia dengki.',
    ulang: 3,
    waktu: 'both',
  },
  {
    no: 21,
    judul: 'Surah An-Nās',
    arab: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
    latin:
      'Qul a‘ūżu birabbin-nās. Malikin-nās. Ilāhin-nās. Min syarril-waswāsil-khannās. Allażī yuwaswisu fī ṣudūrin-nās. Minal-jinnati wan-nās.',
    arti:
      'Katakanlah: Aku berlindung kepada Tuhan manusia, Raja manusia, Sembahan manusia, dari kejahatan (bisikan) setan yang biasa bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari (golongan) jin dan manusia.',
    ulang: 3,
    waktu: 'both',
  },
  {
    no: 4,
    judul: 'Memasuki Pagi',
    arab: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    latin:
      'Aṣbaḥnā wa aṣbaḥal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa ‘alā kulli syai’in qadīr. Rabbi as’aluka khaira mā fī hāżal-yaumi wa khaira mā ba‘dah, wa a‘ūżu bika min syarri mā fī hāżal-yaumi wa syarri mā ba‘dah. Rabbi a‘ūżu bika minal-kasali wa sū’il-kibar, rabbi a‘ūżu bika min ‘ażābin fin-nāri wa ‘ażābin fil-qabr.',
    arti:
      'Kami memasuki waktu pagi dan kerajaan hanya milik Allah; segala puji bagi Allah, tiada tuhan selain Allah semata, tiada sekutu bagi-Nya; milik-Nya kerajaan dan bagi-Nya pujian, dan Dia Maha Kuasa atas segala sesuatu. Wahai Tuhanku, aku memohon kepada-Mu kebaikan apa yang ada pada hari ini dan kebaikan sesudahnya; aku berlindung kepada-Mu dari keburukan apa yang ada pada hari ini dan keburukan sesudahnya. Wahai Tuhanku, aku berlindung kepada-Mu dari rasa malas dan keburukan masa tua; wahai Tuhanku, aku berlindung kepada-Mu dari siksa di neraka dan siksa di kubur.',
    ulang: 1,
    catatan: 'HR. Muslim.',
    waktu: 'pagi',
  },
  {
    no: 5,
    judul: 'Memasuki Petang',
    arab: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبَّنَا نَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَنَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبَّنَا نَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبَّنَا نَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    latin:
      'Amsainā wa amsal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa ‘alā kulli syai’in qadīr. Rabbanā nas’aluka khaira mā fī hāżihil-lailati wa khaira mā ba‘dahā, wa na‘ūżu bika min syarri mā fī hāżihil-lailati wa syarri mā ba‘dahā. Rabbanā na‘ūżu bika minal-kasali wa sū’il-kibar, rabbanā na‘ūżu bika min ‘ażābin fin-nāri wa ‘ażābin fil-qabr.',
    arti:
      'Kami memasuki waktu petang dan kerajaan hanya milik Allah; segala puji bagi Allah, tiada tuhan selain Allah semata, tiada sekutu bagi-Nya; milik-Nya kerajaan dan bagi-Nya pujian, dan Dia Maha Kuasa atas segala sesuatu. Wahai Tuhan kami, kami memohon kepada-Mu kebaikan apa yang ada pada malam ini dan kebaikan sesudahnya; dan kami berlindung kepada-Mu dari keburukan apa yang ada pada malam ini dan keburukan sesudahnya. Wahai Tuhan kami, kami berlindung kepada-Mu dari rasa malas dan keburukan masa tua; wahai Tuhan kami, kami berlindung kepada-Mu dari siksa di neraka dan siksa di kubur.',
    ulang: 1,
    catatan: 'HR. Muslim.',
    waktu: 'petang',
  },
  {
    no: 26,
    judul: 'Berserah Diri (Petang)',
    arab: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
    latin: 'Allāhumma bika amsainā, wa bika aṣbaḥnā, wa bika naḥyā, wa bika namūtu, wa ilaikal-maṣīr.',
    arti:
      'Ya Allah, dengan (rahmat dan pertolongan)-Mu kami memasuki waktu petang, dan dengan-Mu kami memasuki waktu pagi; dengan-Mu kami hidup dan dengan-Mu kami mati, dan kepada-Mu tempat kembali.',
    ulang: 1,
    catatan: 'HR. At-Tirmidzi.',
    waktu: 'petang',
  },
  {
    no: 22,
    judul: 'Berserah Diri (Pagi)',
    arab: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    latin: 'Allāhumma bika aṣbaḥnā, wa bika amsainā, wa bika naḥyā, wa bika namūtu, wa ilaikan-nusyūr.',
    arti:
      'Ya Allah, dengan (rahmat dan pertolongan)-Mu kami memasuki waktu pagi, dan dengan-Mu kami memasuki waktu petang; dengan-Mu kami hidup dan dengan-Mu kami mati, dan kepada-Mu (kami) dibangkitkan.',
    ulang: 1,
    catatan: 'HR. At-Tirmidzi.',
    waktu: 'pagi',
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
    no: 8,
    judul: 'Permohonan Kesehatan & Penjagaan',
    arab: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَٰهَ إِلَّا أَنْتَ',
    latin:
      'Allāhumma ‘āfinī fī badanī, allāhumma ‘āfinī fī sam‘ī, allāhumma ‘āfinī fī baṣarī, lā ilāha illā anta. Allāhumma innī a‘ūżu bika minal-kufri wal-faqr, wa a‘ūżu bika min ‘ażābil-qabr, lā ilāha illā anta.',
    arti:
      'Ya Allah, sehatkanlah tubuhku; ya Allah, sehatkanlah pendengaranku; ya Allah, sehatkanlah penglihatanku. Tiada tuhan selain Engkau. Ya Allah, aku berlindung kepada-Mu dari kekufuran dan kefakiran, dan aku berlindung kepada-Mu dari siksa kubur. Tiada tuhan selain Engkau.',
    ulang: 3,
    waktu: 'both',
  },
  {
    no: 14,
    judul: 'Ampunan & Keselamatan',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
    latin:
      'Allāhumma innī as’alukal-‘afwa wal-‘āfiyata fid-dun-yā wal-ākhirah. Allāhumma innī as’alukal-‘afwa wal-‘āfiyata fī dīnī wa dun-yāya wa ahlī wa mālī. Allāhummastur ‘aurātī wa āmin rau‘ātī. Allāhummaḥfaẓnī mim baini yadayya wa min khalfī wa ‘an yamīnī wa ‘an syimālī wa min fauqī, wa a‘ūżu bi‘aẓamatika an ughtāla min taḥtī.',
    arti:
      'Ya Allah, aku memohon kepada-Mu ampunan dan keselamatan di dunia dan akhirat. Ya Allah, aku memohon kepada-Mu ampunan dan keselamatan dalam agamaku, duniaku, keluargaku, dan hartaku. Ya Allah, tutupilah auratku (aib) dan tenteramkanlah aku dari rasa takut. Ya Allah, peliharalah aku dari depan, belakang, kanan, kiri, dan atasku; dan aku berlindung dengan keagungan-Mu agar tidak disambar (binasa) dari bawahku.',
    ulang: 1,
    waktu: 'both',
  },
  {
    no: 16,
    judul: 'Doa Perlindungan',
    arab: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ',
    latin:
      'Allāhumma ‘ālimal-ghaibi wasy-syahādah, fāṭiras-samāwāti wal-arḍ, rabba kulli syai’in wa malīkah, asyhadu an lā ilāha illā anta, a‘ūżu bika min syarri nafsī, wa min syarrisy-syaiṭāni wa syirkih, wa an aqtarifa ‘alā nafsī sū’an au ajurrahū ilā muslim.',
    arti:
      'Ya Allah Yang Maha Mengetahui yang gaib dan yang nyata, wahai Rabb pencipta langit dan bumi, Rabb dan Raja segala sesuatu. Aku bersaksi tiada tuhan yang berhak disembah kecuali Engkau. Aku berlindung kepada-Mu dari kejahatan diriku, dari kejahatan setan dan ajakan syiriknya, serta dari berbuat kejelekan atas diriku atau menyeret seorang muslim kepadanya.',
    ulang: 1,
    catatan: 'Diajarkan Nabi ﷺ kepada Abu Bakar: dibaca pagi, petang, dan menjelang tidur. HR. Al-Bukhari (Al-Adabul Mufrad 1202), at-Tirmidzi no. 3392 — shahih.',
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
    no: 17,
    judul: 'Doa Fitrah (Pagi)',
    arab: 'أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ',
    latin:
      'Aṣbaḥnā ‘alā fiṭratil-islām, wa ‘alā kalimatil-ikhlāṣ, wa ‘alā dīni nabiyyinā Muḥammadin ṣallallāhu ‘alaihi wa sallam, wa ‘alā millati abīnā Ibrāhīma ḥanīfan musliman wa mā kāna minal-musyrikīn.',
    arti:
      'Di waktu pagi kami berada di atas fitrah agama Islam, kalimat ikhlas, agama Nabi kita Muhammad ﷺ, dan agama ayah kami Ibrahim, yang lurus, muslim, dan tidak tergolong orang-orang musyrik.',
    ulang: 1,
    catatan: 'HR. Ahmad III/406–407, ad-Darimi II/292, dan Ibnus Sunni dalam Amalul Yaum wal Lailah no. 34 — shahih.',
    waktu: 'pagi',
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
    no: 23,
    judul: 'Dzikir Pemberat Timbangan',
    arab: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    latin: 'Subḥānallāhi wa biḥamdih, ‘adada khalqih, wa riḍā nafsih, wa zinata ‘arsyih, wa midāda kalimātih.',
    arti:
      'Maha Suci Allah dan segala puji bagi-Nya, sebanyak bilangan makhluk-Nya, sejauh keridhaan diri-Nya, seberat timbangan ‘Arsy-Nya, dan sebanyak tinta (penulisan) kalimat-Nya.',
    ulang: 3,
    catatan: 'Dzikir yang sangat berat timbangannya. HR. Muslim (dari Juwairiyah).',
    waktu: 'both',
  },
  {
    no: 24,
    judul: 'Doa Memohon Ilmu & Amal',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    latin: 'Allāhumma innī as’aluka ‘ilman nāfi‘ā, wa rizqan ṭayyibā, wa ‘amalan mutaqabbalā.',
    arti:
      'Ya Allah, sungguh aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik (halal), dan amal yang diterima.',
    ulang: 1,
    catatan: 'Dibaca pagi seusai salam Subuh. HR. Ibnu Majah no. 925 — shahih.',
    waktu: 'pagi',
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
    no: 25,
    judul: 'Istighfar',
    arab: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    latin: 'Astagfirullāha wa atūbu ilaih.',
    arti: 'Aku memohon ampun kepada Allah dan bertobat kepada-Nya.',
    ulang: 100,
    catatan: 'Rasulullah ﷺ beristighfar dalam sehari lebih dari 70×/100×. HR. Bukhari & Muslim.',
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
    waktu: 'petang',
  },
]
