import { prisma } from '@/database/config';
import { AppError } from '@utils/error-handler';
import { calculateBMI, calculateCalories, calculateHydrationGoal, calculateSleepGoal } from '@utils/calculations';

export class UserService {
  async getUserProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError(404, 'USER_NOT_FOUND', 'User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      age: user.age,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      wakeUpTime: user.wakeUpTime,
      bedtime: user.bedtime,
      activityLevel: user.activityLevel,
      profileImage: user.profileImage,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateUserProfile(userId: string, data: any) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        age: data.age,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        wakeUpTime: data.wakeUpTime,
        bedtime: data.bedtime,
        activityLevel: data.activityLevel,
        profileImage: data.profileImage,
        bio: data.bio,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      age: user.age,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      wakeUpTime: user.wakeUpTime,
      bedtime: user.bedtime,
      activityLevel: user.activityLevel,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateNotificationPreferences(
    userId: string,
    preferences: {
      notificationEnabled?: boolean;
      hydrationReminder?: boolean;
      sleepReminder?: boolean;
      habitReminder?: boolean;
      insightReminder?: boolean;
    }
  ) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: preferences,
    });

    return {
      notificationEnabled: user.notificationEnabled,
      hydrationReminder: user.hydrationReminder,
      sleepReminder: user.sleepReminder,
      habitReminder: user.habitReminder,
      insightReminder: user.insightReminder,
    };
  }

  async getHealthMetrics(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError(404, 'USER_NOT_FOUND', 'User not found');
    }

    let dailyHydrationGoal = 2000; // default
    let dailySleepGoal = 480; // default 8 hours
    let dailyCalorieGoal = 2000; // default

    if (user.weight) {
      dailyHydrationGoal = calculateHydrationGoal(user.weight);
    }

    if (user.age && user.weight && user.height && user.gender) {
      dailyCalorieGoal = calculateCalories(
        user.age,
        user.weight,
        user.height,
        user.gender as 'male' | 'female' | 'other',
        (user.activityLevel as any) || 'moderately_active'
      );
    }

    return {
      dailyHydrationGoal,
      dailySleepGoal,
      dailyCalorieGoal,
      bmi: user.height && user.weight ? calculateBMI(user.weight, user.height) : null,
    };
  }
}

export const userService = new UserService();
