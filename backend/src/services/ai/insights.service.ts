import { prisma } from '@/database/config';
import { logger } from '@utils/logger';
import { memoryService } from './memory.service';
import { calculateStreak } from '@utils/calculations';

export class InsightService {
  async generateDailyInsight(userId: string): Promise<string> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Get today's data
      const [hydration, sleep, habits, nutrition] = await Promise.all([
        prisma.hydrationEntry.aggregate({
          where: {
            userId,
            timestamp: { gte: today, lt: tomorrow },
          },
          _sum: { amount: true },
          _count: true,
        }),
        prisma.sleepEntry.findFirst({
          where: {
            userId,
            startTime: { gte: today, lt: tomorrow },
          },
        }),
        prisma.habitCompletion.count({
          where: {
            userId,
            completedAt: { gte: today, lt: tomorrow },
          },
        }),
        prisma.nutritionEntry.aggregate({
          where: {
            userId,
            timestamp: { gte: today, lt: tomorrow },
          },
          _sum: { totalCalories: true },
          _count: true,
        }),
      ]);

      const insights: string[] = [];

      // Hydration insights
      const dailyHydrationGoal = 2000; // ml
      const hydrationPercent = ((hydration._sum.amount || 0) / dailyHydrationGoal) * 100;
      if (hydrationPercent >= 100) {
        insights.push('You\'re staying well hydrated today! ✨');
      } else if (hydrationPercent >= 75) {
        insights.push(`Almost there! You're at ${Math.round(hydrationPercent)}% of your hydration goal.`);
      } else if (hydrationPercent < 25) {
        insights.push('Time to drink some water! Your hydration is low today.');
      }

      // Sleep insights
      if (sleep) {
        const sleepHours = sleep.duration / 60;
        if (sleepHours >= 7 && sleepHours <= 9) {
          insights.push(`Great sleep last night: ${Math.round(sleepHours)} hours! 😴`);
          await memoryService.addMemory(userId, 'Good sleep quality achieved', 'achievement', 8);
        } else if (sleepHours < 6) {
          insights.push('Consider getting more sleep tonight for better health.');
          await memoryService.addMemory(userId, 'Sleep was below recommended', 'challenge', 6);
        }
      }

      // Habit insights
      if (habits > 0) {
        insights.push(`${habits} habits completed today! Great consistency! 🎯`);
        if (habits >= 3) {
          await memoryService.addMemory(userId, 'High habit completion streak', 'achievement', 9);
        }
      } else {
        insights.push('No habits completed yet today. Start with your easiest habit!');
      }

      // Nutrition insights
      if (nutrition._count > 0) {
        insights.push(`${nutrition._count} meals logged today. Good job tracking nutrition!`);
      }

      const combinedInsight = insights.slice(0, 2).join(' ');
      logger.info(`Daily insight generated for user ${userId}`);
      return combinedInsight || 'Keep tracking your health today!';
    } catch (error) {
      logger.error('Error generating insight:', error);
      return 'Keep up with your health tracking!';
    }
  }

  async generateWeeklyReport(userId: string) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Get week's data
      const [hydration, sleepEntries, habitCompletions, nutrition] = await Promise.all([
        prisma.hydrationEntry.findMany({
          where: {
            userId,
            timestamp: { gte: sevenDaysAgo },
          },
        }),
        prisma.sleepEntry.findMany({
          where: {
            userId,
            startTime: { gte: sevenDaysAgo },
          },
        }),
        prisma.habitCompletion.findMany({
          where: {
            userId,
            completedAt: { gte: sevenDaysAgo },
          },
          include: { habit: true },
        }),
        prisma.nutritionEntry.findMany({
          where: {
            userId,
            timestamp: { gte: sevenDaysAgo },
          },
        }),
      ]);

      // Calculate metrics
      const avgDailyHydration = hydration.length > 0 ? Math.round(hydration.reduce((sum, h) => sum + h.amount, 0) / 7) : 0;
      const avgDailySleep = sleepEntries.length > 0 ? Math.round(sleepEntries.reduce((sum, s) => sum + s.duration, 0) / sleepEntries.length / 60 * 10) / 10 : 0;
      const totalHabitCompletions = habitCompletions.length;
      const avgDailyCalories = nutrition.length > 0 ? Math.round(nutrition.reduce((sum, n) => sum + n.totalCalories, 0) / 7) : 0;

      const report = {
        period: 'last_7_days',
        generatedAt: new Date(),
        metrics: {
          avgDailyHydration,
          avgDailySleep,
          totalHabitCompletions,
          avgDailyCalories,
          consistencyScore: this.calculateConsistencyScore({
            hydration: hydration.length,
            sleep: sleepEntries.length,
            habits: totalHabitCompletions,
          }),
        },
        trends: this.analyzeTrends({
          hydration,
          sleep: sleepEntries,
          habits: habitCompletions,
        }),
      };

      logger.info(`Weekly report generated for user ${userId}`);
      return report;
    } catch (error) {
      logger.error('Error generating weekly report:', error);
      throw error;
    }
  }

  private calculateConsistencyScore(data: any): number {
    const { hydration, sleep, habits } = data;
    const score = Math.round((hydration + sleep + Math.min(habits / 3, 7)) / 3);
    return Math.min(100, Math.max(0, score));
  }

  private analyzeTrends(data: any): any {
    const { hydration, sleep, habits } = data;
    return {
      hydration: hydration.length >= 5 ? 'consistent' : hydration.length >= 3 ? 'improving' : 'needs_attention',
      sleep: sleep.length >= 5 ? 'consistent' : sleep.length >= 3 ? 'improving' : 'needs_attention',
      habits: habits.length >= 10 ? 'excellent' : habits.length >= 5 ? 'good' : 'needs_work',
    };
  }
}

export const insightService = new InsightService();
