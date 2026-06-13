import { Request, Response } from 'express';
import { insightService } from '@services/ai/insights.service';
import { handleError } from '@utils/error-handler';
import { AuthenticatedRequest } from '@types/express';

export class InsightController {
  async getDailyInsight(req: AuthenticatedRequest, res: Response) {
    try {
      const insight = await insightService.generateDailyInsight(req.user!.userId);

      res.status(200).json({
        success: true,
        data: { insight },
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async getWeeklyReport(req: AuthenticatedRequest, res: Response) {
    try {
      const report = await insightService.generateWeeklyReport(req.user!.userId);

      res.status(200).json({
        success: true,
        data: report,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }
}

export const insightController = new InsightController();
