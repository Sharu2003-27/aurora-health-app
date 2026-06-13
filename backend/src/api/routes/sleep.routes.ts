import { Router } from 'express';
import { sleepController } from '@controllers/sleep.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', (req, res) => sleepController.logSleep(req as any, res));
router.get('/today', (req, res) => sleepController.getTodaySleep(req as any, res));
router.get('/history', (req, res) => sleepController.getSleepHistory(req as any, res));
router.put('/:entryId', (req, res) => sleepController.updateSleepEntry(req as any, res));

export default router;
