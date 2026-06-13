import { Router } from 'express';
import { userController } from '@controllers/user.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/profile', (req, res) => userController.getProfile(req as any, res));
router.put('/profile', (req, res) => userController.updateProfile(req as any, res));
router.put('/notifications', (req, res) => userController.updateNotificationPreferences(req as any, res));
router.get('/metrics', (req, res) => userController.getHealthMetrics(req as any, res));

export default router;
