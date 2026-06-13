import { create } from 'zustand';

interface HealthState {
  hydrationToday: number;
  sleepToday: number | null;
  habitsCompleted: number;
  habitsTotal: number;
  updateHydration: (amount: number) => void;
  updateSleep: (duration: number) => void;
  updateHabits: (completed: number, total: number) => void;
  reset: () => void;
}

export const useHealthStore = create<HealthState>((set) => ({
  hydrationToday: 0,
  sleepToday: null,
  habitsCompleted: 0,
  habitsTotal: 0,

  updateHydration: (amount: number) => set({ hydrationToday: amount }),
  updateSleep: (duration: number) => set({ sleepToday: duration }),
  updateHabits: (completed: number, total: number) => 
    set({ habitsCompleted: completed, habitsTotal: total }),
  
  reset: () => set({ hydrationToday: 0, sleepToday: null, habitsCompleted: 0, habitsTotal: 0 }),
}));
