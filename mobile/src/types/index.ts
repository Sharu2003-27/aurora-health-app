export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  wakeUpTime?: string;
  bedtime?: string;
  activityLevel?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HydrationEntry {
  id: string;
  amount: number;
  timestamp: Date;
  notes?: string;
}

export interface SleepEntry {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  quality?: 'poor' | 'fair' | 'good' | 'excellent';
  notes?: string;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: string;
  color?: string;
  icon?: string;
  isActive: boolean;
  streak?: number;
  isCompletedToday?: boolean;
  createdAt: Date;
}

export interface NutritionEntry {
  id: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodItems: any[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  transcription?: string;
  timestamp: Date;
}

export interface AIMemory {
  id: string;
  observation: string;
  category: string;
  importance: number;
  createdAt: Date;
}
