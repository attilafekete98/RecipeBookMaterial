import { Component, Inject, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shoppin-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  shoppingListForm: FormGroup;

  constructor(private slService: ShoppingListService,
              @Inject(MAT_DIALOG_DATA) public data: {
                editMode: boolean,
                editedIngredientIndex: number,
                ingredient: Ingredient
              }) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.shoppingListForm = new FormGroup({
      name: new FormControl(this.data.ingredient.name, Validators.required),
      amount: new FormControl(this.data.ingredient.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
    });
  }

  onSubmit(): void {
    if (this.data.editMode) {
      this.slService.updateIngredient(this.data.editedIngredientIndex, this.shoppingListForm.value);
    } else {
      this.slService.addIngredient(this.shoppingListForm.value);
    }
  }

}
