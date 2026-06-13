import { Request, Response } from 'express';
import { sleepService } from '@services/health/sleep.service';
import { handleError } from '@utils/error-handler';
import { AuthenticatedRequest } from '@types/express';

export class SleepController {
  async logSleep(req: AuthenticatedRequest, res: Response) {
    try {
      const { startTime, endTime, quality, notes } = req.body;

      const entry = await sleepService.logSleep(
        req.user!.userId,
        new Date(startTime),
        new Date(endTime),
        quality,
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

  async getTodaySleep(req: AuthenticatedRequest, res: Response) {
    try {
      const entry = await sleepService.getTodaySleep(req.user!.userId);

      res.status(200).json({
        success: true,
        data: entry,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async getSleepHistory(req: AuthenticatedRequest, res: Response) {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : 30;
      const data = await sleepService.getSleepHistory(req.user!.userId, days);

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async updateSleepEntry(req: AuthenticatedRequest, res: Response) {
    try {
      const { entryId } = req.params;
      const updated = await sleepService.updateSleepEntry(req.user!.userId, entryId, req.body);

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }
}

export const sleepController = new SleepController();
