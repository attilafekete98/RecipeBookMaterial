import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private notificationService: NotificationService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://angular-tutorial-491d2.firebaseio.com/recipes.json', recipes)
      .subscribe(
        response => {
          this.notificationService.openSuccess('Storing the data was successful', 'Close', 2500);
        },
        () => {
          this.notificationService.openError('Storing the data was unsuccessful', 'Close', 2500);
        });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://angular-tutorial-491d2.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
