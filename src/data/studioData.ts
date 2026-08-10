import { Product, MantraStageData, EngineStageData, PrincipleData, EcosystemMapNode } from '../types';

export const MANTRA_STAGES: MantraStageData[] = [
  {
    number: '01',
    title: 'One Action',
    subtitle: 'Single Touchpoint',
    description: 'A single user input or event enters the ecosystem without requiring manual duplication across multiple apps.'
  },
  {
    number: '02',
    title: 'Connected Data',
    subtitle: 'Relational Graph',
    description: 'Information automatically routes and links to surrounding domain contexts—from pantry to finance, from calendar to health.'
  },
  {
    number: '03',
    title: 'Automated Workflows',
    subtitle: 'Zero Friction',
    description: 'Triggers, calculations, and schedule adjustments execute autonomously based on contextual relationships.'
  },
  {
    number: '04',
    title: 'Reduced Cognitive Load',
    subtitle: 'Clarity & Peace',
    description: 'The human mental effort shifts from managing individual tools to simply making informed decisions.'
  }
];

export const ENGINE_STAGES: EngineStageData[] = [
  {
    number: 'I',
    title: 'Input',
    description: 'Raw information enters the system via a single friction-free touchpoint.',
    example: 'Log a receipt, save a dish idea, or update a doctor note.'
  },
  {
    number: 'II',
    title: 'Understand Context',
    description: 'The engine interprets what that entry means in relation to active life contexts.',
    example: 'Identifies inventory changes, dietary needs, or calendar impacts.'
  },
  {
    number: 'III',
    title: 'Connect Everything',
    description: 'Related domain records link dynamically rather than remaining in isolated silos.',
    example: 'Connects grocery items to recipe planner, meal budget, and house ledger.'
  },
  {
    number: 'IV',
    title: 'Automate Workflow',
    description: 'Coordinating repetitive tasks and derivative updates occurs automatically.',
    example: 'Generates shopping list, updates budget variance, notifies household.'
  },
  {
    number: 'V',
    title: 'Reduce Cognitive Load',
    description: 'Resulting in quiet confidence, clarity, and zero manual mental tracking.',
    example: 'One action complete. All downstream systems synced and ready.'
  }
];

