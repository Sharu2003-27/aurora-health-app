import { prisma } from '@/database/config';
import { AppError } from '@utils/error-handler';

export class HabitService {
  async createHabit(
    userId: string,
    name: string,
    description?: string,
    frequency: string = 'daily',
    targetDays?: number[],
    color?: string,
    icon?: string
  ) {
    if (!name || name.trim().length === 0) {
      throw new AppError(400, 'INVALID_NAME', 'Habit name is required');
    }

    const habit = await prisma.habit.create({
      data: {
        userId,
        name,
        description,
        frequency,
        targetDays: targetDays || [],
        color,
        icon,
      },
    });

    return habit;
  }

  async getHabits(userId: string, activeOnly: boolean = true) {
    const habits = await prisma.habit.findMany({
      where: {
        userId,
        ...(activeOnly && { isActive: true }),
      },
      include: {
        completions: {
          orderBy: { completedAt: 'desc' },
          take: 7, // Get last 7 days
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return habits.map((habit) => ({
      ...habit,
      streak: this.calculateStreak(habit.completions),
    }));
  }

  async completeHabit(userId: string, habitId: string, notes?: string) {
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!habit || habit.userId !== userId) {
      throw new AppError(404, 'HABIT_NOT_FOUND', 'Habit not found');
    }

    // Check if already completed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayCompletion = await prisma.habitCompletion.findFirst({
      where: {
        habitId,
        userId,
        completedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    if (todayCompletion) {
      return { message: 'Habit already completed today', habit: todayCompletion };
    }

    const completion = await prisma.habitCompletion.create({
      data: {
        habitId,
        userId,
        notes,
      },
    });

    return completion;
  }

  async skipHabit(userId: string, habitId: string) {
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!habit || habit.userId !== userId) {
      throw new AppError(404, 'HABIT_NOT_FOUND', 'Habit not found');
    }

    return { message: 'Habit skipped' };
  }

  async getTodayHabits(userId: string) {
    const habits = await prisma.habit.findMany({
      where: {
        userId,
        isActive: true,
      },
      include: {
        completions: {
          where: {
            completedAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
              lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
          },
        },
      },
    });

    return habits.map((habit) => ({
      ...habit,
      isCompletedToday: habit.completions.length > 0,
    }));
  }

  async updateHabit(userId: string, habitId: string, data: any) {
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!habit || habit.userId !== userId) {
      throw new AppError(404, 'HABIT_NOT_FOUND', 'Habit not found');
    }

    const updated = await prisma.habit.update({
      where: { id: habitId },
      data,
    });

    return updated;
  }

  async pauseHabit(userId: string, habitId: string) {
    return this.updateHabit(userId, habitId, { isActive: false });
  }

  async deleteHabit(userId: string, habitId: string) {
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!habit || habit.userId !== userId) {
      throw new AppError(404, 'HABIT_NOT_FOUND', 'Habit not found');
    }

    await prisma.habit.delete({
      where: { id: habitId },
    });

    return { success: true };
  }

  private calculateStreak(completions: any[]): number {
    if (completions.length === 0) return 0;

    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < completions.length - 1; i++) {
      const current = new Date(completions[i].completedAt);
      current.setHours(0, 0, 0, 0);
      const next = new Date(completions[i + 1].completedAt);
      next.setHours(0, 0, 0, 0);

      const diffDays = (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }
}

export const habitService = new HabitService();
