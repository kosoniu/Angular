import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://hips.hearstapps.com/del.h-cdn.co/assets/18/11/2048x1024/landscape-1520957481-grilled-salmon-horizontal.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 10),
      ]
    ),
    new Recipe(
      'Lazanki',
      'This is delicious',
      'https://static.gotujmy.pl/ZDJECIE_PRZEPISU_ETAP/lazanki-z-kapusta-i-kielbasa-406474.jpg',
      [
        new Ingredient('Noodles', 1),
        new Ingredient('Becon', 10),
      ]
    )
  ];

  recipesSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

}
