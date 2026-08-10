import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  MANTRA_STAGES,
  ENGINE_STAGES,
  PRODUCTS,
  PRINCIPLES,
  PERSONAL_ECOSYSTEM_NODES,
  PROFESSIONAL_ECOSYSTEM_NODES
} from '../data/studioData';
import {
  MANTRA_STAGES_ID,
  ENGINE_STAGES_ID,
  PRODUCTS_ID,
  PRINCIPLES_ID,
  PERSONAL_ECOSYSTEM_NODES_ID,
  PROFESSIONAL_ECOSYSTEM_NODES_ID
} from '../data/studioDataID';
import { Product, MantraStageData, EngineStageData, PrincipleData, EcosystemMapNode } from '../types';

export type Language = 'en' | 'id';

interface Translations {
  navbar: {
    architecture: string;
    philosophy: string;
    products: string;
    principles: string;
    contact: string;
  };
  hero: {
    identityBadge: string;
    headlinePrefix: string;
    headlineHighlight: string;
    subheadline: string;
    exploreBtn: string;
    systemArch: string;
    corePremiseTitle: string;
    corePremiseText: string;
    foundingPrincipleLabel: string;
    foundingPrincipleVal: string;
    workflowArchLabel: string;
    workflowArchVal: string;
    figCaption: string;
    figSub: string;
  };
  mantra: {
    categoryBadge: string;
    title: string;
    subtitle: string;
    activeFocus: string;
    stageLabel: string;
    valueChainTitle: string;
    valueChainText: string;
  };
  why: {
    categoryBadge: string;
    title: string;
    lead1: string;
    lead2: string;
    domain1Title: string;
    domain1Desc: string;
    domain2Title: string;
    domain2Desc: string;
    domain3Title: string;
    domain3Desc: string;
    connectedDomainLabel: string;
    disconnectTitle: string;
    disconnectText: string;
    reconnectPrefix: string;
    reconnectHighlight: string;
  };
  workflowIntel: {
    categoryBadge: string;
    title: string;
    subtitle: string;
    activeProcessingLayer: string;
    engineStageLabel: string;
    concreteExampleLabel: string;
  };
  ecosystem: {
    categoryBadge: string;
    title: string;
    subtitle: string;
    tabPersonal: string;
    tabProfessional: string;
    hoverInstruction: string;
    centralHub: string;
    connectsToLabel: string;
    connectedFromLabel: string;
    roleLabel: string;
  };
  productsSec: {
    categoryBadge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterPersonal: string;
    filterProfessional: string;
    connectedWorkflowChain: string;
    openProduct: string;
    statusLabels: Record<string, string>;
  };
  builtForMe: {
    categoryBadge: string;
    title: string;
    leadText: string;
    mainParagraph: string;
    quote: string;
    p1: string;
    p2: string;
    p3: string;
  };
  principlesSec: {
    categoryBadge: string;
    title: string;
    subtitle: string;
    ruleEnforced: string;
  };
  footer: {
    description: string;
    copyright: string;
    getInTouch: string;
    statement: string;
    identityTitle: string;
    ltstudioDesc: string;
    portfolioDesc: string;
    navTitle: string;
    portfolioLink: string;
    contactBtn: string;
  };
  contactModal: {
    modalTitle: string;
    modalSub: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    successTitle: string;
    successSub: string;
  };
  productModal: {
    close: string;
    statusLabel: string;
    categoryLabel: string;
    architectureNoteTitle: string;
    connectedWorkflowsTitle: string;
    singleInputTrigger: string;
    downstreamOutputResult: string;
    automationLogic: string;
    connectedNodesTitle: string;
    openAppNote: string;
  };
}

