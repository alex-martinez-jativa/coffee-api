import { Router } from 'express';
import { RecipeController } from '../application/recipeController';
import { RecipeRepository } from '../infrastructure/recipesRepository';

const router = Router();

const recipeRepository = new RecipeRepository();
const recipeController = new RecipeController(recipeRepository);

router.get('/recipes', recipeController.getAll.bind(recipeController));

export {
  router
};