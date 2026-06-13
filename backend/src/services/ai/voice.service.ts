import { OpenAI } from 'openai';
import { config } from '@config/env';
import { logger } from '@utils/logger';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

export class VoiceService {
  async transcribeAudio(audioBuffer: Buffer | string): Promise<string> {
    try {
      const audioFile = typeof audioBuffer === 'string' 
        ? Buffer.from(audioBuffer, 'base64')
        : audioBuffer;

      const response = await openai.audio.transcriptions.create({
        file: audioFile as any,
        model: config.openai.whisperModel,
        language: 'en',
      });

      logger.info(`Audio transcribed: ${response.text.substring(0, 50)}...`);
      return response.text;
    } catch (error) {
      logger.error('Transcription error:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  async generateSpeech(text: string): Promise<Buffer> {
    try {
      // Using OpenAI TTS API
      const response = await openai.audio.speech.create({
        model: 'tts-1',
        voice: 'nova',
        input: text,
      });

      const audioBuffer = await response.arrayBuffer();
      logger.info(`Speech generated from text: ${text.substring(0, 50)}...`);
      return Buffer.from(audioBuffer);
    } catch (error) {
      logger.error('Text-to-speech error:', error);
      throw new Error('Failed to generate speech');
    }
  }
}

export const voiceService = new VoiceService();
