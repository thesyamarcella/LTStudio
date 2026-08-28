import { Product, MantraStageData, EngineStageData, PrincipleData, EcosystemMapNode } from '../types';

export const MANTRA_STAGES_ID: MantraStageData[] = [
  {
    number: '01',
    title: 'Satu Tindakan',
    subtitle: 'Titik Sentuh Tunggal',
    description: 'Satu entri atau tindakan pengguna langsung masuk ke ekosistem tanpa perlu pengulangan atau input manual di berbagai aplikasi terpisah.'
  },
  {
    number: '02',
    title: 'Data Terhubung',
    subtitle: 'Grafik Relasional',
    description: 'Informasi secara otomatis terhubung dan terdistribusi ke konteks terkait—mulai dari stok dapur hingga keuangan, dari kalender hingga catatan kesehatan.'
  },
  {
    number: '03',
    title: 'Otomasi Alur Kerja',
    subtitle: 'Tanpa Hambatan',
    description: 'Pemicu, kalkulasi, dan penyesuaian jadwal berjalan secara mandiri berkat hubungan antar-data yang saling memahami.'
  },
  {
    number: '04',
    title: 'Beban Mental Berkurang',
    subtitle: 'Kejelasan & Ketenangan',
    description: 'Fokus manusia beralih dari kerepotan mengelola berbagai aplikasi terpisah menjadi kemudahan dalam mengambil keputusan yang tepat.'
  }
];

export const ENGINE_STAGES_ID: EngineStageData[] = [
  {
    number: 'I',
    title: 'Input',
    description: 'Informasi mentah masuk ke dalam sistem melalui satu titik sentuh yang cepat dan tanpa hambatan.',
    example: 'Memindai struk belanja, menyimpan ide masakan, atau mencatat jadwal konsultasi dokter.'
  },
  {
    number: 'II',
    title: 'Pahami Konteks',
    description: 'Mesin menginterpretasikan arti entri tersebut dalam hubungannya dengan konteks kehidupan yang sedang aktif.',
    example: 'Mendeteksi perubahan stok bahan makanan, kebutuhan nutrisi, atau penyesuaian jadwal harian.'
  },
  {
    number: 'III',
    title: 'Hubungkan Semua',
    description: 'Catatan dari berbagai ranah terhubung secara dinamis alih-alih terisolasi di dalam aplikasi terpisah.',
    example: 'Menghubungkan bahan belanjaan ke perencana menu, anggaran bulanan, dan pembukuan rumah tangga.'
  },
  {
    number: 'IV',
    title: 'Otomatisasi Alur Kerja',
    description: 'Mengoordinasikan tugas-tugas rutin dan pembaruan data turunan secara otomatis tanpa campur tangan manual.',
    example: 'Membuat daftar belanjaan, memperbarui estimasi anggaran, serta memberi tahu anggota keluarga.'
  },
  {
    number: 'V',
    title: 'Pangkas Beban Kognitif',
    description: 'Menghasilkan kepastian, kejelasan informasi, dan kebebasan dari pelacakan manual yang melelahkan.',
    example: 'Satu tindakan selesai. Seluruh sistem turunan langsung tersinkronisasi dan siap digunakan.'
  }
];

