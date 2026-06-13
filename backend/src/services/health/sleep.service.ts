import { prisma } from '@/database/config';
import { AppError } from '@utils/error-handler';

export class SleepService {
  async logSleep(
    userId: string,
    startTime: Date,
    endTime: Date,
    quality?: 'poor' | 'fair' | 'good' | 'excellent',
    notes?: string
  ) {
    // Validate times
    if (startTime >= endTime) {
      throw new AppError(400, 'INVALID_TIME', 'Start time must be before end time');
    }

    const duration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));

    if (duration < 0) {
      throw new AppError(400, 'INVALID_DURATION', 'Sleep duration must be positive');
    }

    const entry = await prisma.sleepEntry.create({
      data: {
        userId,
        startTime,
        endTime,
        duration,
        quality,
        notes,
      },
    });

    return entry;
  }

  async getTodaySleep(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const entries = await prisma.sleepEntry.findMany({
      where: {
        userId,
        startTime: {
          gte: today,
          lt: tomorrow,
        },
      },
      orderBy: { startTime: 'desc' },
    });

    return entries.length > 0 ? entries[0] : null;
  }

  async getSleepHistory(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const entries = await prisma.sleepEntry.findMany({
      where: {
        userId,
        startTime: {
          gte: startDate,
        },
      },
      orderBy: { startTime: 'desc' },
    });

    const averageDuration = entries.length > 0
      ? entries.reduce((sum, entry) => sum + entry.duration, 0) / entries.length
      : 0;

    return {
      entries,
      averageDuration: Math.round(averageDuration),
      totalEntries: entries.length,
    };
  }

  async updateSleepEntry(
    userId: string,
    entryId: string,
    data: { quality?: string; notes?: string }
  ) {
    const entry = await prisma.sleepEntry.findUnique({
      where: { id: entryId },
    });

    if (!entry || entry.userId !== userId) {
      throw new AppError(404, 'ENTRY_NOT_FOUND', 'Sleep entry not found');
    }

    const updated = await prisma.sleepEntry.update({
      where: { id: entryId },
      data,
    });

    return updated;
  }
}

export const sleepService = new SleepService();
