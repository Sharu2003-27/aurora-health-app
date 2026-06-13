import { Request, Response } from 'express';
import { userService } from '@services/health/user.service';
import { handleError } from '@utils/error-handler';
import { AuthenticatedRequest } from '@types/express';

export class UserController {
  async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const profile = await userService.getUserProfile(req.user!.userId);

      res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const profile = await userService.updateUserProfile(req.user!.userId, req.body);

      res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async updateNotificationPreferences(req: AuthenticatedRequest, res: Response) {
    try {
      const preferences = await userService.updateNotificationPreferences(req.user!.userId, req.body);

      res.status(200).json({
        success: true,
        data: preferences,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async getHealthMetrics(req: AuthenticatedRequest, res: Response) {
    try {
      const metrics = await userService.getHealthMetrics(req.user!.userId);

      res.status(200).json({
        success: true,
        data: metrics,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }
}

export const userController = new UserController();
