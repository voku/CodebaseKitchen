import { LucideIcon } from 'lucide-react';

export enum SceneType {
  INTRO = 'INTRO',
  NARRATIVE = 'NARRATIVE',
  BATTLE = 'BATTLE', // Quiz, Debug, or Terminal
  REVELATION = 'REVELATION', // Big lesson
  ENDING = 'ENDING',
  CREDITS = 'CREDITS',
  RESULTS = 'RESULTS' // New Score/Rating Screen
}

export type BattleType = 'QUIZ' | 'DEBUG' | 'TERMINAL';

export interface CodeOption {
  id: string;
  label: string;
  code?: string;
  isCorrect: boolean;
  explanation: string; // "Why" it's right or wrong
  debtImpact: number; // +10 debt or -10 debt
}

export interface Scene {
  id: string;
  type: SceneType;
  title: string;
  subtitle?: string;
  content: string; // Main text
  speaker?: "JARVIS" | "THE ARCHITECT" | "THE ROT" | "JUNIOR DEV" | "SYSTEM";
  backgroundEffect?: 'rain' | 'glitch' | 'clean' | 'fire';
  
  // Battle Configuration
  battleType?: BattleType; // Defaults to QUIZ if undefined
  
  // QUIZ Specific
  question?: string;
  options?: CodeOption[];

  // VISUALS
  codeContext?: string; // The "Problem" code snippet
  language?: 'typescript' | 'bash' | 'tree' | 'css'; 
  icon?: LucideIcon;

  // DEBUG Specific
  bugLine?: number; // 0-indexed line number that contains the bug

  // TERMINAL Specific
  validCommands?: string[]; // Array of acceptable commands
  terminalContext?: string; // Initial terminal output
  successMessage?: string; // Message on success
  failMessage?: string; // Message on failure
}

export interface GameState {
  currentSceneIndex: number;
  techDebtLevel: number; // 0 to 100. 100 = Project Failure.
  isMovieStarted: boolean;
  gameStatus: 'PLAYING' | 'GAME_OVER' | 'VICTORY';
  completedSceneIds: string[]; // Track which battles were actually played
}

// Comic/Story Mode Types

export enum PanelType {
  SPLASH = 'SPLASH',
  ACTION = 'ACTION',
  DIALOGUE = 'DIALOGUE',
  VS_MODE = 'VS_MODE',
  LESSON = 'LESSON'
}

export enum BubbleType {
  CAPTION = 'CAPTION',
  SPEECH = 'SPEECH',
  THOUGHT = 'THOUGHT',
  SHOUT = 'SHOUT',
  SYSTEM = 'SYSTEM'
}

export enum Character {
  NARRATOR = 'NARRATOR',
  ARCHITECT = 'THE ARCHITECT',
  ROT = 'THE ROT',
  SYSTEM = 'SYSTEM'
}

export interface Dialogue {
  id: string;
  character: Character;
  type: BubbleType;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export interface VisualConfig {
  bgFrom?: string;
  bgTo?: string;
  icon?: LucideIcon;
  secondaryIcon?: LucideIcon;
  intensity?: 'low' | 'medium' | 'high';
}

export interface StoryPanel {
  id: number;
  type: PanelType;
  title?: string;
  visualConfig: VisualConfig;
  dialogues: Dialogue[];
  codeSnippet?: string;
}