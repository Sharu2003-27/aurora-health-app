import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import hydrationRoutes from './hydration.routes';
import sleepRoutes from './sleep.routes';
import habitRoutes from './habit.routes';
import nutritionRoutes from './nutrition.routes';
import aiRoutes from './ai.routes';
import insightRoutes from './insight.routes';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/hydration', hydrationRoutes);
router.use('/sleep', sleepRoutes);
router.use('/habits', habitRoutes);
router.use('/nutrition', nutritionRoutes);
router.use('/ai', aiRoutes);
router.use('/insights', insightRoutes);

export default router;
