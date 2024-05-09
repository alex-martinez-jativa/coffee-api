export interface IRecipe {
    id: string;
    name: string;
    description: string;
    recipe: string;
}

export class Recipe {
    id: string;
    name: string;
    description: string;
    recipe: string;

    constructor(data: IRecipe) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.recipe = data.recipe;
    }

    static fromJson(json: string): Recipe {
        const data = JSON.parse(json);
        return new Recipe(data);
    }

    toJson(): string {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            description: this.description,
            recipe: this.recipe
        });
    }
}