const translationsEN: Translations = {
  navbar: {
    architecture: 'Architecture',
    philosophy: 'Philosophy',
    products: 'Products',
    principles: 'Principles',
    contact: 'Get in Touch'
  },
  hero: {
    identityBadge: 'Identity / Product Philosophy',
    headlinePrefix: 'One action should benefit ',
    headlineHighlight: 'many workflows.',
    subheadline: 'A personal ecosystem of software built around how life actually flows.',
    exploreBtn: 'Explore the Ecosystem',
    systemArch: '[ System Architecture & Design ]',
    corePremiseTitle: 'Core Premise',
    corePremiseText: 'LTStudio establishes single touchpoints where data propagates contextually across life and work.',
    foundingPrincipleLabel: 'Founding Principle',
    foundingPrincipleVal: 'Zero Duplication',
    workflowArchLabel: 'Workflow Architecture',
    workflowArchVal: 'Automated Propagation',
    figCaption: 'FIG. 01 — ECOSYSTEM GRAPH',
    figSub: '1 INPUT → N WORKFLOWS'
  },
  mantra: {
    categoryBadge: 'SYSTEM PHILOSOPHY',
    title: 'THE LTSTUDIO MANTRA',
    subtitle: 'How a single simple entry cascades across an entire ecosystem.',
    activeFocus: 'Active Focus',
    stageLabel: 'STAGE',
    valueChainTitle: 'The Value Chain Generated:',
    valueChainText: 'One action creates connected data → connected data enables automation → automation eliminates cognitive load.'
  },
  why: {
    categoryBadge: 'PROBLEM & APPROACH',
    title: 'WHY LTSTUDIO EXISTS',
    lead1: 'Most software solves one task.',
    lead2: 'Your life and work are interconnected.',
    domain1Title: 'Household Finance',
    domain1Desc: 'Groceries, recurring bills, and future budgets update the same underlying ledger automatically.',
    domain2Title: 'Milestones & Timelines',
    domain2Desc: 'Life events, guest lists, and preparation tasks flow without separate spreadsheets.',
    domain3Title: 'Health & Daily Life',
    domain3Desc: 'Medical history, nutrition needs, and travel routines inform each other naturally.',
    connectedDomainLabel: 'Connected Domain',
    disconnectTitle: 'The Fundamental Disconnect',
    disconnectText: 'Most software forces you to act as the human middleware—copying dates, manually calculating budgets, and re-entering the same information across isolated apps. This creates friction, fatigue, and error.',
    reconnectPrefix: 'LTStudio exists to ',
    reconnectHighlight: 'reconnect them.'
  },
  workflowIntel: {
    categoryBadge: 'INTELLIGENCE ENGINE',
    title: 'WORKFLOW PROCESSING',
    subtitle: 'How the LTStudio engine translates a single input into broad systemic benefit.',
    activeProcessingLayer: 'Active Processing Layer',
    engineStageLabel: 'Engine Stage',
    concreteExampleLabel: 'Concrete Example'
  },
  ecosystem: {
    categoryBadge: 'ECOSYSTEM ARCHITECTURE',
    title: 'SYSTEM MAP',
    subtitle: 'Explore how every LTStudio product communicates and forms a cohesive whole.',
    tabPersonal: 'Personal Life Domain',
    tabProfessional: 'Professional Domain',
    hoverInstruction: 'Click or hover over any node to inspect data flow and system links.',
    centralHub: 'Central Hub',
    connectsToLabel: 'Connects To:',
    connectedFromLabel: 'Connected From:',
    roleLabel: 'Role:'
  },
  productsSec: {
    categoryBadge: 'PRODUCT CATALOG',
    title: 'PRODUCTS IN THE ECOSYSTEM',
    subtitle: 'Standalone products designed for targeted needs, made stronger when connected.',
    filterAll: 'All Products',
    filterPersonal: 'Personal Life',
    filterProfessional: 'Professional',
    connectedWorkflowChain: 'Connected Workflow Chain',
    openProduct: 'Open Product',
    statusLabels: {
      'Daily Driver': 'Daily Driver',
      'Live': 'Live',
      'In Development': 'In Development',
      'Future': 'Future Stage'
    }
  },
  builtForMe: {
    categoryBadge: 'ORIGIN STORY',
    title: 'Built For Me First',
    leadText: "LTStudio didn't begin as a commercial product roadmap.",
    mainParagraph: 'It started out of personal necessity. Whenever I notice repetitive work, I map the workflow, connect the moving pieces, and build software around it.',
    quote: 'If it becomes part of my daily life, it becomes part of LTStudio.',
    p1: "LTStudio doesn't begin with product ideas.",
    p2: 'It begins with everyday friction.',
    p3: 'Whenever I notice repetitive work, I map the workflow, connect the moving pieces, and build software around it.'
  },
  principlesSec: {
    categoryBadge: 'ARCHITECTURAL RULES',
    title: 'DESIGN PRINCIPLES',
    subtitle: 'Six foundational guidelines ensuring software remains calm, efficient, and respectful of human focus.',
    ruleEnforced: 'System Rule Enforced'
  },
  footer: {
    description: 'A personal product studio crafting connected software ecosystems where one action benefits every workflow.',
    copyright: 'All rights reserved. Designed with precision.',
    getInTouch: 'Get in Touch',
    statement: 'Software should adapt to people — not the other way around.',
    identityTitle: 'Identity Distinction',
    ltstudioDesc: 'Software systems for human workflows.',
    portfolioDesc: 'High-scale, resilient backend systems.',
    navTitle: 'Navigation',
    portfolioLink: 'Engineering Portfolio',
    contactBtn: 'Contact'
  },
  contactModal: {
    modalTitle: 'Get in Touch with LTStudio',
    modalSub: 'Have questions about system architecture, product collaboration, or workflow philosophy?',
    nameLabel: 'Your Name',
    namePlaceholder: 'e.g. Alex Morgan',
    emailLabel: 'Email Address',
    emailPlaceholder: 'e.g. alex@example.com',
    messageLabel: 'Message / Discussion Topic',
    messagePlaceholder: 'Tell us about your project or system inquiry...',
    sendBtn: 'Send Message',
    successTitle: 'Message Sent',
    successSub: 'Thank you for reaching out. We will get back to you shortly.'
  },
  productModal: {
    close: 'Close Inspector',
    statusLabel: 'Status',
    categoryLabel: 'Category',
    architectureNoteTitle: 'Ecosystem Architecture Note',
    connectedWorkflowsTitle: 'Connected Workflows in',
    singleInputTrigger: 'Single Input Trigger',
    downstreamOutputResult: 'Downstream Output Result',
    automationLogic: 'Automation & Connection Logic',
    connectedNodesTitle: 'Connected Nodes in Graph',
    openAppNote: 'Integrated into the primary LTStudio ecosystem runtime.'
  }
};

