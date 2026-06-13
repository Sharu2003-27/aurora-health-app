import { Router } from 'express';
import { aiController } from '@controllers/ai.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/chat', (req, res) => aiController.textChat(req as any, res));
router.post('/voice-chat', (req, res) => aiController.voiceChat(req as any, res));
router.get('/memories', (req, res) => aiController.getMemories(req as any, res));
router.post('/memories', (req, res) => aiController.addMemory(req as any, res));

export default router;
