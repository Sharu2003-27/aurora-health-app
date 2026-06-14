import express from 'express';
import { authMiddleware } from '../utils/auth-middleware';

const router = express.Router();

interface SleepEntry {
  id: string;
  userId: string;
  start: string;
  end: string;
  notes?: string;
}

const sleepEntries: SleepEntry[] = [];

// Create sleep entry
router.post('/', authMiddleware, (req: any, res) => {
  const userId = req.user?.sub;
  const { start, end, notes } = req.body;
  if (!start || !end) return res.status(400).json({ error: 'start and end required' });
  const entry: SleepEntry = { id: Date.now().toString(), userId, start, end, notes };
  sleepEntries.push(entry);
  res.status(201).json(entry);
});

// List sleep entries for user
router.get('/', authMiddleware, (req: any, res) => {
  const userId = req.user?.sub;
  const list = sleepEntries.filter((e) => e.userId === userId);
  res.json(list);
});

export default router;
