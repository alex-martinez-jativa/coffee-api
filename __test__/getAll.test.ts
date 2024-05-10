import { Request, Response } from "express";
import { RecipeController } from '../src/application/recipeController';

const mockRecipesData = [{
  "name": "Café Latte",
  "description": "A smooth blend of espresso and steamed milk, topped with a layer of milk foam.",
  "recipe": "1 shot of espresso + steamed milk + milk foam.",
  "id": "4043dcc4-5b54-49b9-9a6b-e3e22374a906"
},
{
  "name": "Cappuccino",
  "description": "A balanced mix of espresso, steamed milk, and milk foam, served in a small-sized cup.",
  "recipe": "1 shot of espresso + steamed milk + milk foam.",
  "id": "46ce0c75-3fa1-440a-9c65-33433d8e649c"
},
{
  "name": "Espresso",
  "description": "A small amount of highly concentrated and strong coffee, served in a small cup.",
  "recipe": "1 shot of espresso (approximately 30ml).",
  "id": "bd665b7a-81be-4dc7-91b5-b58098d4aa1b"
}];

describe('test recipesController getAll', () => {
  let controller: RecipeController;
  let repository = { getAll: jest.fn() };

  const req = {
    query: { 
      page: '1',
      limit: '2'
    }
  } as unknown as Request;

  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  } as unknown as Response;
  
  beforeEach(() => {
    controller = new RecipeController(repository as any);
  });

  test('should return list of recipes with response data', async () => {

    repository.getAll.mockReturnValueOnce(mockRecipesData);
    const responseData = mockRecipesData.slice(0, -1);
    await controller.getAll(req, res);

    expect(repository.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: responseData,
      page: 1,
      totalCount: 3,
      nextPage: 2,
      prevPage: null
    });
  });
});
