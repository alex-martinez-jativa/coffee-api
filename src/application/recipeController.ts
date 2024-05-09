import { Request, Response } from 'express';
import { RecipeRepository } from '../infrastructure/recipesRepository';
import { ApiResponse } from '../interface/apiResponse';

export class RecipeController {
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
          
          const page = parseInt(req.query.page as string) || 1;
          let limit = parseInt(req.query.limit as string) || 10;
          limit = Math.min(limit, 50);
          
          const recipes = await RecipeRepository.getAll();
          
          const totalRecipes = recipes.length;
          const totalPages = Math.ceil(totalRecipes / limit);
          
          const nextPage = page < totalPages ? page + 1 : null;
          const prevPage = page > 1 ? page - 1 : null;

          const paginatedRecipes = recipes
            .slice((page - 1) * limit, page * limit)
            .map((recipe) => recipe)

          const response = new ApiResponse(paginatedRecipes, page, totalRecipes, nextPage, prevPage)

          res.status(200).json(response.getApiResponse())
          
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch data' });
        }
    }
}
