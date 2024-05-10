import { Request, Response } from "express";
import { RecipeController } from "../src/application/recipeController";

const mockRecipesData = [{
  "name": "Café Latte",
  "description": "A smooth blend of espresso and steamed milk, topped with a layer of milk foam.",
  "recipe": "1 shot of espresso + steamed milk + milk foam.",
  "id": "4043dcc4-5b54-49b9-9a6b-e3e22374a906"
}];

describe('recipes controller getRandom', () => {
  let controller: RecipeController;
  let repository = { getRandom: jest.fn() };

  const req = {
    query: {}
  } as unknown as Request;

  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  } as unknown as Response;
  
  beforeEach(() => {
    controller = new RecipeController(repository as any);
  });

  test('should return random recipe', async () => {
    repository.getRandom.mockReturnValueOnce(mockRecipesData);
    
    await controller.getRandom(req, res);

    expect(repository.getRandom).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenLastCalledWith({
      data: mockRecipesData
    })
  })
})