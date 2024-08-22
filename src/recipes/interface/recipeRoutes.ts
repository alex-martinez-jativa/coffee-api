import { Router } from 'express';
import { RecipeController } from '../application/recipeController.js';
import { RecipeRepository } from '../infrastructure/recipesRepository.js';

const recipeRouter = Router();

const recipeRepository = new RecipeRepository();
const recipeController = new RecipeController(recipeRepository);

recipeRouter.get('/recipes', recipeController.getAll.bind(recipeController));
recipeRouter.get('/recipes/random', recipeController.getRandom.bind(recipeController));
recipeRouter.get('/recipes/ingredient/:ingredient', recipeController.findByIngredient.bind(recipeController));

export {
  recipeRouter
};