export const PRODUCTS_ID: Product[] = [
  // Personal Life
  {
    id: 'saturumah',
    name: 'SatuRumah',
    category: 'Personal Life',
    status: 'Daily Driver',
    domain: 'saturumah.pages.dev',
    liveUrl: 'https://saturumah.pages.dev',
    tagline: 'Satu rumah. Satu pusat kendali terpadu.',
    description: 'Mesin pengelolaan rumah tangga terpadu yang menghubungkan pelacakan stok dapur, perencana menu masakan, daftar belanjaan, hingga keuangan bersama dalam satu alur kerja yang rapi.',
    workflow: ['Bahan Belanja', 'Stok Dapur', 'Rencana Menu', 'Daftar Belanja', 'Keuangan', 'Anggaran'],
    connectedTo: ['everafter', 'our', 'littlebetter'],
    architectureNote: 'Pusat kendali rumah tangga yang mengelola data lintas fungsi seperti Pengeluaran Bersama, Stok Kebutuhan, dan Jadwal Keluarga.',
    workflowDetails: [
      { stage: 'Bahan Belanja', input: 'Pemindaian struk toko atau entri cepat', output: 'Pembaruan data persediaan', automationNote: 'Mengkategorikan barang & mengestimasi masa simpan' },
      { stage: 'Stok Dapur', input: 'Bahan makanan digunakan', output: 'Jumlah stok diperbarui', automationNote: 'Peringatan otomatis saat persediaan menipis' },
      { stage: 'Rencana Menu', input: 'Pemilihan menu mingguan', output: 'Daftar bahan yang belum tersedia', automationNote: 'Memeriksa ketersediaan stok di dapur secara langsung' },
      { stage: 'Daftar Belanja', input: 'Daftar belanja otomatis', output: 'Belanja lebih cepat dan terarah', automationNote: 'Mengelompokkan barang berdasarkan tata letak toko' },
      { stage: 'Keuangan', input: 'Transaksi pembelian', output: 'Catatan debit pembukuan', automationNote: 'Membagi biaya sesuai kesepakatan rumah tangga' },
      { stage: 'Anggaran', input: 'Sinkronisasi pengeluaran bulanan', output: 'Analisis variansi anggaran', automationNote: 'Proyeksi cadangan dana akhir bulan' }
    ]
  },
  {
    id: 'everafter',
    name: 'EverAfter',
    category: 'Personal Life',
    status: 'Daily Driver',
    domain: 'everafter-os.pages.dev',
    liveUrl: 'https://everafter-os.pages.dev',
    tagline: 'Mewujudkan momen penting tanpa kerepotan puluhan spreadsheet.',
    description: 'Platform manajemen acara dan momen berharga. Mengalirkan konfirmasi kehadiran (RSVP) langsung ke denah tempat duduk, kebutuhan diet tamu, kontrak vendor, dan pembukuan anggaran.',
    workflow: ['RSVP', 'Data Tamu', 'Anggaran', 'Jadwal Acara'],
    connectedTo: ['saturumah'],
    architectureNote: 'Menghubungkan keuangan acara dan rencana rumah tangga langsung ke pembukuan utama SatuRumah setelah acara selesai.',
    workflowDetails: [
      { stage: 'RSVP', input: 'Konfirmasi kehadiran tamu', output: 'Status tamu terverifikasi', automationNote: 'Mencatat preferensi makanan & detail pendamping' },
      { stage: 'Data Tamu', input: 'Penataan meja & tempat duduk', output: 'Peta lokasi terbarukan', automationNote: 'Memastikan aksesibilitas dan kenyamanan tamu' },
      { stage: 'Anggaran', input: 'Pembayaran DP / termin vendor', output: 'Grafik alokasi anggaran', automationNote: 'Memantau komitmen dana terbayar vs sisa' },
      { stage: 'Jadwal Acara', input: 'Rundown acara dari vendor', output: 'Agenda utama tersinkronisasi', automationNote: 'Mengirimkan pembaruan waktu otomatis ke seluruh tim vendor' }
    ]
  },
  {
    id: 'our',
    name: 'OUR',
    category: 'Personal Life',
    status: 'Daily Driver',
    tagline: 'Satu keluarga. Satu ruang arsip yang aman.',
    description: 'Arsip keluarga privat dan brankas dokumen tersandi yang mengorganisir berkas hukum, sejarah keluarga, sertifikat aset, dan kenangan penting dalam repositori yang teratur dan aman.',
    workflow: ['Pencatatan', 'Brankas', 'Akses', 'Garis Waktu'],
    connectedTo: [],
    architectureNote: 'Lapisan penyimpanan tersandi berkeamanan tinggi yang terintegrasi dengan hak akses keluarga dari SatuRumah.',
    workflowDetails: [
      { stage: 'Pencatatan', input: 'Berkas keluarga atau catatan aset', output: 'Data tersandi aman', automationNote: 'Membaca metadata & melabeli jenis dokumen' },
      { stage: 'Brankas', input: 'Indeks dokumen teratur', output: 'Awan penyimpanan tersandi', automationNote: 'Menerapkan token akses kriptografi' },
      { stage: 'Akses', input: 'Pemberian izin berbasis peran', output: 'Tautan akses terbatas waktu', automationNote: 'Mencatat jejak audit untuk situasi darurat' },
      { stage: 'Garis Waktu', input: 'Penanda peristiwa penting', output: 'Garis waktu antar-generasi', automationNote: 'Mengingatkan tanggal perpanjangan paspor & dokumen' }
    ]
  },
  {
    id: 'littlebetter',
    name: 'LittleBetter',
    category: 'Personal Life',
    status: 'Daily Driver',
    tagline: 'Menjaga kesehatan tanpa terasa seperti administrasi rumit.',
    description: 'Ruang kerja kesehatan pribadi dan riwayat medis. Mengintegrasikan jadwal dokter, resep obat, indikator harian, dan tren diagnostik jangka panjang.',
    workflow: ['Jurnal Kesehatan', 'Riwayat Medis', 'Rutinitas', 'Analisis Tren'],
    connectedTo: ['getaway'],
    architectureNote: 'Memantau rutinitas kesehatan dan mengalirkan pertimbangan nutrisi/medis ke perencana menu masakan dan perjalanan.',
    workflowDetails: [
      { stage: 'Jurnal Kesehatan', input: 'Hasil lab, gejala, atau TTD', output: 'Rekam medis terpadu', automationNote: 'Menyelaraskan satuan pengukuran laboratorium' },
      { stage: 'Riwayat Medis', input: 'Ringkasan konsultasi dokter', output: 'Entri garis waktu terstruktur', automationNote: 'Mencatat rencana tindak lanjut & perubahan resep' },
      { stage: 'Rutinitas', input: 'Minum obat / aktivitas harian', output: 'Log kepatuhan rutinitas', automationNote: 'Menyesuaikan jadwal pengingat secara dinamis' },
      { stage: 'Analisis Tren', input: 'Data kesehatan agregat', output: 'Wawasan & ringkasan tren', automationNote: 'Menyoroti perkembangan kesehatan jangka panjang' }
    ]
  },
  {
    id: 'getaway',
    name: 'GetAway',
    category: 'Personal Life',
    status: 'Live',
    isSubdued: false,
    domain: 'getaway-os.pages.dev',
    liveUrl: 'https://getaway-os.pages.dev',
    tagline: 'Perencanaan lebih ringkas. Pengalaman lebih kaya.',
    description: 'Asisten perjalanan kontekstual yang mengubah reservasi tiket dan hotel menjadi tenggat perjalanan dinamis, peta navigasi offline, dan pembagian biaya mata uang asing otomatis.',
    workflow: ['Reservasi', 'Itinerary', 'Rute Peta', 'Pembagian Biaya'],
    connectedTo: [],
    architectureNote: 'Mengintegrasikan preferensi kesehatan dari LittleBetter dan menyinkronkan pengeluaran perjalanan kembali ke SatuRumah.',
    workflowDetails: [
      { stage: 'Reservasi', input: 'Email konfirmasi pemesanan', output: 'Objek perjalanan terstruktur', automationNote: 'Mengekstrak nomor penerbangan, waktu & kode booking' },
      { stage: 'Itinerary', input: 'Rencana aktivitas harian', output: 'Matriks perjalanan interaktif', automationNote: 'Penyesuaian otomatis waktu transit & zona waktu' },
      { stage: 'Rute Peta', input: 'Koordinat lokasi tujuan', output: 'Dataset peta offline', automationNote: 'Mengunduh peta & titik lokasi penting terlebih dahulu' },
      { stage: 'Pembagian Biaya', input: 'Struk mata uang asing', output: 'Pembukuan kurs real-time', automationNote: 'Kalkulasi pembagian biaya yang adil untuk seluruh anggota' }
    ]
  },

  // Professional Life
  {
    id: 'dayone',
    name: 'DayOne',
    category: 'Professional Life',
    status: 'In Development',
    tagline: 'Produktivitas kerja yang mengalir selaras dengan fokus alami.',
    description: 'Ruang kerja peka-konteks yang mengorganisir sesi kerja mendalam (deep work), peta jalan proyek, repositori kode, dan dokumentasi berdasarkan ritme fokus harian.',
    workflow: ['Pencatatan', 'Konteks', 'Eksekusi', 'Arsip'],
    connectedTo: ['forge'],
    architectureNote: 'Lapisan produktivitas personal yang menopang alur rekayasa produk dan hasil karya individu.'
  },
  {
    id: 'forge',
    name: 'Forge',
    category: 'Professional Life',
    status: 'Future',
    tagline: 'Dirancang untuk fase berikutnya. Hadir saat studio berkembang.',
    description: 'Kerangka kerja pengembangan studio untuk pembuatan produk perangkat lunak, otomatisasi rilis, sistem desain produk, dan manajemen penyampaian klien.',
    workflow: ['Sistem Desain', 'Pipeline CI/CD', 'Studio Rilis', 'Analitik'],
    connectedTo: ['align'],
    architectureNote: 'Lapisan manajemen studio masa depan yang dirancang untuk menskalakan pengembangan perangkat lunak mandiri.'
  },
  {
    id: 'align',
    name: 'Align',
    category: 'Professional Life',
    status: 'Future',
    tagline: 'Disiapkan untuk saat perusahaan membutuhkan alur tata kelola yang teratur.',
    description: 'Platform penyelarasan organisasi yang menghubungkan visi strategis produk dengan eksekusi tim, metrik operasional, dan keputusan yang terdokumentasi.',
    workflow: ['Visi', 'Target Utama', 'Matriks Tim', 'Hasil Nyata'],
    connectedTo: [],
    architectureNote: 'Lapisan tata kelola organisasi masa depan untuk perusahaan perangkat lunak berkepercayaan tinggi.'
  }
];

