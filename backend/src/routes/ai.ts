import express from 'express';
import { authMiddleware } from '../utils/auth-middleware';

const router = express.Router();

router.post('/assistant', authMiddleware, (req: any, res) => {
  const { message } = req.body;
  const userId = req.user?.sub;
  // Simple deterministic stub response
  const reply = {
    userId,
    reply: `AI stub received your message: "${message || ''}". This is a placeholder response.`,
    suggestions: [
      { type: 'hydration', text: 'Drink a 250ml glass of water' },
      { type: 'sleep', text: 'Try winding down 30 minutes before bedtime' },
    ],
    timestamp: new Date().toISOString(),
  };
  res.json(reply);
});

export default router;
