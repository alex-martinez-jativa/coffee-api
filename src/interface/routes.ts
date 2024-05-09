import { Router } from 'express';
import { RecipeController } from '../application/recipeController';

const router = Router();

router.get('/recipes', RecipeController.getAll);

export {
  router
};