export const PRINCIPLES_ID: PrincipleData[] = [
  {
    title: 'Alur Kerja Utama',
    subtitle: 'Konteks Di Atas Fitur',
    description: 'Perangkat lunak harus mencerminkan cara manusia bekerja di dunia nyata, bukan memaksa orang mengikuti struktur basis data yang kaku.'
  },
  {
    title: 'Otomasi Sejak Awal',
    subtitle: 'Bebas Kerepotan Rutin',
    description: 'Jika suatu kalkulasi, sinkronisasi, atau format data bisa diselesaikan secara algoritmis, sistem akan menjalankannya secara instan.'
  },
  {
    title: 'Satu Sumber Kebenaran',
    subtitle: 'Tanpa Duplikasi Data',
    description: 'Setiap informasi hanya memiliki satu titik otoritatif dalam ekosistem, dapat diakses di seluruh aplikasi tanpa perlu salinan manual.'
  },
  {
    title: 'Siap Tanpa Koneksi',
    subtitle: 'Desain Tangguh',
    description: 'Fungsi utama berjalan lancar tanpa bergantung pada jaringan internet. Data lokal tetap menjadi pemegang otoritas utama.'
  },
  {
    title: 'Berpusat pada Manusia',
    subtitle: 'Tenang & Jernih',
    description: 'Bebas dari notifikasi bising, trik retensi, atau gangguan. Perangkat lunak adalah alat tenang yang hadir saat dibutuhkan dan menyingkir saat selesai.'
  },
  {
    title: 'Bantuan AI Terukur',
    subtitle: 'Peningkatan Halus',
    description: 'Kecerdasan buatan diterapkan secara presisi pada titik hambatan—merangkum data, merapikan masakan acak, dan memprediksi langkah berikutnya.'
  }
];

