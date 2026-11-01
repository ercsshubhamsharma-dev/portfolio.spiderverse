import {
  Project,
  SkillCategory,
  VisualExperiment,
  Achievement,
  EducationItem,
  CertificationItem,
  MultiverseTheme,
} from '../types';

export const PERSONAL_INFO = {
  name: 'Shubham Sharma',
  role: 'Creative Developer & Aspiring Software Engineer',
  tagline: 'CODE IS LOGIC. DESIGN IS FEELING.',
  bio: 'An aspiring software developer exploring the intersection of technology, visual creativity, and interactive experiences. Developing foundational programming expertise in Python, Java, and modern web technologies while crafting cinematic, user-centric digital artifacts.',
  aboutIntroduction:
    'I’m a Computer Science Engineering student developing my programming skills while exploring visual design, creative tools, and interactive digital experiences. I enjoy experimenting with ideas and learning how technology can become more expressive through thoughtful design.',
  educationSummary: 'B.Tech Computer Science & Engineering (2023–2027), Ambalika Institute of Management and Technology, Lucknow',
  location: 'Lucknow, Uttar Pradesh, India',
  email: 'shubhamsharma10072005@gmail.com',
  github: 'https://github.com/ercsshubhamsharma-dev',
  linkedin: 'https://linkedin.com/in/shubham-sharma-005600287',
  leetcode: 'https://leetcode.com/u/shubhamsharma05102005',
  uploadedPortraitUrl: '/assets/aistudio/WhatsApp_Image_2026-10-31_at_8.46.27_PM__1__50f22a92.jpeg',
};

export const MULTIVERSE_THEMES: MultiverseTheme[] = [
  {
    id: 'miles-1610',
    name: 'Earth-1610 (Miles Morales)',
    universe: 'Universe 1610',
    primaryRed: '#e2252b',
    primaryBlue: '#00d4ff',
    accentGlow: 'rgba(226, 37, 43, 0.4)',
    bgDark: '#08080a',
    description: 'Electric red spray paint, neon cyan, Brooklyn skyline nights.',
  },
  {
    id: 'gwen-65',
    name: 'Earth-65 (Spider-Gwen)',
    universe: 'Universe 65',
    primaryRed: '#f43f5e',
    primaryBlue: '#22d3ee',
    accentGlow: 'rgba(244, 63, 94, 0.4)',
    bgDark: '#090812',
    description: 'Watercolor mood shifts, neon magenta, vivid turquoise rim lights.',
  },
  {
    id: 'prowler-42',
    name: 'Earth-42 (Prowler Dimension)',
    universe: 'Universe 42',
    primaryRed: '#9333ea',
    primaryBlue: '#10b981',
    accentGlow: 'rgba(147, 51, 234, 0.4)',
    bgDark: '#08060d',
    description: 'Menacing neon violet, electric synth emerald, deep shadows.',
  },
  {
    id: 'noir-90214',
    name: 'Earth-90214 (Spider-Man Noir)',
    universe: 'Universe 90214',
    primaryRed: '#eab308',
    primaryBlue: '#94a3b8',
    accentGlow: 'rgba(234, 179, 8, 0.3)',
    bgDark: '#070708',
    description: '1930s high-contrast charcoal monochrome with warm brass amber.',
  },
  {
    id: 'spider-2099',
    name: 'Earth-928 (Spider-Man 2099)',
    universe: 'Universe 928',
    primaryRed: '#ff334b',
    primaryBlue: '#3b82f6',
    accentGlow: 'rgba(255, 51, 75, 0.4)',
    bgDark: '#050711',
    description: 'Nueva York cyberpunk, geometric holographic crimson and cobalt.',
  },
];

