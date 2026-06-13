export const calculateBMI = (weight: number, height: number): number => {
  // weight in kg, height in cm
  const heightInMeters = height / 100;
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
};

export const calculateCalories = (
  age: number,
  weight: number,
  height: number,
  gender: 'male' | 'female' | 'other',
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' = 'moderately_active'
): number => {
  // Mifflin-St Jeor Equation
  let bmr: number;

  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
  };

  return Math.round(bmr * activityMultipliers[activityLevel]);
};

export const calculateHydrationGoal = (weight: number): number => {
  // Simple formula: weight * 35 ml
  return Math.round(weight * 35);
};

export const calculateSleepGoal = (): number => {
  // Standard 8 hours in minutes
  return 480;
};

export const calculateStreak = (dates: Date[]): number => {
  if (dates.length === 0) return 0;

  const sortedDates = dates.map(d => new Date(d).toDateString()).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i]);
    const currDate = new Date(sortedDates[i - 1]);
    const diffTime = currDate.getTime() - prevDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

export const calculateAverageHydration = (entries: number[]): number => {
  if (entries.length === 0) return 0;
  return Math.round(entries.reduce((a, b) => a + b, 0) / entries.length);
};

export const calculateAverageSleep = (durations: number[]): number => {
  if (durations.length === 0) return 0;
  return Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
};
