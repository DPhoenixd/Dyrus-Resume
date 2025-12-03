export interface PortfolioData {
  hero: {
    name: string;
    role: string;
    tagline: string;
    description: string;
    profileImage: string; // Added for Hero image
  };
  stats: {
    label: string;
    value: string;
  }[];
  skills: {
    id: string;
    title: string;
    category: 'creation' | 'social' | 'influencer' | 'marketing' | 'ai' | 'production';
    description: string;
    details: string[];
    images?: string[]; // Changed to array to support multiple images per card
  }[];
  contact: {
    email: string;
    linkedin: string;
  };
}

export enum SectionType {
  Hero = 'hero',
  Grid = 'grid',
  AI = 'ai',
}