import { Request, Response } from 'express';
import { authService } from '@services/auth/auth.service';
import { handleError } from '@utils/error-handler';
import { logger } from '@utils/logger';

export class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_FIELDS',
            message: 'Email, password, and name are required',
          },
        });
      }

      const result = await authService.signup(email, password, name);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_FIELDS',
            message: 'Email and password are required',
          },
        });
      }

      const result = await authService.login(email, password);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async oauthLogin(req: Request, res: Response) {
    try {
      const { provider, token, email, name } = req.body;

      if (!provider || !token) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_FIELDS',
            message: 'Provider and token are required',
          },
        });
      }

      // Verify token with provider (simplified)
      const result = await authService.oauthLogin(provider as 'google' | 'apple', token, email, name);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }
}

export const authController = new AuthController();
