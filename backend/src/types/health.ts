export interface HydrationEntry {
  id: string;
  userId: string;
  amount: number; // ml
  timestamp: Date;
  source: 'manual' | 'device';
  createdAt: Date;
}

export interface SleepEntry {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  duration: number; // minutes
  quality?: 'poor' | 'fair' | 'good' | 'excellent';
  notes?: string;
  createdAt: Date;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetDays?: number[]; // 0-6 for weekly
  color?: string;
  icon?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  userId: string;
  completedAt: Date;
  notes?: string;
}

export interface NutritionEntry {
  id: string;
  userId: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodItems: FoodItem[];
  totalCalories: number;
  totalProtein: number; // grams
  totalCarbs: number; // grams
  totalFat: number; // grams
  notes?: string;
  timestamp: Date;
  createdAt: Date;
}

export interface FoodItem {
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface HealthGoal {
  id: string;
  userId: string;
  goal: 'improve_hydration' | 'sleep_better' | 'build_habits' | 'eat_healthier' | 'improve_energy' | 'improve_consistency';
  status: 'active' | 'completed' | 'abandoned';
  createdAt: Date;
  completedAt?: Date;
}

export interface HealthInsight {
  id: string;
  userId: string;
  type: 'hydration' | 'sleep' | 'habits' | 'nutrition' | 'general';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  generatedAt: Date;
}

export interface HealthMetrics {
  dailyHydrationGoal: number; // ml
  dailySleepGoal: number; // minutes
  habitGoals: number; // number of habits to complete
  nutritionCalorieGoal: number;
}
