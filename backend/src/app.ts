import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from '@config/env';
import { logger } from '@utils/logger';
import apiRoutes from '@routes/index';
import { errorHandler } from '@middlewares/errorHandler.middleware';
import { requestLogger } from '@middlewares/requestLogger.middleware';

const app: Express = express();

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: [config.frontend.url, 'http://localhost:8081', 'http://localhost:3000'],
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Body Parser Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request Logger
app.use(requestLogger);

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date(),
      uptime: process.uptime(),
    },
  });
});

// API Routes
app.use('/api', apiRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.path} not found`,
    },
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
