import { OpenAI } from 'openai';
import { config } from '@config/env';
import { logger } from '@utils/logger';
import { prisma } from '@/database/config';
import { AppError } from '@utils/error-handler';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

export class CompanionService {
  async chat(userId: string, userMessage: string, isVoice: boolean = false, transcription?: string) {
    try {
      // Get user context
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new AppError(404, 'USER_NOT_FOUND', 'User not found');
      }

      // Get health metrics for context
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const [hydration, sleep, habits, memories] = await Promise.all([
        prisma.hydrationEntry.aggregate({
          where: {
            userId,
            timestamp: { gte: today, lt: tomorrow },
          },
          _sum: { amount: true },
        }),
        prisma.sleepEntry.findFirst({
          where: {
            userId,
            startTime: { gte: today, lt: tomorrow },
          },
          orderBy: { endTime: 'desc' },
        }),
        prisma.habitCompletion.count({
          where: {
            userId,
            completedAt: { gte: today, lt: tomorrow },
          },
        }),
        prisma.aiMemory.findMany({
          where: { userId },
          orderBy: { importance: 'desc' },
          take: 5,
        }),
      ]);

      // Build context prompt
      const contextPrompt = this.buildContextPrompt({
        userName: user.name,
        age: user.age,
        weight: user.weight,
        height: user.height,
        activityLevel: user.activityLevel,
        todayHydration: hydration._sum.amount || 0,
        lastSleep: sleep ? sleep.duration : null,
        completedHabitsToday: habits,
        memories: memories.map(m => m.observation),
      });

      // Get AI response
      const systemPrompt = `You are Aurora, a personal AI health companion. You're friendly, supportive, and knowledgeable about health. 
You help users understand their health through conversation. You can:
1. Answer questions about their health data
2. Provide personalized insights and recommendations
3. Encourage healthy habits
4. Help log health data (hydration, sleep, habits, etc.)

Always be warm, encouraging, and non-judgmental. Keep responses concise and actionable.

Context about the user:
${contextPrompt}`;

      const response = await openai.chat.completions.create({
        model: config.openai.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const assistantMessage = response.choices[0]?.message?.content || '';

      // Save conversation
      await Promise.all([
        prisma.chatMessage.create({
          data: {
            userId,
            type: 'user',
            content: userMessage,
            isVoice,
            transcription,
          },
        }),
        prisma.chatMessage.create({
          data: {
            userId,
            type: 'assistant',
            content: assistantMessage,
            isVoice: false,
          },
        }),
      ]);

      logger.info(`Chat completed for user ${userId}`);

      // Parse actions from response
      const actions = this.extractActions(userMessage, assistantMessage);

      return {
        message: assistantMessage,
        actions,
      };
    } catch (error) {
      logger.error('Chat error:', error);
      throw error;
    }
  }

  private buildContextPrompt(context: any): string {
    return `
- User: ${context.userName}
- Age: ${context.age || 'Not specified'}
- Today's hydration: ${context.todayHydration}ml
- Last night's sleep: ${context.lastSleep ? Math.round(context.lastSleep / 60) + ' hours' : 'No data'}
- Habits completed today: ${context.completedHabitsToday}
- Recent observations: ${context.memories.join(', ') || 'None yet'}
    `;
  }

  private extractActions(userMessage: string, assistantMessage: string): any[] {
    const actions = [];

    // Check for hydration logging
    if (/drank|water|ml|glasses/i.test(userMessage)) {
      const amountMatch = userMessage.match(/(\d+)\s*(ml|l|glass|cups?)/i);
      if (amountMatch) {
        const amount = amountMatch[1];
        const unit = amountMatch[2];
        let ml = parseInt(amount);
        if (unit.toLowerCase() === 'l') ml *= 1000;
        if (unit.match(/glass|cup/i)) ml *= 250;

        actions.push({
          type: 'log_hydration',
          data: { amount: ml },
        });
      }
    }

    // Check for sleep logging
    if (/slept|sleep|hours?/i.test(userMessage)) {
      const sleepMatch = userMessage.match(/(\d+)\.?(\d*)\s*hours?/i);
      if (sleepMatch) {
        const hours = parseFloat(sleepMatch[0]);
        const minutes = Math.round(hours * 60);
        actions.push({
          type: 'log_sleep',
          data: { duration: minutes },
        });
      }
    }

    // Check for habit completion
    if (/completed|finished|done|did/i.test(userMessage)) {
      actions.push({
        type: 'suggest_habit_log',
        data: { suggestion: 'Would you like me to log a habit completion?' },
      });
    }

    return actions;
  }
}

export const companionService = new CompanionService();
