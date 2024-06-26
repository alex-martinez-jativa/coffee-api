import { Request, Response } from 'express';
import { RecipeRepository } from '../infrastructure/recipesRepository.js';
import { ApiResponse } from '../interface/apiResponse.js';
import { PaginationData } from '../interface/paginationData.js';

export class RecipeController {

  private readonly recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async getAll(req: Request, res: Response): Promise<void> {
      try {
        
        const page = parseInt(req.query.page as string) || 1;
        let limit = parseInt(req.query.limit as string) || 10;
        limit = Math.min(limit, 50);
        
        const lang = req.query.lang?.toString();
        this.recipeRepository.setLanguage(lang);

        const recipes = await this.recipeRepository.getAll();
        
        const pagination = new PaginationData(page, limit, recipes);

        const response = new ApiResponse(
          pagination.getPaginationData(),
          pagination.getCurrentPage(), 
          pagination.getTotalRecipes(), 
          pagination.getNextPage(), 
          pagination.getPrevPage()
        )

        res.status(200).json(response.getApiPaginationResponse())
        
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
      }
  }

  async getRandom(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.query.lang?.toString();
      this.recipeRepository.setLanguage(lang);

      const recipe = await this.recipeRepository.getRandom();
      const response = new ApiResponse(recipe);

      res.status(200).json(response.getApiResponse());
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }

  async findByIngredient(req: Request, res: Response): Promise<void> {
    const { params: { ingredient }  } = req;

    if (!ingredient) {
      res.status(500).json({ error: 'missed ingredient param' });
      return;
    }

    try {
      const lang = req.query.lang?.toString();
      this.recipeRepository.setLanguage(lang);
      const _ingredient = ingredient.trim().toLowerCase();
      const recipes = await this.recipeRepository.findByIngredient(_ingredient);
      if (recipes.length === 0) {
        res.status(200).json({message: 'no match to ingredient'})
      } else {
        res.status(200).json(recipes);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
}
