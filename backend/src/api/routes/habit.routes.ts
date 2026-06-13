import { Router } from 'express';
import { habitController } from '@controllers/habit.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', (req, res) => habitController.createHabit(req as any, res));
router.get('/', (req, res) => habitController.getHabits(req as any, res));
router.get('/today', (req, res) => habitController.getTodayHabits(req as any, res));
router.post('/:habitId/complete', (req, res) => habitController.completeHabit(req as any, res));
router.put('/:habitId', (req, res) => habitController.updateHabit(req as any, res));
router.post('/:habitId/pause', (req, res) => habitController.pauseHabit(req as any, res));
router.delete('/:habitId', (req, res) => habitController.deleteHabit(req as any, res));

export default router;
