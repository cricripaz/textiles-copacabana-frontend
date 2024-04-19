import { Component, OnInit } from '@angular/core';
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {RecipeApiService} from "../../../../services/recipe-api.service";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})


export class RegisterDialogComponent implements OnInit {

  ingredients: { name: string, weight: number, note: string }[] = [];

  user_id = 0

  constructor(
    private recipeService : RecipeApiService
  ) { }

  ngOnInit(): void {

   this.addIngredient();

    const token = localStorage.getItem('token');

    // Verificar si el token existe antes de intentar decodificar
    if (token) {
      const decodedToken: any = jwt_decode(token);
      console.log(decodedToken)
      if (decodedToken && decodedToken.user_id) {
        this.user_id = decodedToken.user_id;
        console.log('user_id : ', this.user_id)
      } else {
        console.error('El token no contiene la propiedad "role_id".');
      }
    }


  }

  onSubmit(DataUserForm: NgForm) {
    //TODO verificar porque no funciona el .valid
    console.log('data sin formatear',DataUserForm.value)
    if (true) {
      const formData = DataUserForm.value;
      const postData = this.reformatData(formData);

      // Llama al servicio para realizar la solicitud POST
      this.recipeService.createRecipe(postData).subscribe(response => {
        console.log('data formated :',postData)
        console.log(response); // Maneja la respuesta del servidor
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
      weight: formData.weight,
      id_user: this.user_id,
      ingredients: ingredients
    };
  }

  private extractIngredients(formData: any) {
    const ingredients = [];
    let i = 0;


    while (formData['ingredient' + i] !== undefined) {
      const ingredientName = formData['ingredient' + i];
      const ingredientWeight = formData['weigh' + i];
      const ingredientNote = formData['note' + i];

      ingredients.push({
        name: ingredientName,
        weight: ingredientWeight,
        note: ingredientNote
      });

      i++;
    }

    return ingredients;
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




