import { Component, Inject, OnInit } from '@angular/core';
import {AsyncPipe, KeyValuePipe, NgClass, NgForOf} from "@angular/common";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  AbstractControl,
  FormArray,
  FormBuilder, FormControl,
  FormGroup, FormsModule, ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Order } from "../../../../models/order.model";
import { RecipeApiService } from "../../../../services/recipe-api.service";
import { Observable, startWith } from 'rxjs';
import { map } from "rxjs/operators";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatOptionModule} from "@angular/material/core";

@Component({
  selector: 'app-confirm-order-dialog',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf,
    NgClass,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOptionModule,
    AsyncPipe,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  templateUrl: './confirm-order-dialog.component.html',
  styleUrl: './confirm-order-dialog.component.scss'
})
export class ConfirmOrderDialogComponent  implements OnInit{
  recipeData: any[] = [];
  orderForm: FormGroup;
  filteredOptions: Observable<any[]>[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recipeService: RecipeApiService,
    private fb: FormBuilder
  ) {
    this.orderForm = this.fb.group({
      products: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.recipeService.fetchRecipes().subscribe((res) => {
      this.recipeData = res.recipes;
      this.initializeForm();
    });
  }

  get products(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }

  initializeForm(): void {
    Object.keys(this.data.products).forEach((key: string) => {
      const quantity = this.data.products[key].quantity;
      this.addProduct(key, quantity);
    });

    this.products.controls.forEach((productControl: AbstractControl, index: number) => {
      if (productControl instanceof FormGroup) {
        this.filteredOptions[index] = productControl.get('recipe')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      }
    });
  }

  addProduct(name: string, quantity: number): void {
    this.products.push(this.fb.group({
      name: [name, Validators.required],
      quantity: [quantity, Validators.required],
      recipe: ['', Validators.required]
    }));
  }

  private _filter(value: string): any[] {
    if (!value) {
      return this.recipeData;
    }
    const filterValue = value.toLowerCase();
    return this.recipeData.filter(option => option.recipe_name.toLowerCase().includes(filterValue));
  }

  protected readonly console = console;
}