export const PRODUCTS: Product[] = [
  // Personal Life
  {
    id: 'saturumah',
    name: 'SatuRumah',
    category: 'Personal Life',
    status: 'Daily Driver',
    tagline: 'One home. One source of truth.',
    description: 'A unified household management engine that connects pantry tracking, meal planning, grocery inventory, and shared household finance into a seamless operational flow.',
    workflow: ['Groceries', 'Pantry', 'Meal Planner', 'Shopping', 'Finance', 'Budget'],
    connectedTo: ['everafter', 'our', 'littlebetter'],
    architectureNote: 'Central household hub handling cross-cutting state like Shared Expenses, Supply Inventory, and Household Schedules.',
    workflowDetails: [
      { stage: 'Groceries', input: 'Store receipt scan or bulk item add', output: 'Inventory record updated', automationNote: 'Categorizes items & estimates shelf-life' },
      { stage: 'Pantry', input: 'Pantry item consumed', output: 'Stock level updated', automationNote: 'Triggers low-stock threshold alert' },
      { stage: 'Meal Planner', input: 'Weekly meal selection', output: 'Missing ingredients list', automationNote: 'Cross-checks current pantry inventory' },
      { stage: 'Shopping', input: 'Auto-generated shopping list', output: 'Frictionless store run', automationNote: 'Groups items by store layout & preference' },
      { stage: 'Finance', input: 'Purchase transaction', output: 'Ledger debit record', automationNote: 'Splits costs according to household agreement' },
      { stage: 'Budget', input: 'Monthly expense sync', output: 'Budget variance analysis', automationNote: 'Projects end-of-month cashflow buffer' }
    ]
  },
  {
    id: 'everafter',
    name: 'EverAfter',
    category: 'Personal Life',
    status: 'Daily Driver',
    tagline: "Wedding planning shouldn't require ten spreadsheets.",
    description: 'An architectural event management platform for life milestones. Seamlessly flows guest RSVPs directly into seating charts, dietary logs, vendor contracts, and budget ledgers.',
    workflow: ['RSVP', 'Guest', 'Budget', 'Timeline'],
    connectedTo: ['saturumah'],
    architectureNote: 'Connects milestone finances and household planning directly into the central SatuRumah ledger once events complete.',
    workflowDetails: [
      { stage: 'RSVP', input: 'Digital guest response', output: 'Guest status confirmed', automationNote: 'Extracts meal preferences & plus-one details' },
      { stage: 'Guest', input: 'Seating & table assignment', output: 'Floorplan state updated', automationNote: 'Validates seating constraints and accessibility' },
      { stage: 'Budget', input: 'Vendor deposit / milestone fee', output: 'Budget allocation graph', automationNote: 'Tracks paid vs remaining commitments' },
      { stage: 'Timeline', input: 'Vendor run-of-show schedule', output: 'Synchronized master agenda', automationNote: 'Broadcasts time updates to vendors' }
    ]
  },
  {
    id: 'our',
    name: 'OUR',
    category: 'Personal Life',
    status: 'Daily Driver', // prompt notes "Live" status, let's keep exact 'Live'
    tagline: 'One family. One shared place.',
    description: 'A private family archive and secure document vault that organizes legal records, family history, asset deeds, and temporal milestones in an accessible encrypted repository.',
    workflow: ['Record', 'Vault', 'Access', 'Timeline'],
    connectedTo: [],
    architectureNote: 'High-security zero-knowledge storage layer linked with household permissions established in SatuRumah.',
    workflowDetails: [
      { stage: 'Record', input: 'Family document or asset record', output: 'Encrypted payload', automationNote: 'OCRs metadata & tags document type' },
      { stage: 'Vault', input: 'Secure index entry', output: 'Encrypted cloud storage', automationNote: 'Applies cryptographic access tokens' },
      { stage: 'Access', input: 'Role-based permission grant', output: 'Time-bounded access link', automationNote: 'Logs audit trail for emergency access' },
      { stage: 'Timeline', input: 'Milestone event tag', output: 'Generational chronological view', automationNote: 'Surfaces renewal dates for passports & deeds' }
    ]
  },
  {
    id: 'littlebetter',
    name: 'LittleBetter',
    category: 'Personal Life',
    status: 'Daily Driver',
    tagline: "Health shouldn't feel like paperwork.",
    description: 'A personal wellness and medical history workspace. Synthesizes medical appointments, prescription schedules, daily health metrics, and long-term diagnostic trends.',
    workflow: ['Health Log', 'Medical History', 'Routine', 'Analytics'],
    connectedTo: ['getaway'],
    architectureNote: 'Monitors routine wellness logs and feeds dietary/medical considerations into meal planners and travel itineraries.',
    workflowDetails: [
      { stage: 'Health Log', input: 'Vitals, symptoms, or lab results', output: 'Unified health record', automationNote: 'Normalizes laboratory unit measurements' },
      { stage: 'Medical History', input: 'Doctor consultation summary', output: 'Structured timeline entry', automationNote: 'Extracts follow-ups & prescription changes' },
      { stage: 'Routine', input: 'Daily medication / exercise', output: 'Habit compliance log', automationNote: 'Adjusts reminder schedules dynamically' },
      { stage: 'Analytics', input: 'Aggregated biometric signals', output: 'Trend insights & summaries', automationNote: 'Highlights longitudinal health improvements' }
    ]
  },
  {
    id: 'getaway',
    name: 'GetAway',
    category: 'Personal Life',
    status: 'In Development',
    isSubdued: true,
    tagline: 'Plan less. Experience more.',
    description: 'An intelligent travel contextualizer that transforms flight bookings and hotel reservations into dynamic itineraries, offline navigation maps, and automated multi-currency expense splits.',
    workflow: ['Booking', 'Itinerary', 'Route', 'Expense Split'],
    connectedTo: [],
    architectureNote: 'Integrates health travel requirements from LittleBetter and pushes trip expenses directly back into SatuRumah ledger.',
    workflowDetails: [
      { stage: 'Booking', input: 'Reservation confirmation email', output: 'Structured travel entity', automationNote: 'Parses flight numbers, times & confirmation codes' },
      { stage: 'Itinerary', input: 'Day-by-day activity node', output: 'Interactive travel matrix', automationNote: 'Accounts for transit time & local timezone shifts' },
      { stage: 'Route', input: 'Location coordinates', output: 'Offline map vector dataset', automationNote: 'Pre-downloads maps & key destination stops' },
      { stage: 'Expense Split', input: 'Foreign currency receipt', output: 'Real-time exchange ledger', automationNote: 'Calculates fair settlement shares for travel group' }
    ]
  },

  // Professional Life
  {
    id: 'dayone',
    name: 'DayOne',
    category: 'Professional Life',
    status: 'In Development',
    tagline: 'Personal productivity built around natural context.',
    description: 'A context-aware workspace that organizes deep work sessions, project roadmaps, code repositories, and documentation around natural focus state transitions.',
    workflow: ['Capture', 'Context', 'Execution', 'Archive'],
    connectedTo: ['forge'],
    architectureNote: 'The current personal productivity layer powering individual output and product engineering workflows.'
  },
  {
    id: 'forge',
    name: 'Forge',
    category: 'Professional Life',
    status: 'Future',
    tagline: 'Designed for the next chapter. Coming when my own studio grows.',
    description: 'A studio-building framework for multi-product software development, automated release pipelines, product design systems, and client delivery management.',
    workflow: ['Design System', 'CI/CD Pipeline', 'Release Studio', 'Analytics'],
    connectedTo: ['align'],
    architectureNote: 'Future studio management layer designed for scaling independent software ventures.'
  },
  {
    id: 'align',
    name: 'Align',
    category: 'Professional Life',
    status: 'Future',
    tagline: 'Waiting for the day I build a company that needs it.',
    description: 'An organizational alignment platform connecting strategic product vision with team execution, operational metrics, and automated decision records.',
    workflow: ['Vision', 'Objectives', 'Team Matrix', 'Outcomes'],
    connectedTo: [],
    architectureNote: 'Future organizational governance layer for high-trust software companies.'
  }
];

