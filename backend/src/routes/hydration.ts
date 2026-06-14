import express from 'express';
import { authMiddleware } from '../utils/auth-middleware';

const router = express.Router();

interface HydrationEntry {
  id: string;
  userId: string;
  amountMl: number;
  createdAt: string;
}

const hydrationEntries: HydrationEntry[] = [];

// Create hydration entry
router.post('/', authMiddleware, (req: any, res) => {
  const userId = req.user?.sub;
  const { amountMl } = req.body;
  if (!amountMl) return res.status(400).json({ error: 'amountMl required' });
  const entry: HydrationEntry = { id: Date.now().toString(), userId, amountMl: Number(amountMl), createdAt: new Date().toISOString() };
  hydrationEntries.push(entry);
  res.status(201).json(entry);
});

// List hydration entries for user
router.get('/', authMiddleware, (req: any, res) => {
  const userId = req.user?.sub;
  const list = hydrationEntries.filter((e) => e.userId === userId);
  res.json(list);
});

export default router;
