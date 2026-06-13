export interface ChatMessage {
  id: string;
  userId: string;
  type: 'user' | 'assistant';
  content: string;
  isVoice: boolean;
  transcription?: string; // for voice input
  audioUrl?: string; // for voice output
  timestamp: Date;
}

export interface VoiceRequest {
  audio: Buffer | string; // base64 encoded
  language?: string;
}

export interface VoiceResponse {
  transcription: string;
  audioUrl: string;
  duration: number; // seconds
}

export interface AICompanionContext {
  userId: string;
  userProfile: any;
  recentHydration: number;
  recentSleep: number;
  activeHabits: number;
  completedHabitToday: number;
  todayNutrition: number;
  streak?: number;
  memories: string[];
}

export interface AIMemory {
  id: string;
  userId: string;
  observation: string;
  category: 'pattern' | 'preference' | 'achievement' | 'challenge';
  importance: number; // 1-10
  createdAt: Date;
  relevantUntil?: Date;
}

export interface AgentAction {
  type: 'log_hydration' | 'log_sleep' | 'complete_habit' | 'create_habit' | 'log_nutrition' | 'update_profile';
  data: any;
}

export interface CompanionResponse {
  message: string;
  actions?: AgentAction[];
  suggestions?: string[];
  memoryUpdates?: Partial<AIMemory>[];
}
