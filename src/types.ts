export type ThemeId =
  | 'immersive-ui'
  | 'space-slate'
  | 'cosmic-indigo'
  | 'cyberpunk-neon'
  | 'calming-forest'
  | 'royal-crimson'
  | 'classic-amber'
  | 'warm-sepia'
  | 'ocean-breeze'
  | 'minimal-charcoal'
  | 'solarized-gold';

export interface Theme {
  id: ThemeId;
  name: string;
  isDark: boolean;
  className: string;
  colors: {
    bg: string;
    card: string;
    text: string;
    primary: string;
    accent: string;
    border: string;
  };
}

export interface QuizQuestion {
  id: number;
  company: string;
  topic: string;
  level: 'Easy' | 'Medium' | 'Hard' | 'Advanced';
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface SpeedLog {
  id: string;
  topic: string;
  timeSeconds: number;
  timestamp: string;
  isCorrect: boolean;
  accuracy: number; // percentage
}

export interface UserStats {
  streak: number;
  lastActive: string;
  score: number;
  solvedCount: number;
  totalTimeSpent: number; // in seconds
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Lock' | 'Coming Soon';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
