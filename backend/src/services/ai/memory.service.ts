import { prisma } from '@/database/config';
import { logger } from '@utils/logger';

export class MemoryService {
  async addMemory(
    userId: string,
    observation: string,
    category: 'pattern' | 'preference' | 'achievement' | 'challenge',
    importance: number = 5,
    relevantUntil?: Date
  ) {
    const memory = await prisma.aiMemory.create({
      data: {
        userId,
        observation,
        category,
        importance: Math.max(1, Math.min(10, importance)),
        relevantUntil,
      },
    });

    logger.info(`Memory added for user ${userId}: ${observation.substring(0, 50)}...`);
    return memory;
  }

  async getMemories(userId: string, category?: string, limit: number = 10) {
    const memories = await prisma.aiMemory.findMany({
      where: {
        userId,
        ...(category && { category }),
        OR: [
          { relevantUntil: null },
          { relevantUntil: { gt: new Date() } },
        ],
      },
      orderBy: [{ importance: 'desc' }, { createdAt: 'desc' }],
      take: limit,
    });

    return memories;
  }

  async generateInsights(userId: string): Promise<string[]> {
    const memories = await this.getMemories(userId, undefined, 20);
    const insights: string[] = [];

    // Pattern-based insights
    const patterns = memories.filter(m => m.category === 'pattern');
    if (patterns.length > 0) {
      insights.push(...patterns.slice(0, 2).map(p => p.observation));
    }

    // Challenge-based insights
    const challenges = memories.filter(m => m.category === 'challenge');
    if (challenges.length > 0) {
      insights.push(...challenges.slice(0, 1).map(c => c.observation));
    }

    // Achievement-based insights
    const achievements = memories.filter(m => m.category === 'achievement');
    if (achievements.length > 0) {
      insights.push(...achievements.slice(0, 1).map(a => a.observation));
    }

    return insights.slice(0, 3);
  }

  async updateMemory(memoryId: string, userId: string, data: any) {
    const memory = await prisma.aiMemory.findUnique({
      where: { id: memoryId },
    });

    if (!memory || memory.userId !== userId) {
      throw new Error('Memory not found');
    }

    return prisma.aiMemory.update({
      where: { id: memoryId },
      data,
    });
  }
}

export const memoryService = new MemoryService();