export const REAL_PROJECTS: Project[] = [
  {
    id: 'student-management-system',
    title: 'Student Management System',
    subtitle: 'Academic Information & Records Management Platform',
    category: 'Software Application',
    timeline: '2024–2025',
    description:
      'A software application designed to organize, track, and manage student academic information, registration, enrollment records, and administrative workflows in a centralized structure.',
    problem:
      'Academic institutions often suffer from fragmented student record keeping, manual paper forms, and slow retrieval times during enrollment and grade audits.',
    objective:
      'Build a lightweight desktop application with intuitive data entry, search filters, reliable persistence, and instant record updates for institutional staff.',
    technologies: ['Python', 'Tkinter / GUI', 'SQLite', 'Data Structures (Lists, Tuples)', 'File I/O'],
    highlights: [
      'Structured database schema handling student roll numbers, branches, semesters, and contact records.',
      'Validation mechanisms preventing duplicate registrations and corrupt inputs.',
      'Filter and search engine allowing lookup by ID, department, or academic year.',
      'Modular code separating presentation logic from data access and file operations.',
    ],
    githubUrl: 'https://github.com/ercsshubhamsharma-dev',
    demoUrl: '#',
    isTeam: false,
    accentColor: '#e2252b',
  },
  {
    id: 'crickverse',
    title: 'CrickVerse',
    subtitle: 'Cricket Analytics & Match Simulation Concept',
    category: 'Interactive Application',
    timeline: '2025',
    description:
      'A cricket-themed academic and personal exploration combining match statistics calculation, ball-by-ball score tracking logic, and interactive player performance analytics.',
    problem:
      'Standard cricket score calculators are often dry spreadsheets without visual feedback, making it hard for fans and students to analyze runs per over and required run rates dynamically.',
    objective:
      'Develop an engaging system that models cricket innings, calculates live strike rates, economy figures, and run rates while exploring sports data visualization.',
    technologies: ['Python', 'Algorithm Logic', 'Conditional Flow', 'Loops & Lists', 'Interactive CLI / Web Concept'],
    highlights: [
      'Innings simulation algorithm factoring wickets, overs, extras, and boundary frequency.',
      'Mathematical run-rate calculator with predictive required-run-rate equations.',
      'Player profile matrix aggregating batting averages, strike rates, and bowling figures.',
      'Spider-Verse inspired visual scoreboard theme with high-contrast score cards.',
    ],
    githubUrl: 'https://github.com/ercsshubhamsharma-dev',
    demoUrl: '#',
    isTeam: false,
    accentColor: '#00d4ff',
  },
  {
    id: 'bank-management-system',
    title: 'Bank Management System',
    subtitle: 'Secure Account Lifecycle & Transaction Engine',
    category: 'Collaborative College Project',
    timeline: '2024',
    description:
      'A collaborative team-developed college project focused on foundational banking operations, account creation, secure deposit/withdrawal verification, balance inquiries, and audit logging.',
    problem:
      'Managing transactional consistency, preventing overdrafts, and enforcing role separation between customer queries and managerial administrative actions.',
    objective:
      'Engineer a secure terminal/GUI application with strict state validation, credential verification, and structured ledger tracking built collaboratively with college peers.',
    technologies: ['Python / Java', 'File Handling', 'Object-Oriented Design', 'Conditionals & Loops', 'Team Git Workflow'],
    highlights: [
      'Engineered core transaction processor with atomic balance deduction and credit verification.',
      'PIN authorization check with security attempt counters to prevent brute-force inquiries.',
      'Collaborated on module boundaries: account management, ledger logging, and report generation.',
      'Generated transaction history statements with timestamps and balance tracking.',
    ],
    githubUrl: 'https://github.com/ercsshubhamsharma-dev',
    demoUrl: '#',
    isTeam: true,
    teamSize: 'College Project Team',
    role: 'Core Developer (Logic & Transaction Validation)',
    accentColor: '#8b5cf6',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Foundational programming languages used for application logic, systems thinking, and algorithm development.',
    skills: [
      {
        name: 'Python',
        level: 'Basic / Intermediate Student Level',
        tags: ['Functions', 'OOP Concepts', 'Data Processing', 'Automation'],
        snippet: 'def calculate_run_rate(runs: int, balls: int) -> float:\n    overs = balls // 6 + (balls % 6) / 6\n    return round(runs / overs, 2) if overs > 0 else 0.0',
      },
      {
        name: 'Java',
        level: 'Academic Core',
        tags: ['Classes & Objects', 'Inheritance', 'Control Structures', 'Standard Lib'],
        snippet: 'public class StudentAccount {\n    private String studentId;\n    private double academicScore;\n    // Core enterprise principles\n}',
      },
    ],
  },
  {
    title: 'Web Technologies',
    description: 'Building clean, semantic web layouts and styling user interfaces with precision.',
    skills: [
      {
        name: 'HTML',
        level: 'Semantic Markup',
        tags: ['HTML5 Standards', 'Accessibility Elements', 'Forms & Inputs', 'Document Trees'],
        snippet: '<article class="spider-card" data-universe="1610">\n  <header><h1>Multiverse</h1></header>\n</article>',
      },
      {
        name: 'CSS',
        level: 'Modern Styling',
        tags: ['Flexbox & Grid', 'Animations & Keyframes', 'Custom Properties', 'Responsive Design'],
        snippet: '.web-mesh {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}',
      },
    ],
  },
  {
    title: 'Computer Science Fundamentals',
    description: 'The core building blocks of algorithmic logic and data representation.',
    skills: [
      {
        name: 'Variables & Data Types',
        level: 'Foundational Mastery',
        tags: ['Integers', 'Floats', 'Strings', 'Booleans', 'Type Casting'],
      },
      {
        name: 'Conditional Statements',
        level: 'Foundational Mastery',
        tags: ['if / elif / else', 'Switch / Branching', 'Boolean Logic', 'Nested Guards'],
      },
      {
        name: 'Loops & Iteration',
        level: 'Foundational Mastery',
        tags: ['for loops', 'while loops', 'Enumeration', 'Break & Continue'],
      },
      {
        name: 'Lists & Arrays',
        level: 'Foundational Mastery',
        tags: ['Dynamic indexing', 'Slicing', 'List Comprehensions', 'Mutations'],
      },
      {
        name: 'Tuples & Immutability',
        level: 'Foundational Mastery',
        tags: ['Immutable sequences', 'Packing & Unpacking', 'Coordinate Pairs', 'Dictionary Keys'],
      },
    ],
  },
  {
    title: 'Creative & Development Tools',
    description: 'Tools for visual prototyping, code editing, and leveraging modern developer assistants.',
    skills: [
      {
        name: 'Canva',
        level: 'Visual Design & Layout',
        tags: ['Poster Compositions', 'Color Harmony', 'Typography', 'Social Graphics'],
      },
      {
        name: 'Adobe Photoshop',
        level: 'Digital Editing & Manipulation',
        tags: ['Layer Blending', 'Halftone Textures', 'Masking', 'Color Grading'],
      },
      {
        name: 'Visual Studio Code',
        level: 'Primary IDE',
        tags: ['Extensions', 'Debugging', 'Terminal Workflows', 'Git Integration'],
      },
      {
        name: 'Claude & AI Tools',
        level: 'AI-Augmented Engineering',
        tags: ['Prompt Engineering', 'Code Architecture', 'Pair Programming', 'Creative Brainstorming'],
      },
    ],
  },
];

