import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {RecipeApiService} from "../../../../services/recipe-api.service";
import jwt_decode from "jwt-decode";
import {InventoryApiService} from "../../../../services/inventory-api.service";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})


export class RegisterDialogComponent implements OnInit {


  ingredients: { name: string, weight: number, note: string, dyeInventory_id?: number }[] = [];
  allMaterials: any[] = [];
  filteredMaterials!: Observable<any[]>;
  user_id = 0;

  constructor(
    private recipeService: RecipeApiService,
    private inventoryService: InventoryApiService,
    private matDialogRef : MatDialogRef<RegisterDialogComponent>
  ) { }

  ngOnInit(): void {
    this.addIngredient();

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken && decodedToken.user_id) {
        this.user_id = decodedToken.user_id;
      } else {
        console.error('El token no contiene la propiedad "user_id".');
      }
    }

    this.inventoryService.fetchInventory().subscribe(products => {
      this.allMaterials = products.data;
      this.filteredMaterials = of(this.allMaterials);
    });
  }

  onInputChange(value: string, index: number): void {
    this.filteredMaterials = of(this.allMaterials).pipe(
      map(products => products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      ))
    );
  }

  onSelectionChange(selectedMaterial: any, index: number): void {
    this.ingredients[index].dyeInventory_id = selectedMaterial.dyeInventory_id;
    this.ingredients[index].name = selectedMaterial.name;

    console.log(selectedMaterial,index)
  }

  onSubmit(DataUserForm: NgForm) {
    if (true) {
      const formData = DataUserForm.value;
      const postData = this.reformatData(formData);

      this.recipeService.createRecipe(postData).subscribe(response => {

        this.matDialogRef.close()
      }, error => {
        console.error(error);
      });
    } else {
      // Manejo de validación de formulario
      //TODO IMPLEMENTAR TOAST DE LLENAR CAMPOS
    }
  }

  private reformatData(formData: any) {
    const ingredients = this.extractIngredients(formData);
    return {
      name: formData.name,
      id_user: this.user_id,
      ingredients: ingredients
    };
  }

  private extractIngredients(formData: any) {
    return this.ingredients;
  }

  addIngredient() {
    this.ingredients.push({ name: '', weight: 0, note: '' });
  }

  removeIngredient(index: number) {
    if (this.ingredients.length > 1) {
      this.ingredients.splice(index, 1);
    }
  }

}



