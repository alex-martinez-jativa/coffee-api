export class PaginationData {
  currentPage: number;
  limit: number;
  recipes: any;
  constructor(page: number, limit: number, recipes: any){
    this.currentPage = page;
    this.limit = limit;
    this.recipes = recipes;
  }

  getPaginationData() {
    return this.recipes
            .slice((this.currentPage - 1) * this.limit, this.currentPage * this.limit)
            .map((recipe: any) => recipe)
  }

  getTotalPages() {
    const totalRecipes = this.getTotalRecipes();
    return Math.ceil(totalRecipes / this.limit);
  }

  getPrevPage() {
    return this.currentPage > 1 ? this.currentPage - 1 : null;
  }

  getNextPage() {
    return this.currentPage < this.getTotalPages() ? this.currentPage + 1 : null
  }

  getTotalRecipes() {
    return this.recipes.length;
  }
}