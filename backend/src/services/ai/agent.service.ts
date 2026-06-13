import { prisma } from '@/database/config';
import { logger } from '@utils/logger';
import { hydrationService } from '@services/health/hydration.service';
import { sleepService } from '@services/health/sleep.service';
import { habitService } from '@services/health/habits.service';
import { nutritionService } from '@services/health/nutrition.service';

export interface AgentAction {
  type: string;
  data: any;
}

export class AgentService {
  async executeAction(userId: string, action: AgentAction): Promise<any> {
    try {
      switch (action.type) {
        case 'log_hydration':
          return await this.logHydration(userId, action.data);

        case 'log_sleep':
          return await this.logSleep(userId, action.data);

        case 'complete_habit':
          return await this.completeHabit(userId, action.data);

        case 'create_habit':
          return await this.createHabit(userId, action.data);

        case 'log_nutrition':
          return await this.logNutrition(userId, action.data);

        case 'update_profile':
          return await this.updateProfile(userId, action.data);

        default:
          logger.warn(`Unknown action type: ${action.type}`);
          return { success: false, message: 'Unknown action type' };
      }
    } catch (error) {
      logger.error(`Error executing action ${action.type}:`, error);
      throw error;
    }
  }

  private async logHydration(userId: string, data: any) {
    const { amount, notes } = data;
    const entry = await hydrationService.addHydration(userId, amount, notes);
    logger.info(`Hydration logged: ${amount}ml for user ${userId}`);
    return {
      success: true,
      message: `Added ${amount}ml of water. Great job staying hydrated!`,
      entry,
    };
  }

  private async logSleep(userId: string, data: any) {
    const { startTime, endTime, duration, quality, notes } = data;

    let entry;
    if (startTime && endTime) {
      entry = await sleepService.logSleep(
        userId,
        new Date(startTime),
        new Date(endTime),
        quality,
        notes
      );
    } else if (duration) {
      // Log approximate sleep
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - duration * 60 * 1000);
      entry = await sleepService.logSleep(userId, startTime, endTime, quality, notes);
    }

    logger.info(`Sleep logged: ${duration}min for user ${userId}`);
    return {
      success: true,
      message: `Logged ${Math.round((data.duration || 0) / 60)} hours of sleep. Rest well!`,
      entry,
    };
  }

  private async completeHabit(userId: string, data: any) {
    const { habitId, notes } = data;
    const completion = await habitService.completeHabit(userId, habitId, notes);
    logger.info(`Habit completed: ${habitId} for user ${userId}`);
    return {
      success: true,
      message: 'Great job! Habit marked as completed.',
      completion,
    };
  }

  private async createHabit(userId: string, data: any) {
    const { name, description, frequency, icon } = data;
    const habit = await habitService.createHabit(
      userId,
      name,
      description,
      frequency || 'daily',
      undefined,
      undefined,
      icon
    );
    logger.info(`Habit created: ${name} for user ${userId}`);
    return {
      success: true,
      message: `Created habit: "${name}". Let's build this together!`,
      habit,
    };
  }

  private async logNutrition(userId: string, data: any) {
    const { mealType, foodItems, totalCalories, totalProtein, totalCarbs, totalFat, notes } = data;
    const entry = await nutritionService.logMeal(
      userId,
      mealType,
      foodItems,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      notes
    );
    logger.info(`Nutrition logged: ${mealType} for user ${userId}`);
    return {
      success: true,
      message: `Logged ${mealType}: ${totalCalories} calories. Keep tracking!`,
      entry,
    };
  }

  private async updateProfile(userId: string, data: any) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });
    logger.info(`Profile updated for user ${userId}`);
    return {
      success: true,
      message: 'Profile updated successfully!',
      user,
    };
  }
}

export const agentService = new AgentService();
