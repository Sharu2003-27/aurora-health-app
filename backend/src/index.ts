import app from './app';
import { config } from '@config/env';
import { logger } from '@utils/logger';
import { prisma } from '@/database/config';

const PORT = config.port;

const startServer = async () => {
  try {
    // Verify database connection
    await prisma.$queryRaw`SELECT 1`;
    logger.info('Database connection verified');

    // Start server
    app.listen(PORT, () => {
      logger.info(`Aurora Health API server running on port ${PORT}`);
      logger.info(`Environment: ${config.nodeEnv}`);
      logger.info(`Frontend URL: ${config.frontend.url}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
