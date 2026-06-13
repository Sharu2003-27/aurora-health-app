import { prisma } from '@/database/config';
import { AppError } from '@utils/error-handler';

export class NutritionService {
  async logMeal(
    userId: string,
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    foodItems: any[],
    totalCalories: number,
    totalProtein: number,
    totalCarbs: number,
    totalFat: number,
    notes?: string
  ) {
    if (!foodItems || foodItems.length === 0) {
      throw new AppError(400, 'NO_FOOD_ITEMS', 'At least one food item is required');
    }

    const entry = await prisma.nutritionEntry.create({
      data: {
        userId,
        mealType,
        foodItems: JSON.stringify(foodItems),
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        notes,
        timestamp: new Date(),
      },
    });

    return {
      ...entry,
      foodItems: JSON.parse(entry.foodItems),
    };
  }

  async getTodayNutrition(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const entries = await prisma.nutritionEntry.findMany({
      where: {
        userId,
        timestamp: {
          gte: today,
          lt: tomorrow,
        },
      },
      orderBy: { timestamp: 'desc' },
    });

    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };

    entries.forEach((entry) => {
      totals.calories += entry.totalCalories;
      totals.protein += entry.totalProtein;
      totals.carbs += entry.totalCarbs;
      totals.fat += entry.totalFat;
    });

    return {
      entries: entries.map((entry) => ({
        ...entry,
        foodItems: JSON.parse(entry.foodItems),
      })),
      totals,
    };
  }

  async getNutritionHistory(userId: string, days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const entries = await prisma.nutritionEntry.findMany({
      where: {
        userId,
        timestamp: {
          gte: startDate,
        },
      },
      orderBy: { timestamp: 'desc' },
    });

    return entries.map((entry) => ({
      ...entry,
      foodItems: JSON.parse(entry.foodItems),
    }));
  }

  async deleteNutritionEntry(userId: string, entryId: string) {
    const entry = await prisma.nutritionEntry.findUnique({
      where: { id: entryId },
    });

    if (!entry || entry.userId !== userId) {
      throw new AppError(404, 'ENTRY_NOT_FOUND', 'Nutrition entry not found');
    }

    await prisma.nutritionEntry.delete({
      where: { id: entryId },
    });

    return { success: true };
  }
}

export const nutritionService = new NutritionService();
