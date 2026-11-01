export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  timeline: string;
  description: string;
  problem: string;
  objective: string;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  isTeam?: boolean;
  teamSize?: string;
  role?: string;
  accentColor: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    tags: string[];
    snippet?: string;
  }[];
}

export interface VisualExperiment {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  interactiveType: 'halftone' | 'kinetic-type' | 'red-blue' | '3d-torus' | 'comic-panel' | 'hud-shooter';
  label: string; // e.g., 'Concept Study', 'Design Lab', 'Interactive Canvas'
}

export interface Achievement {
  id: string;
  title: string;
  category: 'singing' | 'sports' | 'leadership' | 'interest';
  event: string;
  level: string;
  medal?: 'gold' | 'silver' | 'bronze';
  count?: number;
  description: string;
  icon: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: string;
  details: string[];
  highlight?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  score?: string;
  credits?: number;
  credentialUrl?: string;
  topics: string[];
  verified: boolean;
}

export interface MultiverseTheme {
  id: string;
  name: string;
  universe: string;
  primaryRed: string;
  primaryBlue: string;
  accentGlow: string;
  bgDark: string;
  description: string;
}
