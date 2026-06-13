import { Router, Request, Response } from 'express';

const router = Router();

// Export services
export * from './auth/auth.service';
export * from './health/user.service';
export * from './health/hydration.service';
export * from './health/sleep.service';
export * from './health/habits.service';
export * from './health/nutrition.service';
export * from './ai/voice.service';
export * from './ai/companion.service';
export * from './ai/memory.service';
export * from './ai/agent.service';
export * from './ai/insights.service';
