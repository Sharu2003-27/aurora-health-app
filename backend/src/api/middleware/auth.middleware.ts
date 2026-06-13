import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@utils/jwt';
import { logger } from '@utils/logger';
import { AuthenticatedRequest } from '@types/express';

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'MISSING_TOKEN',
          message: 'Authorization token is required',
        },
      });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    req.user = { ...decoded, id: decoded.userId };
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token',
      },
    });
  }
};
