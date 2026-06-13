import { Router } from 'express';
import { insightController } from '@controllers/insight.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/daily', (req, res) => insightController.getDailyInsight(req as any, res));
router.get('/weekly', (req, res) => insightController.getWeeklyReport(req as any, res));

export default router;
