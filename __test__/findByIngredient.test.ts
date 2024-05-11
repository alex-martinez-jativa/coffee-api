import { Request, Response } from "express";
import { RecipeController } from "../src/application/recipeController";

const mockRecipesData = [{
  "name": "Café Latte",
  "description": "A smooth blend of espresso and steamed milk, topped with a layer of milk foam.",
  "recipe": "1 shot of espresso + steamed milk + milk foam.",
  "id": "4043dcc4-5b54-49b9-9a6b-e3e22374a906"
},
{
  "name": "Espresso",
  "description": "A small amount of highly concentrated and strong coffee, served in a small cup.",
  "recipe": "1 shot of espresso (approximately 30ml).",
  "id": "bd665b7a-81be-4dc7-91b5-b58098d4aa1b"
}];

const mockResponseData = {
  data: [{
    "name": "Café Latte",
    "description": "A smooth blend of espresso and steamed milk, topped with a layer of milk foam.",
    "recipe": "1 shot of espresso + steamed milk + milk foam.",
    "id": "4043dcc4-5b54-49b9-9a6b-e3e22374a906"
  }]
}

describe('recipes controller findByIngredient', () => {
  let controller: RecipeController;
  let repository: any;

  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  } as unknown as Response;
  
  test('should return match ingredient recipe', async () => {

    repository = {
      findByIngredient: jest.fn().mockResolvedValue(mockResponseData),
      getAll: jest.fn().mockResolvedValue(mockRecipesData)
    };
    controller = new RecipeController(repository as any);

    const ingredient = 'steamed';
  
    const req = {
      params: {
        ingredient: ingredient
      }
    } as unknown as Request;
    
    await controller.findByIngredient(req, res);

    expect(repository.findByIngredient).toHaveBeenCalledWith(ingredient);
    expect(repository.findByIngredient).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenLastCalledWith(mockResponseData);
  })

  test('should return a message if no match to ingredient', async () => {
    repository = {
      findByIngredient: jest.fn().mockResolvedValue({message: 'no match to ingredient'}),
      getAll: jest.fn().mockResolvedValue(mockRecipesData)
    };
    controller = new RecipeController(repository as any);
    const ingredient = 'chocolate';
    const req = {
      params: {
        ingredient: ingredient
      }
    } as unknown as Request;

    await controller.findByIngredient(req, res);

    expect(repository.findByIngredient).toHaveBeenCalledWith(ingredient);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({message: 'no match to ingredient'});
  });
});