const translationsID: Translations = {
  navbar: {
    architecture: 'Arsitektur',
    philosophy: 'Filosofi',
    products: 'Produk Studio',
    principles: 'Prinsip Utama',
    contact: 'Hubungi Kami'
  },
  hero: {
    identityBadge: 'Identitas / Filosofi Produk',
    headlinePrefix: 'Satu aksi seharusnya memberi manfaat bagi ',
    headlineHighlight: 'banyak alur kerja.',
    subheadline: 'Ekosistem perangkat lunak personal yang dirancang selaras dengan ritme kehidupan nyata.',
    exploreBtn: 'Jelajahi Ekosistem',
    systemArch: '[ Arsitektur & Desain Sistem ]',
    corePremiseTitle: 'Premis Utama',
    corePremiseText: 'LTStudio menghadirkan satu titik temu utama tempat data terhubung dan mengalir secara kontekstual di seluruh ranah hidup dan pekerjaan.',
    foundingPrincipleLabel: 'Prinsip Dasar',
    foundingPrincipleVal: 'Tanpa Duplikasi',
    workflowArchLabel: 'Arsitektur Alur Kerja',
    workflowArchVal: 'Integrasi Otomatis',
    figCaption: 'FIG. 01 — GRAFIK EKOSISTEM',
    figSub: '1 AKSI → N ALUR KERJA'
  },
  mantra: {
    categoryBadge: 'FILOSOFI SISTEM',
    title: 'MANTRA LTSTUDIO',
    subtitle: 'Bagaimana satu entri sederhana berdampak pada seluruh ekosistem.',
    activeFocus: 'Fokus Aktif',
    stageLabel: 'TAHAP',
    valueChainTitle: 'Rantai Nilai yang Dihasilkan:',
    valueChainText: 'Satu aksi menghasilkan data terhubung → data terhubung mengaktifkan otomasi → otomasi memangkas beban mental secara signifikan.'
  },
  why: {
    categoryBadge: 'MASALAH & PENDEKATAN',
    title: 'MENGAPA LTSTUDIO ADA',
    lead1: 'Sebagian besar perangkat lunak hanya menyelesaikan satu tugas terisolasi.',
    lead2: 'Namun kehidupan dan pekerjaan kita saling terkait erat satu sama lain.',
    domain1Title: 'Keuangan Rumah Tangga',
    domain1Desc: 'Belanja harian, tagihan bulanan, dan anggaran masa depan secara otomatis memutakhirkan pembukuan yang sama.',
    domain2Title: 'Momen Penting & Jadwal',
    domain2Desc: 'Acara keluarga, daftar tamu, dan jadwal persiapan terhubung sistematis tanpa spreadsheet terpisah.',
    domain3Title: 'Kesehatan & Rutinitas',
    domain3Desc: 'Catatan medis, kebutuhan nutrisi, dan rutinitas harian saling menginformasikan untuk menjaga kualitas hidup.',
    connectedDomainLabel: 'Ranah Terhubung',
    disconnectTitle: 'Diskontinuitas yang Sering Terjadi',
    disconnectText: 'Aplikasi konvensional memaksa kita menjadi \'jembatan manual\'—memindahkan tanggal, menghitung anggaran secara manual, dan mengetik ulang data yang sama di berbagai aplikasi terpisah. Ini memicu kelelahan mental dan kesalahan.',
    reconnectPrefix: 'LTStudio hadir untuk ',
    reconnectHighlight: 'menghubungkan kembali semuanya.'
  },
  workflowIntel: {
    categoryBadge: 'MESIN INTELEJENSI',
    title: 'PEMROSESAN ALUR KERJA',
    subtitle: 'Bagaimana mesin LTStudio mengubah satu input sederhana menjadi dampak sistemik yang luas.',
    activeProcessingLayer: 'Lapisan Pemrosesan Aktif',
    engineStageLabel: 'Tahap Mesin',
    concreteExampleLabel: 'Contoh Nyata'
  },
  ecosystem: {
    categoryBadge: 'ARSITEKTUR EKOSISTEM',
    title: 'PETA RELASI SISTEM',
    subtitle: 'Jelajahi bagaimana setiap produk LTStudio saling berkomunikasi dan membentuk satu kesatuan yang utuh.',
    tabPersonal: 'Ranah Kehidupan Pribadi',
    tabProfessional: 'Ranah Kerja Profesional',
    hoverInstruction: 'Klik atau sorot modul untuk melihat alur data dan hubungan antar-sistem.',
    centralHub: 'Pusat Kendali Utama',
    connectsToLabel: 'Terhubung Ke:',
    connectedFromLabel: 'Menerima Data Dari:',
    roleLabel: 'Peran Sistem:'
  },
  productsSec: {
    categoryBadge: 'KATALOG PRODUK',
    title: 'PRODUK DALAM EKOSISTEM',
    subtitle: 'Perangkat lunak mandiri untuk kebutuhan spesifik, yang tumbuh lebih kuat saat terhubung.',
    filterAll: 'Semua Produk',
    filterPersonal: 'Kehidupan Pribadi',
    filterProfessional: 'Karya Profesional',
    connectedWorkflowChain: 'Rantai Alur Kerja Terhubung',
    openProduct: 'Buka Detail Produk',
    statusLabels: {
      'Daily Driver': 'Penggunaan Harian',
      'Live': 'Aktif',
      'In Development': 'Dalam Pengembangan',
      'Future': 'Tahap Masa Depan'
    }
  },
  builtForMe: {
    categoryBadge: 'KISAH AWAL',
    title: 'Dirancang Untuk Kebutuhan Nyata',
    leadText: 'LTStudio tidak berawal dari sekadar rencana produk komersial atau riset pasar.',
    mainParagraph: 'Ia lahir dari kebutuhan pribadi harian saya. Ketika melihat adanya pekerjaan berulang yang tidak efisien, saya memetakan alur kerjanya, menghubungkan setiap bagian, dan membangun perangkat lunak di sekitarnya.',
    quote: 'Jika sebuah perangkat lunak menjadi bagian dari kehidupan harian saya, maka ia menjadi bagian dari LTStudio.',
    p1: 'LTStudio tidak berawal dari gagasan produk biasa.',
    p2: 'Ia berawal dari hambatan dan friksi harian.',
    p3: 'Setiap kali menjumpai pekerjaan berulang, saya memetakan alur kerjanya, menghubungkan setiap bagian, dan membangun perangkat lunak di sekitarnya.'
  },
  principlesSec: {
    categoryBadge: 'ATURAN ARSITEKTUR',
    title: 'PRINSIP UTAMA DESAIN',
    subtitle: 'Enam prinsip mendasar yang memastikan perangkat lunak tetap tenang, efisien, dan menghargai fokus manusia.',
    ruleEnforced: 'Aturan Sistem Terterapkan'
  },
  footer: {
    description: 'Studio produk independen yang membangun ekosistem perangkat lunak terhubung, di mana satu aksi memberi manfaat bagi setiap alur kerja.',
    copyright: 'Hak cipta dilindungi. Dirancang dengan presisi.',
    getInTouch: 'Hubungi Kami',
    statement: 'Perangkat lunak seharusnya beradaptasi dengan manusia — bukan sebaliknya.',
    identityTitle: 'Pembeda Identitas',
    ltstudioDesc: 'Sistem perangkat lunak untuk alur kerja manusia.',
    portfolioDesc: 'Sistem backend berskala besar dan andal.',
    navTitle: 'Navigasi',
    portfolioLink: 'Portofolio Rekayasa',
    contactBtn: 'Kontak'
  },
  contactModal: {
    modalTitle: 'Hubungi LTStudio',
    modalSub: 'Ingin berdiskusi tentang arsitektur sistem, kolaborasi produk, atau filosofi alur kerja?',
    nameLabel: 'Nama Lengkap',
    namePlaceholder: 'mis. Budi Santoso',
    emailLabel: 'Alamat Email',
    emailPlaceholder: 'mis. budi@contoh.id',
    messageLabel: 'Pesan / Topik Diskusi',
    messagePlaceholder: 'Tuliskan pertanyaan atau ide proyek Anda di sini...',
    sendBtn: 'Kirim Pesan',
    successTitle: 'Pesan Terkirim',
    successSub: 'Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda.'
  },
  productModal: {
    close: 'Tutup Inspektur',
    statusLabel: 'Status',
    categoryLabel: 'Kategori',
    architectureNoteTitle: 'Catatan Arsitektur Ekosistem',
    connectedWorkflowsTitle: 'Alur Kerja Terhubung di',
    singleInputTrigger: 'Pemicu Input Tunggal',
    downstreamOutputResult: 'Hasil Output Turunan',
    automationLogic: 'Logika Otomasi & Integrasi',
    connectedNodesTitle: 'Node Terhubung dalam Grafik',
    openAppNote: 'Terintegrasi langsung ke dalam lingkungan ekosistem utama LTStudio.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  mantraStages: MantraStageData[];
  engineStages: EngineStageData[];
  products: Product[];
  principles: PrincipleData[];
  personalEcosystemNodes: EcosystemMapNode[];
  professionalEcosystemNodes: EcosystemMapNode[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = language === 'id' ? translationsID : translationsEN;
  const mantraStages = language === 'id' ? MANTRA_STAGES_ID : MANTRA_STAGES;
  const engineStages = language === 'id' ? ENGINE_STAGES_ID : ENGINE_STAGES;
  const products = language === 'id' ? PRODUCTS_ID : PRODUCTS;
  const principles = language === 'id' ? PRINCIPLES_ID : PRINCIPLES;
  const personalEcosystemNodes = language === 'id' ? PERSONAL_ECOSYSTEM_NODES_ID : PERSONAL_ECOSYSTEM_NODES;
  const professionalEcosystemNodes = language === 'id' ? PROFESSIONAL_ECOSYSTEM_NODES_ID : PROFESSIONAL_ECOSYSTEM_NODES;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        mantraStages,
        engineStages,
        products,
        principles,
        personalEcosystemNodes,
        professionalEcosystemNodes
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
