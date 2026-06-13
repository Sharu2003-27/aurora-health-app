import { Request, Response } from 'express';
import { nutritionService } from '@services/health/nutrition.service';
import { handleError } from '@utils/error-handler';
import { AuthenticatedRequest } from '@types/express';

export class NutritionController {
  async logMeal(req: AuthenticatedRequest, res: Response) {
    try {
      const { mealType, foodItems, totalCalories, totalProtein, totalCarbs, totalFat, notes } = req.body;

      const entry = await nutritionService.logMeal(
        req.user!.userId,
        mealType,
        foodItems,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        notes
      );

      res.status(201).json({
        success: true,
        data: entry,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async getTodayNutrition(req: AuthenticatedRequest, res: Response) {
    try {
      const data = await nutritionService.getTodayNutrition(req.user!.userId);

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async getNutritionHistory(req: AuthenticatedRequest, res: Response) {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : 7;
      const data = await nutritionService.getNutritionHistory(req.user!.userId, days);

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async deleteNutritionEntry(req: AuthenticatedRequest, res: Response) {
    try {
      const { entryId } = req.params;
      const result = await nutritionService.deleteNutritionEntry(req.user!.userId, entryId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }
}

export const nutritionController = new NutritionController();
