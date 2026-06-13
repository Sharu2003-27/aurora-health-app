import { Router } from 'express';
import { nutritionController } from '@controllers/nutrition.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', (req, res) => nutritionController.logMeal(req as any, res));
router.get('/today', (req, res) => nutritionController.getTodayNutrition(req as any, res));
router.get('/history', (req, res) => nutritionController.getNutritionHistory(req as any, res));
router.delete('/:entryId', (req, res) => nutritionController.deleteNutritionEntry(req as any, res));

export default router;
