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
          throw new Error('Failed to fetch data');
        }
    }

    async getRandom(): Promise<Recipe[]> {
        try {
            const recipesData = await this.getAll();
            const index = Math.floor(Math.random() * recipesData.length);
            return [recipesData[index]];
        } catch (error) {
            throw new Error('Failed to fetch data');
        }
    }

    async findByIngredient(ingredient: string): Promise<Recipe[]> {
        try {
            const recipes = await this.getAll();
            const regex = new RegExp(`\\b${ingredient}\\b`, 'i');
            const filteredRecipes = recipes.filter((el) => regex.test(el.recipe.toLocaleLowerCase()));
            return filteredRecipes;
        } catch(error) {
            throw new Error('Failed to fetch data');
        }
    }
}
