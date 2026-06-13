import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string | null;
  user: any;
  isLoggedIn: boolean;
  isLoading: boolean;
  setAuth: (token: string, user: any) => void;
  logout: () => void;
  restoreToken: () => Promise<void>;
  updateUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoggedIn: false,
  isLoading: true,

  setAuth: async (token: string, user: any) => {
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    set({ token, user, isLoggedIn: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');
    set({ token: null, user: null, isLoggedIn: false });
  },

  restoreToken: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userStr = await AsyncStorage.getItem('user');
      
      if (token && userStr) {
        const user = JSON.parse(userStr);
        set({ token, user, isLoggedIn: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },

  updateUser: (user: any) => {
    AsyncStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
}));