export const VISUAL_EXPERIMENTS: VisualExperiment[] = [
  {
    id: 'exp-1',
    title: 'Spider-Verse Halftone & Dot Matrix',
    category: 'Visual & Shader Study',
    description: 'An interactive simulation of vintage comic print halftone rasterization combined with digital RGB chromatic aberration splitting.',
    technologies: ['HTML5 Canvas', 'Math.sin/cos', 'Color Channel Separation'],
    interactiveType: 'halftone',
    label: 'Lab Experiment #01',
  },
  {
    id: 'exp-2',
    title: 'Kinetic Variable Typography',
    category: 'Editorial Interaction',
    description: 'Dynamic character skew and letter spacing responsive to cursor proximity, inspired by Spider-Verse title card collision graphics.',
    technologies: ['CSS Transforms', 'Pointer Coordinates', 'Framer Motion Spring'],
    interactiveType: 'kinetic-type',
    label: 'Lab Experiment #02',
  },
  {
    id: 'exp-3',
    title: 'Dual-Channel Red-Blue Lighting',
    category: 'Lighting & Chromatic Optics',
    description: 'Simulating opposite cinematic key lights: warm crimson photon falloff paired against cold cyan rim shadows in 2.5D space.',
    technologies: ['Linear Gradients', 'Blend Modes', 'Coordinate Tracking'],
    interactiveType: 'red-blue',
    label: 'Lab Experiment #03',
  },
  {
    id: 'exp-4',
    title: 'Abstract 3D Torus Web Lattice',
    category: '3D Geometry',
    description: 'Mathematical parametric torus knot rendered as a high-density wireframe web structure orbiting in real time.',
    technologies: ['Three.js', 'Parametric Geometry', 'Wireframe PBR'],
    interactiveType: '3d-torus',
    label: 'Lab Experiment #04',
  },
  {
    id: 'exp-5',
    title: 'Lichtenstein Comic Panel Shading',
    category: 'Pop Art & Comic Art',
    description: 'Algorithmic dot screening and bold black vector inking generating authentic comic book print aesthetics.',
    technologies: ['Procedural SVG', 'Halftone Screening', 'Dynamic Density'],
    interactiveType: 'comic-panel',
    label: 'Lab Experiment #05',
  },
  {
    id: 'exp-6',
    title: 'Cybernetic Web-Shooter HUD',
    category: 'UI/UX Concept',
    description: 'Futuristic augmented-reality targeting reticle and web-fluid pressure telemetry HUD inspired by Spider-Man 2099 and Miles Morales.',
    technologies: ['SVG Geometry', 'Real-time State', 'Sound Synthesizer'],
    interactiveType: 'hud-shooter',
    label: 'Lab Experiment #06',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: '3x Gold Medals in Singing',
    category: 'singing',
    event: 'Inter-College Singing Competitions',
    level: 'Inter-College / University Level',
    medal: 'gold',
    count: 3,
    description:
      'Won three first-place Gold Medals across inter-college vocal performance and singing competitions, demonstrating classical pitch control, stage presence, and musical phrasing.',
    icon: 'Music',
  },
  {
    id: 'ach-2',
    title: 'Badminton Gold & Silver Medals',
    category: 'sports',
    event: 'Inter-College Badminton Championships',
    level: 'Inter-College Sports Tournament',
    medal: 'gold',
    count: 2,
    description:
      'Secured 1 Gold Medal and 1 Silver Medal in competitive inter-college badminton tournaments, showcasing agility, strategic court coverage, and athletic discipline.',
    icon: 'Trophy',
  },
  {
    id: 'ach-3',
    title: 'College Singing Coordinator',
    category: 'leadership',
    event: 'AIMT Cultural Committee',
    level: 'Institutional Leadership',
    description:
      'Appointed as the official College Singing Coordinator, organizing vocal auditions, conducting student practice sessions, and orchestrating stage performances for annual cultural festivals.',
    icon: 'Mic',
  },
  {
    id: 'ach-4',
    title: 'Discipline Volunteer for College Activities',
    category: 'leadership',
    event: 'College Campus Operations & Mega Events',
    level: 'Institutional Service',
    description:
      'Served as a core student discipline volunteer, coordinating crowd logistics, maintaining security protocols, and supporting seamless execution for academic conclaves and cultural fests.',
    icon: 'ShieldCheck',
  },
  {
    id: 'ach-5',
    title: 'Cricket, Badminton & Creative Interests',
    category: 'interest',
    event: 'Personal Passion & Recreation',
    level: 'Lifelong Pursuit',
    description:
      'Passionate cricket enthusiast and analytical follower of match strategies, avid badminton player, and music lover with deep appreciation for sound design and composition.',
    icon: 'Activity',
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Ambalika Institute of Management and Technology (AIMT)',
    location: 'Lucknow, Uttar Pradesh, India',
    period: '2023 – 2027',
    status: 'Currently Pursuing (Year 2 / 3)',
    details: [
      'Core coursework: Data Structures, Object-Oriented Programming, Computer Organization, Database Systems, Web Technologies.',
      'Active participant in cultural, technical, and sports events representing the college.',
      'Serving as Singing Coordinator and Discipline Volunteer for major campus events.',
    ],
    highlight: 'Major in Computer Science & Engineering',
  },
  {
    id: 'edu-2',
    degree: 'Intermediate (Class XII) — Science Stream',
    institution: 'Senior Secondary School Education',
    location: 'Lucknow, Uttar Pradesh',
    period: 'Completed 2023',
    status: 'Completed with Strong Foundations',
    details: [
      'Rigorous foundation in Physics, Chemistry, and Mathematics (PCM).',
      'Developed analytical problem-solving skills and early interest in software logic.',
    ],
  },
  {
    id: 'edu-3',
    degree: 'High School (Class X)',
    institution: 'Secondary School Education',
    location: 'Lucknow, Uttar Pradesh',
    period: 'Completed 2021',
    status: 'Completed with Distinction',
    details: [
      'Comprehensive foundation across Science, Mathematics, English, and Social Studies.',
      'Active participant in inter-school cultural, athletic, and musical events.',
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Python 3.4.3 Training',
    issuer: 'Spoken Tutorial Project, IIT Bombay / EduPyramids',
    issueDate: '25 November 2025',
    score: '75%',
    credits: 4,
    verified: true,
    topics: [
      'Variables, Data Types, Control Flow',
      'Loops, Lists, Tuples, Dictionaries',
      'Functions, Modules & Scripting',
      'Algorithmic Problem Solving in Python',
    ],
  },
  {
    id: 'cert-2',
    title: 'Industrial Visit Certificate',
    issuer: 'Barrownz Learning Academy',
    issueDate: '06 March 2025',
    verified: true,
    topics: [
      'Software Industry Lifecycle & Agile Workflows',
      'Enterprise Technology Architecture',
      'Professional Development & Industry Readiness',
      'Real-world Project Deployment Pipelines',
    ],
  },
];

export const LEARNING_TIMELINE = [
  {
    year: '2023',
    title: 'The Spark & Genesis',
    subtitle: 'Enrolled in B.Tech CSE at AIMT, Lucknow',
    description:
      'Began academic journey into computer science. Mastered fundamental programming logic, variables, conditionals, loops, and algorithmic problem-solving.',
    tags: ['C / Python Basics', 'AIMT Lucknow', 'Singing Gold Medalist'],
  },
  {
    year: '2024',
    title: 'Object-Oriented Logic & Team Systems',
    subtitle: 'Bank Management System & Web Exploration',
    description:
      'Collaborated on the college Bank Management System project. Explored Java object-oriented principles, modular architecture, and HTML/CSS styling.',
    tags: ['Java', 'HTML/CSS', 'Bank System', 'Badminton Medals'],
  },
  {
    year: '2025',
    title: 'Industry Exposure & Python Certification',
    subtitle: 'IIT Bombay Certification (75%) & Barrownz Visit',
    description:
      'Completed comprehensive Python 3.4.3 certification from Spoken Tutorial (IIT Bombay) earning 4 credits with a 75% score. Completed industry immersion at Barrownz Learning Academy. Built Student Management System and CrickVerse.',
    tags: ['Python 75% Score', 'Barrownz Academy', 'CrickVerse', 'Student System'],
  },
  {
    year: '2026–2027',
    title: 'Creative Coding & Future Trajectory',
    subtitle: 'Interactive 3D, WebGL & Software Engineering',
    description:
      'Bridging technical software development with creative digital art, 3D WebGL experiences, and high-performance interactive web design.',
    tags: ['Spider-Verse Portfolio', 'Three.js / 3D', 'Full-Stack Aspirations'],
  },
];
