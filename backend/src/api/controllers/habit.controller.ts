import { Request, Response } from 'express';
import { habitService } from '@services/health/habits.service';
import { handleError } from '@utils/error-handler';
import { AuthenticatedRequest } from '@types/express';

export class HabitController {
  async createHabit(req: AuthenticatedRequest, res: Response) {
    try {
      const { name, description, frequency, targetDays, color, icon } = req.body;

      const habit = await habitService.createHabit(
        req.user!.userId,
        name,
        description,
        frequency,
        targetDays,
        color,
        icon
      );

      res.status(201).json({
        success: true,
        data: habit,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async getHabits(req: AuthenticatedRequest, res: Response) {
    try {
      const habits = await habitService.getHabits(req.user!.userId);

      res.status(200).json({
        success: true,
        data: habits,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async getTodayHabits(req: AuthenticatedRequest, res: Response) {
    try {
      const habits = await habitService.getTodayHabits(req.user!.userId);

      res.status(200).json({
        success: true,
        data: habits,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async completeHabit(req: AuthenticatedRequest, res: Response) {
    try {
      const { habitId } = req.params;
      const { notes } = req.body;

      const completion = await habitService.completeHabit(req.user!.userId, habitId, notes);

      res.status(201).json({
        success: true,
        data: completion,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async updateHabit(req: AuthenticatedRequest, res: Response) {
    try {
      const { habitId } = req.params;
      const updated = await habitService.updateHabit(req.user!.userId, habitId, req.body);

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async pauseHabit(req: AuthenticatedRequest, res: Response) {
    try {
      const { habitId } = req.params;
      const updated = await habitService.pauseHabit(req.user!.userId, habitId);

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async deleteHabit(req: AuthenticatedRequest, res: Response) {
    try {
      const { habitId } = req.params;
      const result = await habitService.deleteHabit(req.user!.userId, habitId);

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

export const habitController = new HabitController();
