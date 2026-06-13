import { Request, Response, NextFunction } from 'express';
import { handleError } from '@utils/error-handler';
import { logger } from '@utils/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error:', err);
  const { statusCode, body } = handleError(err);
  res.status(statusCode).json(body);
};
