import { Component, Inject, OnInit } from '@angular/core';
import {AsyncPipe, KeyValuePipe, NgClass, NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
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
import {OrdersApiService} from "../../../../services/orders-api.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {DialogRef} from "@angular/cdk/dialog";

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
  orderConfirmationForm: FormGroup;
  filteredOptions: Observable<any[]>[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recipeService: RecipeApiService,
    private orderService : OrdersApiService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<ConfirmOrderDialogComponent>,
    private toastrService : ToastrService
  ) {
    this.orderConfirmationForm = this.fb.group({
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
    return this.orderConfirmationForm.get('products') as FormArray;
  }

  initializeForm(): void {
    Object.keys(this.data.products).forEach((key: string) => {
      const quantity = this.data.products[key].quantity;
      this.addProduct(key, quantity);
    });

    this.products.controls.forEach((productControl: AbstractControl, index: number) => {
      if (productControl instanceof FormGroup) {
        this.filteredOptions[index] = productControl.get('recipe_name')!.valueChanges.pipe(
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
      recipe_name: ['', Validators.required],
      recipe_id: ['', Validators.required]
    }));
  }

  private _filter(value: string): any[] {
    if (!value) {
      return this.recipeData;
    }
    const filterValue = value.toLowerCase();
    return this.recipeData.filter(option => option.recipe_name.toLowerCase().includes(filterValue));
  }

  onOptionSelected(value: string, index: number): void {
    const [recipe_name, recipeRegistry_id] = value.split('|');
    const productControl = this.products.at(index) as FormGroup;
    productControl.get('recipe_name')!.setValue(recipe_name);
    productControl.get('recipe_id')!.setValue(recipeRegistry_id);
  }

  onSubmit(): void {
    const id = this.data.order_id;
    const form_values = this.orderConfirmationForm.value;

    console.log(form_values);
    this.orderService.startOrder(id, form_values).subscribe(

      (res: any) => {
        if (res.message === 'Order Start Successfully') {
          this.toastrService.success("Orden Comenzada");
          this.matDialogRef.close("yes")
          //TODO ACTUALIZAR EL STATE
        } else {
          this.toastrService.error(res.error.message);
          this.matDialogRef.close("no")
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.toastrService.error(error.error.message || "Error desconocido");
        this.matDialogRef.close("no")
      }
    );
  }



}
