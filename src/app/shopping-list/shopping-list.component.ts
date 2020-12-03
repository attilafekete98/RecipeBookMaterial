import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppin-list.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  columnHeaders: string[] = ['name', 'amount', 'actions'];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService, public editDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onAddItem(): void {
    this.editDialog.open(ShoppingEditComponent);
  }

  onEditItem(index: number): void {
    this.slService.startedEditing.next(index);
    this.editDialog.open(ShoppingEditComponent);
  }

  onDeleteItem(index: number): void {
    this.slService.deleteIngredient(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
