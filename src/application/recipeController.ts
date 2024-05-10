import { Request, Response } from 'express';
import { RecipeRepository } from '../infrastructure/recipesRepository';
import { ApiResponse } from '../interface/apiResponse';
import { PaginationData } from '../interface/paginationData';

export class RecipeController {
    static async getAll(req: Request, res: Response): Promise<void> {
        try {
          
          const page = parseInt(req.query.page as string) || 1;
          let limit = parseInt(req.query.limit as string) || 10;
          limit = Math.min(limit, 50);
          
          const recipes = await RecipeRepository.getAll();
          
          const pagination = new PaginationData(page, limit, recipes);

          const response = new ApiResponse(
            pagination.getPaginationData(),
            pagination.currentPage, 
            pagination.getTotalRecipes(), 
            pagination.getNextPage(), 
            pagination.getPrevPage()
          )

          res.status(200).json(response.getApiResponse())
          
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch data' });
        }
    }
}
