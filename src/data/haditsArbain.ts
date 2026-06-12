// Hadits Arba'in An-Nawawi (42 hadits) — Arab, terjemahan, & sumber.
// PENTING: teks Arab & terjemahan disusun untuk kemudahan; mohon verifikasi dengan
// kitab Arba'in An-Nawawi terbitan terpercaya sebelum dijadikan rujukan.
export interface Hadits {
  no: number
  judul: string
  arab: string
  terjemah: string
  perawi: string
}

export const HADITS_ARBAIN: Hadits[] = [
  {
    no: 1,
    judul: 'Niat',
    arab: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    terjemah:
      'Sesungguhnya amal itu tergantung niatnya, dan sesungguhnya setiap orang hanya mendapatkan sesuai apa yang ia niatkan. Maka barangsiapa hijrahnya karena Allah dan Rasul-Nya, maka hijrahnya untuk Allah dan Rasul-Nya…',
    perawi: 'HR. Bukhari & Muslim',
  },
  {
    no: 2,
    judul: 'Islam, Iman, Ihsan',
    arab: 'الْإِسْلَامُ أَنْ تَشْهَدَ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ…',
    terjemah:
      'Hadits Jibril: Islam adalah engkau bersaksi tiada tuhan selain Allah dan Muhammad utusan Allah, menegakkan shalat, menunaikan zakat, berpuasa Ramadhan, dan berhaji bila mampu. Iman adalah beriman kepada Allah, malaikat, kitab, rasul, hari akhir, dan takdir. Ihsan adalah beribadah seakan engkau melihat-Nya…',
    perawi: 'HR. Muslim',
  },
  {
    no: 3,
    judul: 'Rukun Islam',
    arab: 'بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ',
    terjemah:
      'Islam dibangun di atas lima perkara: bersaksi tiada tuhan selain Allah dan Muhammad utusan Allah, menegakkan shalat, menunaikan zakat, haji ke Baitullah, dan puasa Ramadhan.',
    perawi: 'HR. Bukhari & Muslim',
  },
  {
    no: 4,
    judul: 'Penciptaan & Takdir',
    arab: 'إِنَّ أَحَدَكُمْ يُجْمَعُ خَلْقُهُ فِي بَطْنِ أُمِّهِ أَرْبَعِينَ يَوْمًا…',
    terjemah:
      'Sesungguhnya penciptaan kalian dikumpulkan di rahim ibunya selama 40 hari berupa nutfah, lalu menjadi ‘alaqah selama itu, lalu mudghah selama itu, kemudian diutus malaikat meniupkan ruh dan menulis empat ketetapan: rezeki, ajal, amal, sengsara atau bahagia…',
    perawi: 'HR. Bukhari & Muslim',
  },
  {
    no: 5,
    judul: 'Larangan Bid’ah',
    arab: 'مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ',
    terjemah:
      'Barangsiapa mengada-adakan dalam urusan (agama) kami ini sesuatu yang bukan darinya, maka ia tertolak.',
    perawi: 'HR. Bukhari & Muslim',
  },
  {
    no: 6,
    judul: 'Halal & Haram',
    arab: 'إِنَّ الْحَلَالَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ',
    terjemah:
      'Sesungguhnya yang halal itu jelas dan yang haram itu jelas, di antara keduanya ada perkara samar yang tidak diketahui banyak orang. Barangsiapa menjaga diri dari yang samar, ia telah menyelamatkan agama dan kehormatannya. Ketahuilah, dalam tubuh ada segumpal daging; bila baik, baiklah seluruh tubuh — itulah hati.',
    perawi: 'HR. Bukhari & Muslim',
  },
  {
    no: 7,
    judul: 'Agama adalah Nasihat',
    arab: 'الدِّينُ النَّصِيحَةُ',
    terjemah:
      'Agama adalah nasihat. Kami bertanya: Untuk siapa? Beliau menjawab: Untuk Allah, kitab-Nya, rasul-Nya, para pemimpin kaum muslimin, dan kaum muslimin pada umumnya.',
    perawi: 'HR. Muslim',
  },
  {
    no: 8,
    judul: 'Kehormatan Seorang Muslim',
    arab: 'أُمِرْتُ أَنْ أُقَاتِلَ النَّاسَ حَتَّى يَشْهَدُوا أَنْ لَا إِلَهَ إِلَّا اللَّهُ…',
    terjemah:
      'Aku diperintahkan memerangi manusia hingga mereka bersaksi tiada tuhan selain Allah dan Muhammad utusan Allah, menegakkan shalat, dan menunaikan zakat. Bila mereka lakukan, terlindungilah darah dan harta mereka kecuali dengan hak Islam, dan perhitungan mereka di sisi Allah.',
    perawi: 'HR. Bukhari & Muslim',
  },
  {
    no: 9,
    judul: 'Lakukan Semampunya',
    arab: 'مَا نَهَيْتُكُمْ عَنْهُ فَاجْتَنِبُوهُ، وَمَا أَمَرْتُكُمْ بِهِ فَأْتُوا مِنْهُ مَا اسْتَطَعْتُمْ',
    terjemah:
      'Apa yang aku larang maka jauhilah, dan apa yang aku perintahkan maka lakukanlah semampu kalian. Sesungguhnya yang membinasakan umat sebelum kalian adalah banyak bertanya dan menyelisihi nabi mereka.',
    perawi: 'HR. Bukhari & Muslim',
  },
  {
    no: 10,
    judul: 'Makan yang Halal',
    arab: 'إِنَّ اللَّهَ طَيِّبٌ لَا يَقْبَلُ إِلَّا طَيِّبًا',
    terjemah:
      'Sesungguhnya Allah itu baik dan tidak menerima kecuali yang baik. Allah memerintahkan orang beriman sebagaimana memerintahkan para rasul (untuk makan dari yang baik dan beramal saleh). Lalu disebutkan orang yang berdoa namun makanan, minuman, dan pakaiannya haram — bagaimana doanya dikabulkan?',
    perawi: 'HR. Muslim',
  },
  {
    no: 11,
    judul: 'Tinggalkan Keraguan',
    arab: 'دَعْ مَا يَرِيبُكَ إِلَى مَا لَا يَرِيبُكَ',
    terjemah:
      'Tinggalkan apa yang meragukanmu menuju apa yang tidak meragukanmu. Sesungguhnya kejujuran itu ketenangan dan dusta itu keraguan.',
    perawi: 'HR. Tirmidzi & Nasa’i',
  },
  {
    no: 12,
    judul: 'Meninggalkan yang Sia-sia',
    arab: 'مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ',
    terjemah: 'Di antara tanda baiknya keislaman seseorang adalah meninggalkan hal yang tidak bermanfaat baginya.',
    perawi: 'HR. Tirmidzi (hasan)',
  },
  {
    no: 13,
    judul: 'Mencintai Sesama',
    arab: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    terjemah: 'Tidak sempurna iman salah seorang kalian hingga ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri.',
    perawi: 'HR. Bukhari & Muslim',
  },
  {
    no: 14,
    judul: 'Kapan Darah Muslim Halal',
    arab: 'لَا يَحِلُّ دَمُ امْرِئٍ مُسْلِمٍ إِلَّا بِإِحْدَى ثَلَاثٍ',
    terjemah:
      'Tidak halal darah seorang muslim kecuali karena salah satu dari tiga: pezina yang sudah menikah, jiwa dibalas jiwa (qishash), dan orang yang meninggalkan agamanya berpisah dari jamaah.',
    perawi: 'HR. Bukhari & Muslim',
  },
  {
    no: 15,
    judul: 'Memuliakan Tamu & Berkata Baik',
    arab: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    terjemah:
      'Barangsiapa beriman kepada Allah dan hari akhir, hendaklah berkata baik atau diam; hendaklah memuliakan tetangganya; dan hendaklah memuliakan tamunya.',
    perawi: 'HR. Bukhari & Muslim',
  },
  {
    no: 16,
    judul: 'Jangan Marah',
    arab: 'لَا تَغْضَبْ',
    terjemah: 'Seseorang berkata kepada Nabi ﷺ: “Nasihatilah aku.” Beliau menjawab: “Jangan marah.” Orang itu mengulang, dan beliau tetap menjawab: “Jangan marah.”',
    perawi: 'HR. Bukhari',
  },
  {
    no: 17,
    judul: 'Berbuat Ihsan',
    arab: 'إِنَّ اللَّهَ كَتَبَ الْإِحْسَانَ عَلَى كُلِّ شَيْءٍ',
    terjemah:
      'Sesungguhnya Allah mewajibkan berbuat ihsan atas segala sesuatu. Bila kalian membunuh (dalam qishash) maka perbaikilah caranya, dan bila menyembelih maka tajamkanlah pisaunya dan senangkanlah hewan sembelihannya.',
    perawi: 'HR. Muslim',
  },
  {
    no: 18,
    judul: 'Takwa & Akhlak',
    arab: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا',
    terjemah:
      'Bertakwalah kepada Allah di mana pun engkau berada, iringilah keburukan dengan kebaikan niscaya menghapusnya, dan pergaulilah manusia dengan akhlak yang baik.',
    perawi: 'HR. Tirmidzi (hasan)',
  },
  {
    no: 19,
    judul: 'Penjagaan Allah',
    arab: 'احْفَظِ اللَّهَ يَحْفَظْكَ، احْفَظِ اللَّهَ تَجِدْهُ تُجَاهَكَ',
    terjemah:
      'Jagalah (perintah) Allah, niscaya Dia menjagamu. Jagalah Allah, niscaya engkau dapati Dia di hadapanmu. Bila meminta, mintalah kepada Allah; bila memohon pertolongan, mohonlah kepada Allah. Ketahuilah, seandainya umat berkumpul untuk memberi manfaat kepadamu, mereka tak mampu kecuali yang telah Allah tetapkan…',
    perawi: 'HR. Tirmidzi (hasan shahih)',
  },
  {
    no: 20,
    judul: 'Malu',
    arab: 'إِنَّ مِمَّا أَدْرَكَ النَّاسُ مِنْ كَلَامِ النُّبُوَّةِ الْأُولَى: إِذَا لَمْ تَسْتَحْيِ فَاصْنَعْ مَا شِئْتَ',
    terjemah: 'Sesungguhnya di antara ucapan kenabian terdahulu yang masih didapati manusia adalah: “Jika engkau tidak malu, berbuatlah sesukamu.”',
    perawi: 'HR. Bukhari',
  },
  {
    no: 21,
    judul: 'Istiqamah',
    arab: 'قُلْ آمَنْتُ بِاللَّهِ ثُمَّ اسْتَقِمْ',
    terjemah: 'Seseorang berkata: “Katakan kepadaku tentang Islam suatu ucapan yang tak akan kutanyakan kepada selainmu.” Beliau menjawab: “Katakanlah: Aku beriman kepada Allah, lalu istiqamahlah.”',
    perawi: 'HR. Muslim',
  },
  {
    no: 22,
    judul: 'Jalan ke Surga',
    arab: 'أَرَأَيْتَ إِذَا صَلَّيْتُ الْمَكْتُوبَاتِ…',
    terjemah:
      'Seseorang bertanya: “Bagaimana pendapatmu bila aku shalat fardhu, puasa Ramadhan, menghalalkan yang halal dan mengharamkan yang haram, apakah aku masuk surga?” Beliau menjawab: “Ya.”',
    perawi: 'HR. Muslim',
  },
  {
    no: 23,
    judul: 'Cabang-cabang Kebaikan',
    arab: 'الطُّهُورُ شَطْرُ الْإِيمَانِ',
    terjemah:
      'Bersuci adalah sebagian dari iman, alhamdulillah memenuhi timbangan, subhanallah dan alhamdulillah memenuhi antara langit dan bumi, shalat adalah cahaya, sedekah adalah bukti, sabar adalah sinar, dan Al-Qur’an adalah hujjah bagimu atau atasmu…',
    perawi: 'HR. Muslim',
  },
  {
    no: 24,
    judul: 'Larangan Berbuat Zalim',
    arab: 'يَا عِبَادِي إِنِّي حَرَّمْتُ الظُّلْمَ عَلَى نَفْسِي وَجَعَلْتُهُ بَيْنَكُمْ مُحَرَّمًا فَلَا تَظَالَمُوا',
    terjemah:
      'Hadits Qudsi: “Wahai hamba-Ku, Aku haramkan kezaliman atas diri-Ku dan Aku jadikan haram di antara kalian, maka janganlah saling menzalimi… Wahai hamba-Ku, sesungguhnya itu adalah amal-amal kalian yang Aku hitung untuk kalian, lalu Aku balas…”',
    perawi: 'HR. Muslim',
  },
  {
    no: 25,
    judul: 'Keutamaan Dzikir & Sedekah',
    arab: 'ذَهَبَ أَهْلُ الدُّثُورِ بِالْأُجُورِ',
    terjemah:
      'Para sahabat fakir berkata: “Orang kaya pergi membawa pahala (karena bersedekah).” Maka Nabi mengajarkan bahwa setiap tasbih, tahmid, takbir, amar makruf nahi mungkar, bahkan menggauli istri, adalah sedekah.',
    perawi: 'HR. Muslim',
  },
  {
    no: 26,
    judul: 'Banyak Pintu Kebaikan',
    arab: 'كُلُّ سُلَامَى مِنَ النَّاسِ عَلَيْهِ صَدَقَةٌ',
    terjemah:
      'Setiap ruas tulang manusia ada sedekahnya setiap hari: mendamaikan dua orang adalah sedekah, menolong seseorang naik kendaraannya adalah sedekah, ucapan yang baik adalah sedekah, setiap langkah ke shalat adalah sedekah, dan menyingkirkan gangguan dari jalan adalah sedekah.',
    perawi: 'HR. Bukhari & Muslim',
  },
  {
    no: 27,
    judul: 'Kebaikan & Dosa',
    arab: 'الْبِرُّ حُسْنُ الْخُلُقِ، وَالْإِثْمُ مَا حَاكَ فِي صَدْرِكَ',
    terjemah: 'Kebaikan adalah akhlak yang baik, dan dosa adalah apa yang mengganjal di dadamu dan engkau tidak suka orang lain mengetahuinya.',
    perawi: 'HR. Muslim',
  },
  {
    no: 28,
    judul: 'Berpegang pada Sunnah',
    arab: 'أُوصِيكُمْ بِتَقْوَى اللَّهِ وَالسَّمْعِ وَالطَّاعَةِ',
    terjemah:
      'Aku wasiatkan kepada kalian untuk bertakwa kepada Allah serta mendengar dan taat. Siapa di antara kalian yang hidup (sepeninggalku) akan melihat banyak perselisihan, maka berpeganglah pada sunnahku dan sunnah Khulafaur Rasyidin… dan jauhilah perkara yang diada-adakan, karena setiap bid’ah adalah kesesatan.',
    perawi: 'HR. Abu Dawud & Tirmidzi (hasan shahih)',
  },
  {
    no: 29,
    judul: 'Pintu-pintu Kebaikan',
    arab: 'أَلَا أَدُلُّكَ عَلَى أَبْوَابِ الْخَيْرِ؟',
    terjemah:
      'Maukah kutunjukkan pintu-pintu kebaikan? Puasa adalah perisai, sedekah memadamkan dosa seperti air memadamkan api, dan shalat seseorang di tengah malam. Pokok perkara adalah Islam, tiangnya shalat, dan puncaknya jihad. Lalu beliau bersabda agar menahan lisan.',
    perawi: 'HR. Tirmidzi (hasan shahih)',
  },
  {
    no: 30,
    judul: 'Batasan Allah',
    arab: 'إِنَّ اللَّهَ فَرَضَ فَرَائِضَ فَلَا تُضَيِّعُوهَا',
    terjemah:
      'Sesungguhnya Allah menetapkan kewajiban, maka jangan kalian sia-siakan; menetapkan batasan, maka jangan kalian langgar; mengharamkan banyak hal, maka jangan kalian terjang; dan mendiamkan beberapa hal sebagai rahmat, maka jangan kalian cari-cari.',
    perawi: 'HR. Daruquthni (hasan)',
  },
  {
    no: 31,
    judul: 'Hakikat Zuhud',
    arab: 'ازْهَدْ فِي الدُّنْيَا يُحِبَّكَ اللَّهُ، وَازْهَدْ فِيمَا عِنْدَ النَّاسِ يُحِبَّكَ النَّاسُ',
    terjemah: 'Zuhudlah terhadap dunia, niscaya Allah mencintaimu; dan zuhudlah terhadap apa yang dimiliki manusia, niscaya manusia mencintaimu.',
    perawi: 'HR. Ibnu Majah (hasan)',
  },
  {
    no: 32,
    judul: 'Tidak Boleh Membahayakan',
    arab: 'لَا ضَرَرَ وَلَا ضِرَارَ',
    terjemah: 'Tidak boleh membahayakan diri sendiri dan tidak boleh membahayakan orang lain.',
    perawi: 'HR. Ibnu Majah & Daruquthni (hasan)',
  },
  {
    no: 33,
    judul: 'Beban Pembuktian',
    arab: 'الْبَيِّنَةُ عَلَى الْمُدَّعِي وَالْيَمِينُ عَلَى مَنْ أَنْكَرَ',
    terjemah:
      'Seandainya manusia diberi sesuai tuntutan mereka, niscaya banyak orang menuntut darah dan harta orang lain. Maka bukti dibebankan kepada penuntut, dan sumpah dibebankan kepada yang mengingkari.',
    perawi: 'HR. Baihaqi & lainnya (hasan)',
  },
  {
    no: 34,
    judul: 'Mengubah Kemungkaran',
    arab: 'مَنْ رَأَى مِنْكُمْ مُنْكَرًا فَلْيُغَيِّرْهُ بِيَدِهِ',
    terjemah:
      'Barangsiapa di antara kalian melihat kemungkaran, hendaklah mengubahnya dengan tangannya; bila tak mampu, dengan lisannya; bila tak mampu, dengan hatinya — dan itulah selemah-lemah iman.',
    perawi: 'HR. Muslim',
  },
  {
    no: 35,
    judul: 'Persaudaraan',
    arab: 'لَا تَحَاسَدُوا وَلَا تَنَاجَشُوا وَلَا تَبَاغَضُوا',
    terjemah:
      'Janganlah saling dengki, saling menipu dalam jual beli, saling membenci, dan saling membelakangi. Jadilah kalian hamba-hamba Allah yang bersaudara. Seorang muslim saudara muslim lainnya; tidak menzaliminya, tidak membiarkannya, tidak meremehkannya. Takwa itu di sini (hati).',
    perawi: 'HR. Muslim',
  },
  {
    no: 36,
    judul: 'Menolong Sesama',
    arab: 'مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا…',
    terjemah:
      'Barangsiapa melapangkan satu kesusahan dunia seorang mukmin, Allah lapangkan satu kesusahan akhiratnya. Allah menolong hamba selama hamba menolong saudaranya. Barangsiapa menempuh jalan menuntut ilmu, Allah mudahkan baginya jalan ke surga.',
    perawi: 'HR. Muslim',
  },
  {
    no: 37,
    judul: 'Catatan Kebaikan & Keburukan',
    arab: 'إِنَّ اللَّهَ كَتَبَ الْحَسَنَاتِ وَالسَّيِّئَاتِ',
    terjemah:
      'Hadits Qudsi: Allah mencatat kebaikan dan keburukan. Barangsiapa berniat kebaikan lalu tidak melakukannya, dicatat satu kebaikan; bila melakukannya, dicatat 10 hingga 700 kali lipat. Barangsiapa berniat keburukan lalu tidak melakukannya, dicatat satu kebaikan; bila melakukannya, dicatat satu keburukan saja.',
    perawi: 'HR. Bukhari & Muslim',
  },
  {
    no: 38,
    judul: 'Mendekat kepada Allah',
    arab: 'مَنْ عَادَى لِي وَلِيًّا فَقَدْ آذَنْتُهُ بِالْحَرْبِ',
    terjemah:
      'Hadits Qudsi: Barangsiapa memusuhi wali-Ku, Aku nyatakan perang atasnya. Tidaklah hamba mendekat kepada-Ku dengan sesuatu yang lebih Aku cintai daripada yang Aku wajibkan; dan ia terus mendekat dengan amalan sunnah hingga Aku mencintainya…',
    perawi: 'HR. Bukhari',
  },
  {
    no: 39,
    judul: 'Dimaafkannya Kekeliruan',
    arab: 'إِنَّ اللَّهَ تَجَاوَزَ لِي عَنْ أُمَّتِي الْخَطَأَ وَالنِّسْيَانَ وَمَا اسْتُكْرِهُوا عَلَيْهِ',
    terjemah: 'Sesungguhnya Allah memaafkan dari umatku: kesalahan (tidak sengaja), lupa, dan apa yang dipaksakan atas mereka.',
    perawi: 'HR. Ibnu Majah & Baihaqi (hasan)',
  },
  {
    no: 40,
    judul: 'Hidup Bagai Perantau',
    arab: 'كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ',
    terjemah:
      'Jadilah engkau di dunia seakan orang asing atau pengembara. Ibnu Umar berkata: Bila sore, jangan menunggu pagi; bila pagi, jangan menunggu sore. Gunakan sehatmu sebelum sakitmu dan hidupmu sebelum matimu.',
    perawi: 'HR. Bukhari',
  },
  {
    no: 41,
    judul: 'Mengikuti Ajaran Nabi',
    arab: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يَكُونَ هَوَاهُ تَبَعًا لِمَا جِئْتُ بِهِ',
    terjemah: 'Tidak sempurna iman salah seorang kalian hingga hawa nafsunya tunduk mengikuti apa yang aku bawa.',
    perawi: 'HR. (dalam Arba’in, hasan shahih)',
  },
  {
    no: 42,
    judul: 'Luasnya Ampunan Allah',
    arab: 'يَا ابْنَ آدَمَ إِنَّكَ مَا دَعَوْتَنِي وَرَجَوْتَنِي غَفَرْتُ لَكَ…',
    terjemah:
      'Hadits Qudsi: Wahai anak Adam, selama engkau berdoa dan berharap kepada-Ku, Aku ampuni dosamu dan Aku tidak peduli. Wahai anak Adam, seandainya dosamu setinggi langit lalu engkau memohon ampun, Aku mengampunimu. Seandainya engkau datang dengan dosa sepenuh bumi namun tidak menyekutukan-Ku, Aku datang dengan ampunan sepenuh itu pula.',
    perawi: 'HR. Tirmidzi (hasan)',
  },
]
