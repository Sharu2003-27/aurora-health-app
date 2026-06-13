import { Request, Response, NextFunction } from 'express';
import { logger } from '@utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const method = req.method;
  const path = req.path;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    logger.http(`${method} ${path} - ${statusCode} (${duration}ms)`);
  });

  next();
};