export const PERSONAL_ECOSYSTEM_NODES_ID: EcosystemMapNode[] = [
  {
    id: 'everafter',
    name: 'EverAfter',
    status: 'Daily Driver',
    category: 'Personal',
    role: 'Manajemen Acara Momen Penting',
    tagline: 'Mesin Perencanaan Pernikahan & Acara',
    domain: 'everafter-os.pages.dev',
    liveUrl: 'https://everafter-os.pages.dev',
    connectsTo: ['saturumah'],
    connectedFrom: [],
    level: 1
  },
  {
    id: 'saturumah',
    name: 'SatuRumah',
    status: 'Daily Driver',
    category: 'Personal',
    role: 'Pusat Operasional Rumah Tangga',
    tagline: 'Pusat Operasi & Pembukuan Rumah',
    domain: 'saturumah.pages.dev',
    liveUrl: 'https://saturumah.pages.dev',
    connectsTo: ['our', 'littlebetter'],
    connectedFrom: ['everafter'],
    level: 2
  },
  {
    id: 'our',
    name: 'OUR',
    status: 'Live',
    category: 'Personal',
    role: 'Arsip Keluarga & Brankas Dokumen',
    tagline: 'Repositori Berkas Keluarga',
    connectsTo: [],
    connectedFrom: ['saturumah'],
    level: 3
  },
  {
    id: 'littlebetter',
    name: 'LittleBetter',
    status: 'Daily Driver',
    category: 'Personal',
    role: 'Catatan Kesehatan & Kesejahteraan',
    tagline: 'Pusat Rekam Medis Pribadi',
    connectsTo: ['getaway'],
    connectedFrom: ['saturumah'],
    level: 3
  },
  {
    id: 'getaway',
    name: 'GetAway',
    status: 'Live',
    category: 'Personal',
    role: 'Asisten Perjalanan Kontekstual',
    tagline: 'Mesin Itinerary & Navigasi',
    domain: 'getaway-os.pages.dev',
    liveUrl: 'https://getaway-os.pages.dev',
    connectsTo: [],
    connectedFrom: ['littlebetter'],
    level: 4
  }
];

export const PROFESSIONAL_ECOSYSTEM_NODES_ID: EcosystemMapNode[] = [
  {
    id: 'dayone',
    name: 'DayOne',
    status: 'In Development',
    category: 'Professional',
    role: 'Produktivitas Personal',
    tagline: 'Ruang Kerja Peka Konteks',
    connectsTo: ['forge'],
    connectedFrom: [],
    level: 1
  },
  {
    id: 'forge',
    name: 'Forge',
    status: 'Future',
    category: 'Professional',
    role: 'Infrastruktur Pengembangan Studio',
    tagline: 'Fondasi Studio Mandiri',
    connectsTo: ['align'],
    connectedFrom: ['dayone'],
    level: 2
  },
  {
    id: 'align',
    name: 'Align',
    status: 'Future',
    category: 'Professional',
    role: 'Penyelarasan Organisasi',
    tagline: 'Mesin Tata Kelola Strategis',
    connectsTo: [],
    connectedFrom: ['forge'],
    level: 3
  }
];