export const PRINCIPLES: PrincipleData[] = [
  {
    title: 'Workflow First',
    subtitle: 'Context Over Features',
    description: 'Software must model how human beings actually perform tasks in context, rather than forcing people to fit artificial database schemas.'
  },
  {
    title: 'Automation First',
    subtitle: 'Zero Tedium',
    description: 'If a calculation, synchronization, or formatting step can be determined algorithmically, the machine performs it instantly.'
  },
  {
    title: 'Single Source of Truth',
    subtitle: 'No Duplicate Data',
    description: 'Every piece of data lives in one authoritative node within the ecosystem, available across all connected applications without manual copying.'
  },
  {
    title: 'Offline Ready',
    subtitle: 'Resilient Design',
    description: 'Core functionality operates seamlessly without requiring persistent network connectivity. Local data state stays authoritative.'
  },
  {
    title: 'Human-Centered',
    subtitle: 'Quiet & Calm',
    description: 'No noisy notifications, gamification, or engagement loops. Software should serve as a quiet tool that gets out of the way.'
  },
  {
    title: 'AI Assisted',
    subtitle: 'Subtle Enhancement',
    description: 'Intelligence is applied strictly at points of friction—synthesizing data, extracting structure from unstructured inputs, and predicting next steps.'
  }
];

export const PERSONAL_ECOSYSTEM_NODES: EcosystemMapNode[] = [
  {
    id: 'everafter',
    name: 'EverAfter',
    status: 'Daily Driver',
    category: 'Personal',
    role: 'Milestone Event Management',
    tagline: 'Wedding & Event Engine',
    connectsTo: ['saturumah'],
    connectedFrom: [],
    level: 1
  },
  {
    id: 'saturumah',
    name: 'SatuRumah',
    status: 'Daily Driver',
    category: 'Personal',
    role: 'Central Household Hub',
    tagline: 'Household Core & Ledger',
    connectsTo: ['our', 'littlebetter'],
    connectedFrom: ['everafter'],
    level: 2
  },
  {
    id: 'our',
    name: 'OUR',
    status: 'Live',
    category: 'Personal',
    role: 'Family Archive & Vault',
    tagline: 'Family Document Repository',
    connectsTo: [],
    connectedFrom: ['saturumah'],
    level: 3
  },
  {
    id: 'littlebetter',
    name: 'LittleBetter',
    status: 'Daily Driver',
    category: 'Personal',
    role: 'Health & Wellness Log',
    tagline: 'Personal Medical Core',
    connectsTo: ['getaway'],
    connectedFrom: ['saturumah'],
    level: 3
  },
  {
    id: 'getaway',
    name: 'GetAway',
    status: 'In Development',
    category: 'Personal',
    role: 'Travel Contextualizer',
    tagline: 'Itinerary & Route Engine',
    connectsTo: [],
    connectedFrom: ['littlebetter'],
    level: 4
  }
];

export const PROFESSIONAL_ECOSYSTEM_NODES: EcosystemMapNode[] = [
  {
    id: 'dayone',
    name: 'DayOne',
    status: 'In Development',
    category: 'Professional',
    role: 'Personal Productivity',
    tagline: 'Context-Aware Workspace',
    connectsTo: ['forge'],
    connectedFrom: [],
    level: 1
  },
  {
    id: 'forge',
    name: 'Forge',
    status: 'Future',
    category: 'Professional',
    role: 'Studio-Building Layer',
    tagline: 'Independent Studio Infrastructure',
    connectsTo: ['align'],
    connectedFrom: ['dayone'],
    level: 2
  },
  {
    id: 'align',
    name: 'Align',
    status: 'Future',
    category: 'Professional',
    role: 'Organizational Alignment',
    tagline: 'Strategic Governance Engine',
    connectsTo: [],
    connectedFrom: ['forge'],
    level: 3
  }
];
