import fs from 'fs/promises';
import path from 'path';
import { Recipe } from '../domain/Recipe';

const RECIPES_FILE_PATH_EN = path.join('data', 'coffee-recipes-en.json');
const RECIPES_FILE_PATH_ES = path.join('data', 'coffee-recipes-es.json');

export class RecipeRepository {
    private language?: string;
    async getAll(): Promise<Recipe[]> {
        try {
            const file = this.getFileByLanguage();
            const jsonData = await fs.readFile(file, 'utf-8');
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

    setLanguage(lang: string = 'en') {
        this.language = lang;
    }

    getFileByLanguage() {
        if (this.language === 'es') {
            return RECIPES_FILE_PATH_ES;
        } else {
            return RECIPES_FILE_PATH_EN;
        }
    }
}
