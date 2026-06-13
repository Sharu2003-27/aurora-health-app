import { Request } from 'express';
import { JWTPayload } from './auth';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload & { id: string };
      startTime?: number;
    }
  }
}

export type AuthenticatedRequest = Request & { user: JWTPayload & { id: string } };
