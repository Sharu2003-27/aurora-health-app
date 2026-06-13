export const API_ENDPOINTS = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  HEALTH_CHECK: '/health',
  
  // Auth
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    OAUTH: '/auth/oauth',
  },
  
  // User
  USER: {
    PROFILE: '/users/profile',
    METRICS: '/users/metrics',
    NOTIFICATIONS: '/users/notifications',
  },
  
  // Hydration
  HYDRATION: {
    ADD: '/hydration',
    TODAY: '/hydration/today',
    HISTORY: '/hydration/history',
    DELETE: (id: string) => `/hydration/${id}`,
  },
  
  // Sleep
  SLEEP: {
    ADD: '/sleep',
    TODAY: '/sleep/today',
    HISTORY: '/sleep/history',
    UPDATE: (id: string) => `/sleep/${id}`,
  },
  
  // Habits
  HABITS: {
    CREATE: '/habits',
    LIST: '/habits',
    TODAY: '/habits/today',
    COMPLETE: (id: string) => `/habits/${id}/complete`,
    UPDATE: (id: string) => `/habits/${id}`,
    PAUSE: (id: string) => `/habits/${id}/pause`,
    DELETE: (id: string) => `/habits/${id}`,
  },
  
  // Nutrition
  NUTRITION: {
    ADD: '/nutrition',
    TODAY: '/nutrition/today',
    HISTORY: '/nutrition/history',
    DELETE: (id: string) => `/nutrition/${id}`,
  },
  
  // AI
  AI: {
    CHAT: '/ai/chat',
    VOICE_CHAT: '/ai/voice-chat',
    MEMORIES: '/ai/memories',
  },
  
  // Insights
  INSIGHTS: {
    DAILY: '/insights/daily',
    WEEKLY: '/insights/weekly',
  },
};
