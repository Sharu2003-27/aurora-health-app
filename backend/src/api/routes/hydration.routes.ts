import { Router } from 'express';
import { hydrationController } from '@controllers/hydration.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', (req, res) => hydrationController.addHydration(req as any, res));
router.get('/today', (req, res) => hydrationController.getTodayHydration(req as any, res));
router.get('/history', (req, res) => hydrationController.getHydrationHistory(req as any, res));
router.delete('/:entryId', (req, res) => hydrationController.deleteHydrationEntry(req as any, res));

export default router;
