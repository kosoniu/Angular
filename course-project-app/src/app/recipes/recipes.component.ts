import { Component, OnInit } from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipeService} from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipesService: RecipeService) { }

  ngOnInit() {
    this.recipesService.recipesSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }



}
