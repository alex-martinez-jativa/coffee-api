import { Request, Response } from "express";
import { RecipeController } from '../src/application/recipeController';

const repository = jest.mock('../src/infrastructure/recipesRepository', () => {
  return jest.fn().mockImplementation(() => {
    return { getAll: []}
  })
});

describe('test recipesController', () => {
  let controller: RecipeController;
  let repository = { getAll: jest.fn() };

  const req = {
    query: { 
      page: '1',
      limit: '10'
    }
  } as unknown as Request;

  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  } as unknown as Response;
  
  beforeEach(() => {
    controller = new RecipeController(repository);
  });

  test('getAll()', async () => {

    repository.getAll.mockReturnValueOnce([{}]);
    
    await controller.getAll(req, res);

    expect(repository.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
