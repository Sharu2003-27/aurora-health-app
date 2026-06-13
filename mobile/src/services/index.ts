import { apiService } from './api';
import { API_ENDPOINTS } from '@constants/api';

export const authService = {
  signup: async (email: string, password: string, name: string) => {
    return apiService.post(API_ENDPOINTS.AUTH.SIGNUP, { email, password, name });
  },

  login: async (email: string, password: string) => {
    return apiService.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  },

  oauthLogin: async (provider: 'google' | 'apple', token: string, email?: string, name?: string) => {
    return apiService.post(API_ENDPOINTS.AUTH.OAUTH, { provider, token, email, name });
  },
};

export const userService = {
  getProfile: async () => {
    return apiService.get(API_ENDPOINTS.USER.PROFILE);
  },

  updateProfile: async (data: any) => {
    return apiService.put(API_ENDPOINTS.USER.PROFILE, data);
  },

  getMetrics: async () => {
    return apiService.get(API_ENDPOINTS.USER.METRICS);
  },

  updateNotifications: async (preferences: any) => {
    return apiService.put(API_ENDPOINTS.USER.NOTIFICATIONS, preferences);
  },
};

export const hydrationService = {
  addHydration: async (amount: number, notes?: string) => {
    return apiService.post(API_ENDPOINTS.HYDRATION.ADD, { amount, notes });
  },

  getToday: async () => {
    return apiService.get(API_ENDPOINTS.HYDRATION.TODAY);
  },

  getHistory: async (days?: number) => {
    return apiService.get(API_ENDPOINTS.HYDRATION.HISTORY, { params: { days } });
  },
};

export const sleepService = {
  logSleep: async (startTime: Date, endTime: Date, quality?: string, notes?: string) => {
    return apiService.post(API_ENDPOINTS.SLEEP.ADD, { startTime, endTime, quality, notes });
  },

  getToday: async () => {
    return apiService.get(API_ENDPOINTS.SLEEP.TODAY);
  },

  getHistory: async (days?: number) => {
    return apiService.get(API_ENDPOINTS.SLEEP.HISTORY, { params: { days } });
  },
};

export const habitService = {
  create: async (name: string, description?: string, frequency?: string) => {
    return apiService.post(API_ENDPOINTS.HABITS.CREATE, { name, description, frequency });
  },

  getAll: async () => {
    return apiService.get(API_ENDPOINTS.HABITS.LIST);
  },

  getToday: async () => {
    return apiService.get(API_ENDPOINTS.HABITS.TODAY);
  },

  complete: async (habitId: string, notes?: string) => {
    return apiService.post(API_ENDPOINTS.HABITS.COMPLETE(habitId), { notes });
  },
};

export const nutritionService = {
  addMeal: async (mealType: string, foodItems: any[], totals: any) => {
    return apiService.post(API_ENDPOINTS.NUTRITION.ADD, { mealType, foodItems, ...totals });
  },

  getToday: async () => {
    return apiService.get(API_ENDPOINTS.NUTRITION.TODAY);
  },

  getHistory: async (days?: number) => {
    return apiService.get(API_ENDPOINTS.NUTRITION.HISTORY, { params: { days } });
  },
};

export const aiService = {
  textChat: async (message: string) => {
    return apiService.post(API_ENDPOINTS.AI.CHAT, { message });
  },

  voiceChat: async (audioBase64: string) => {
    return apiService.post(API_ENDPOINTS.AI.VOICE_CHAT, { audio: audioBase64 });
  },

  getMemories: async () => {
    return apiService.get(API_ENDPOINTS.AI.MEMORIES);
  },
};

export const insightService = {
  getDaily: async () => {
    return apiService.get(API_ENDPOINTS.INSIGHTS.DAILY);
  },

  getWeekly: async () => {
    return apiService.get(API_ENDPOINTS.INSIGHTS.WEEKLY);
  },
};
