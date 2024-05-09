import { Request, Response } from 'express';
import { RecipeRepository } from '../infrastructure/recipesRepository';

export class RecipeController {
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
          const page = parseInt(req.query.page as string) || 1;
          let limit = parseInt(req.query.limit as string) || 10;
          limit = Math.min(limit, 50);
          const recipes = await RecipeRepository.getAll();
          const paginatedRecipes = recipes.slice((page - 1) * limit, page * limit);

          res.json(paginatedRecipes.map(recipe => recipe));
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch data' });
        }
    }
}
