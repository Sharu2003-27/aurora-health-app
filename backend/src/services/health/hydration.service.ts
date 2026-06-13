import { prisma } from '@/database/config';
import { AppError } from '@utils/error-handler';

export class HydrationService {
  async addHydration(userId: string, amount: number, notes?: string) {
    if (amount <= 0) {
      throw new AppError(400, 'INVALID_AMOUNT', 'Amount must be greater than 0');
    }

    const entry = await prisma.hydrationEntry.create({
      data: {
        userId,
        amount,
        notes,
        source: 'manual',
      },
    });

    return entry;
  }

  async getTodayHydration(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const entries = await prisma.hydrationEntry.findMany({
      where: {
        userId,
        timestamp: {
          gte: today,
          lt: tomorrow,
        },
      },
      orderBy: { timestamp: 'desc' },
    });

    const total = entries.reduce((sum, entry) => sum + entry.amount, 0);

    return {
      total,
      entries,
      count: entries.length,
    };
  }

  async getHydrationHistory(userId: string, days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const entries = await prisma.hydrationEntry.findMany({
      where: {
        userId,
        timestamp: {
          gte: startDate,
        },
      },
      orderBy: { timestamp: 'desc' },
    });

    // Group by day
    const dailyData: Record<string, number> = {};
    entries.forEach((entry) => {
      const date = new Date(entry.timestamp).toISOString().split('T')[0];
      dailyData[date] = (dailyData[date] || 0) + entry.amount;
    });

    return {
      total: entries.reduce((sum, entry) => sum + entry.amount, 0),
      dailyData,
      entries,
    };
  }

  async deleteHydrationEntry(userId: string, entryId: string) {
    const entry = await prisma.hydrationEntry.findUnique({
      where: { id: entryId },
    });

    if (!entry || entry.userId !== userId) {
      throw new AppError(404, 'ENTRY_NOT_FOUND', 'Hydration entry not found');
    }

    await prisma.hydrationEntry.delete({
      where: { id: entryId },
    });

    return { success: true };
  }
}

export const hydrationService = new HydrationService();
