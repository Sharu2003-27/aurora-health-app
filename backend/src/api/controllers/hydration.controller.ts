import { Request, Response } from 'express';
import { hydrationService } from '@services/health/hydration.service';
import { handleError } from '@utils/error-handler';
import { AuthenticatedRequest } from '@types/express';

export class HydrationController {
  async addHydration(req: AuthenticatedRequest, res: Response) {
    try {
      const { amount, notes } = req.body;

      const entry = await hydrationService.addHydration(req.user!.userId, amount, notes);

      res.status(201).json({
        success: true,
        data: entry,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async getTodayHydration(req: AuthenticatedRequest, res: Response) {
    try {
      const data = await hydrationService.getTodayHydration(req.user!.userId);

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async getHydrationHistory(req: AuthenticatedRequest, res: Response) {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : 7;
      const data = await hydrationService.getHydrationHistory(req.user!.userId, days);

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async deleteHydrationEntry(req: AuthenticatedRequest, res: Response) {
    try {
      const { entryId } = req.params;
      const result = await hydrationService.deleteHydrationEntry(req.user!.userId, entryId);

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

export const hydrationController = new HydrationController();
