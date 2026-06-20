// Doa-doa seputar pernikahan & pengantin baru — sumber Qur'an & hadis sahih.
// Mohon verifikasi penulisan Arab dengan kitab/mushaf terpercaya.

export interface PengantinDua {
  no: number
  judul: string
  arab: string
  latin: string
  arti: string
  sumber?: string
}

export const PENGANTIN_DUA: PengantinDua[] = [
  {
    no: 1,
    judul: 'Doa untuk Pengantin (mendoakan mempelai)',
    arab: 'بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    latin: 'Bārakallāhu laka, wa bāraka ‘alaika, wa jama‘a bainakumā fī khairin.',
    arti:
      'Semoga Allah memberkahimu, melimpahkan keberkahan atasmu, dan menyatukan kalian berdua dalam kebaikan.',
    sumber: 'HR. Abu Dawud & Tirmidzi (hasan sahih).',
  },
  {
    no: 2,
    judul: 'Doa Memegang Ubun-ubun Pasangan (malam pertama)',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ',
    latin:
      'Allāhumma innī as’aluka khairahā wa khaira mā jabaltahā ‘alaih, wa a‘ūdzu bika min syarrihā wa syarri mā jabaltahā ‘alaih.',
    arti:
      'Ya Allah, aku memohon kepada-Mu kebaikannya dan kebaikan tabiat yang Engkau ciptakan padanya; dan aku berlindung kepada-Mu dari keburukannya serta keburukan tabiat yang Engkau ciptakan padanya.',
    sumber: 'HR. Abu Dawud & Ibnu Majah. (Disunnahkan suami meletakkan tangan di ubun-ubun istri dan mendoakannya.)',
  },
  {
    no: 3,
    judul: 'Doa Memohon Keturunan yang Baik',
    arab: 'رَبِّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ',
    latin: 'Rabbi hab lī min ladunka dzurriyyatan ṭayyibah, innaka samī‘ud-du‘ā’.',
    arti:
      'Ya Tuhanku, berilah aku dari sisi-Mu keturunan yang baik. Sungguh Engkau Maha Mendengar doa.',
    sumber: 'QS Āli ‘Imrān 3:38.',
  },
  {
    no: 4,
    judul: 'Doa Pasangan & Keturunan Penyejuk Hati',
    arab: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    latin:
      'Rabbanā hab lanā min azwājinā wa dzurriyyātinā qurrata a‘yunin waj‘alnā lil-muttaqīna imāmā.',
    arti:
      'Ya Tuhan kami, anugerahkanlah kepada kami pasangan dan keturunan kami sebagai penyenang hati, dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa.',
    sumber: 'QS Al-Furqān 25:74.',
  },
  {
    no: 5,
    judul: 'Doa Sebelum Berkumpul (suami–istri)',
    arab: 'بِسْمِ اللَّهِ، اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ، وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا',
    latin: 'Bismillāh, Allāhumma jannibnasy-syaiṭāna, wa jannibisy-syaiṭāna mā razaqtanā.',
    arti:
      'Dengan nama Allah. Ya Allah, jauhkanlah kami dari setan dan jauhkanlah setan dari (anak) yang Engkau karuniakan kepada kami.',
    sumber: 'HR. Bukhari–Muslim (dari Ibnu ‘Abbas).',
  },
]
