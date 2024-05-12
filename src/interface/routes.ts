import { Router } from 'express';
import { RecipeController } from '../application/recipeController.js';
import { RecipeRepository } from '../infrastructure/recipesRepository.js';

const router = Router();

const recipeRepository = new RecipeRepository();
const recipeController = new RecipeController(recipeRepository);

router.get('/recipes', recipeController.getAll.bind(recipeController));
router.get('/recipes/random', recipeController.getRandom.bind(recipeController));
router.get('/recipes/ingredient/:ingredient', recipeController.findByIngredient.bind(recipeController));

export {
  router
};