import { Request, Response } from 'express';
import { companionService } from '@services/ai/companion.service';
import { voiceService } from '@services/ai/voice.service';
import { memoryService } from '@services/ai/memory.service';
import { handleError } from '@utils/error-handler';
import { AuthenticatedRequest } from '@types/express';
import { logger } from '@utils/logger';

export class AIController {
  async textChat(req: AuthenticatedRequest, res: Response) {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_MESSAGE',
            message: 'Message is required',
          },
        });
      }

      const response = await companionService.chat(req.user!.userId, message, false);

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async voiceChat(req: AuthenticatedRequest, res: Response) {
    try {
      const { audio } = req.body; // base64 encoded audio

      if (!audio) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_AUDIO',
            message: 'Audio is required',
          },
        });
      }

      // Transcribe audio
      const transcription = await voiceService.transcribeAudio(audio);
      logger.info(`Voice input transcribed: ${transcription.substring(0, 50)}...`);

      // Get AI response
      const response = await companionService.chat(req.user!.userId, transcription, true, transcription);

      // Generate speech response
      const audioResponse = await voiceService.generateSpeech(response.message);

      res.status(200).json({
        success: true,
        data: {
          ...response,
          transcription,
          audioBase64: audioResponse.toString('base64'),
        },
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async getMemories(req: AuthenticatedRequest, res: Response) {
    try {
      const category = req.query.category as string | undefined;
      const memories = await memoryService.getMemories(req.user!.userId, category);

      res.status(200).json({
        success: true,
        data: memories,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }

  async addMemory(req: AuthenticatedRequest, res: Response) {
    try {
      const { observation, category, importance, relevantUntil } = req.body;

      const memory = await memoryService.addMemory(
        req.user!.userId,
        observation,
        category,
        importance,
        relevantUntil ? new Date(relevantUntil) : undefined
      );

      res.status(201).json({
        success: true,
        data: memory,
      });
    } catch (error) {
      const { statusCode, body } = handleError(error);
      res.status(statusCode).json(body);
    }
  }
}

export const aiController = new AIController();
