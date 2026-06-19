// Doa-doa perjalanan (musafir) — sumber hadis sahih.
// Mohon verifikasi penulisan Arab dengan kitab terpercaya.

export interface MusafirDua {
  no: number
  judul: string
  arab: string
  latin: string
  arti: string
  sumber?: string
}

export const MUSAFIR_DUA: MusafirDua[] = [
  {
    no: 1,
    judul: 'Doa Naik Kendaraan',
    arab: 'بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ',
    latin:
      'Bismillāh, Allāhu akbar, Allāhu akbar, Allāhu akbar, subḥānalladzī sakhkhara lanā hādzā wa mā kunnā lahū muqrinīn, wa innā ilā rabbinā lamunqalibūn.',
    arti:
      'Dengan nama Allah; Allah Mahabesar (3×). Mahasuci Allah yang menundukkan kendaraan ini bagi kami, padahal kami tak mampu menguasainya. Sesungguhnya kami akan kembali kepada Tuhan kami.',
    sumber: 'HR. Muslim; QS Az-Zukhruf 13–14.',
  },
  {
    no: 2,
    judul: 'Doa Safar (Bepergian)',
    arab: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَٰذَا الْبِرَّ وَالتَّقْوَىٰ، وَمِنَ الْعَمَلِ مَا تَرْضَىٰ، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَٰذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ',
    latin:
      'Allāhumma innā nas’aluka fī safarinā hādzal-birra wat-taqwā, wa minal-‘amali mā tardhā. Allāhumma hawwin ‘alainā safaranā hādzā waṭwi ‘annā bu‘dah. Allāhumma antaṣ-ṣāḥibu fis-safar, wal-khalīfatu fil-ahl.',
    arti:
      'Ya Allah, kami memohon kebaikan dan takwa dalam perjalanan ini, serta amal yang Engkau ridai. Ya Allah, mudahkanlah perjalanan ini dan dekatkanlah jaraknya. Ya Allah, Engkau Teman dalam perjalanan dan Penjaga bagi keluarga (yang ditinggalkan).',
    sumber: 'HR. Muslim (dari Ibnu Umar).',
  },
  {
    no: 3,
    judul: 'Doa Singgah di Suatu Tempat',
    arab: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    latin: 'A‘ūdzu bikalimātillāhit-tāmmāti min syarri mā khalaq.',
    arti: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk-Nya.',
    sumber: 'HR. Muslim — tak ada yang membahayakannya hingga ia berangkat dari tempat itu.',
  },
  {
    no: 4,
    judul: 'Doa Ketika Pulang',
    arab: 'آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ',
    latin: 'Āyibūna tā’ibūna ‘ābidūna lirabbinā ḥāmidūn.',
    arti: 'Kami kembali, bertobat, beribadah, dan hanya kepada Tuhan kami memuji.',
    sumber: 'HR. Bukhari & Muslim — dibaca setelah doa safar saat perjalanan pulang.',
  },
  {
    no: 5,
    judul: 'Doa Memasuki Negeri/Kota',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ أَهْلِهَا وَخَيْرَ مَا فِيهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ أَهْلِهَا وَشَرِّ مَا فِيهَا',
    latin:
      'Allāhumma innī as’aluka khairahā wa khaira ahlihā wa khaira mā fīhā, wa a‘ūdzu bika min syarrihā wa syarri ahlihā wa syarri mā fīhā.',
    arti:
      'Ya Allah, aku memohon kebaikan negeri ini, kebaikan penduduknya, dan kebaikan yang ada di dalamnya; aku berlindung kepada-Mu dari keburukannya, keburukan penduduknya, dan keburukan yang ada di dalamnya.',
    sumber: 'HR. Al-Hakim & Ibnus Sunni (hasan).',
  },
]
