import fs from 'fs/promises';
import path from 'path';
import { Recipe } from '../domain/Recipe';

const RECIPES_FILE_PATH = path.join('data', 'coffee-recipes-es.json');

export class RecipeRepository {
    async getAll(): Promise<Recipe[]> {
        try {
            const jsonData = await fs.readFile(RECIPES_FILE_PATH, 'utf-8');
            const recipesData = JSON.parse(jsonData);
            return recipesData.map((recipeData: Recipe) => new Recipe(recipeData));
        } catch (error) {
          throw new Error('Failed to fetch data')
        }
    }
}
