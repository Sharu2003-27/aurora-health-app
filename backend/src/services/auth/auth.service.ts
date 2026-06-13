import bcryptjs from 'bcryptjs';
import { prisma } from '@/database/config';
import { generateToken } from '@utils/jwt';
import { AppError } from '@utils/error-handler';
import { validateEmail, validatePassword } from '@utils/validations';
import { logger } from '@utils/logger';

export class AuthService {
  async signup(email: string, password: string, name: string) {
    // Validate inputs
    if (!validateEmail(email)) {
      throw new AppError(400, 'INVALID_EMAIL', 'Invalid email format');
    }

    if (!validatePassword(password)) {
      throw new AppError(400, 'WEAK_PASSWORD', 'Password does not meet requirements');
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError(409, 'USER_EXISTS', 'User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    logger.info(`New user created: ${user.id}`);

    // Generate token
    const token = generateToken(user.id, user.email);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async login(email: string, password: string) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    // Check password
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    logger.info(`User logged in: ${user.id}`);

    // Generate token
    const token = generateToken(user.id, user.email);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        wakeUpTime: user.wakeUpTime,
        bedtime: user.bedtime,
        activityLevel: user.activityLevel,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async oauthLogin(provider: 'google' | 'apple', providerId: string, email: string, name: string) {
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          provider === 'google' ? { googleId: providerId } : { appleId: providerId },
        ],
      },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          name,
          ...(provider === 'google' && { googleId: providerId }),
          ...(provider === 'apple' && { appleId: providerId }),
        },
      });

      logger.info(`New OAuth user created: ${user.id} (${provider})`);
    } else {
      // Update OAuth ID if not set
      if (provider === 'google' && !user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId: providerId },
        });
      } else if (provider === 'apple' && !user.appleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { appleId: providerId },
        });
      }
    }

    const token = generateToken(user.id, user.email);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}

export const authService = new AuthService();
