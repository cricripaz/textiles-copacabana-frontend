import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RecipeApiService} from "../../../../services/recipe-api.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {data} from "autoprefixer";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  form!: FormGroup;
   id! : number
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recipeService: RecipeApiService,
    private toastr : ToastrService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    console.log("Datos recibidos en el diálogo:", this.data);
    this.id = this.data.recipe.recipeRegistry_id
    if (this.data && this.data.recipe) {
      // Convertir ingredients de objeto a array
      let ingredientsArray = [];
      if (this.data.recipe.ingredients && typeof this.data.recipe.ingredients === 'object') {
        for (const key in this.data.recipe.ingredients) {
          if (this.data.recipe.ingredients.hasOwnProperty(key)) {
            ingredientsArray.push({
              name: key,
              ...this.data.recipe.ingredients[key]
            });
          }
        }
      }
      this.data.recipe.ingredients = ingredientsArray; // Reemplaza el objeto por el array transformado
      this.loadFormData(this.data.recipe);
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      weight: [0, Validators.required],
      ingredients: this.fb.array([])
    });
  }

  private loadFormData(data: any): void {
    console.log(data)
    this.form.patchValue({
      name: data.recipe_name,
      weight: data.recipe_total_weight
    });
    this.setIngredients(data.ingredients);
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  private setIngredients(ingredients: any[]): void {
    const ingredientFGs = ingredients.map(ingredient =>
      this.fb.group({
        name: [ingredient.name, Validators.required],
        weight: [ingredient.weight || 0, Validators.required],
        note: [ingredient.note || '', Validators.required]
      })
    );
    const ingredientArray = this.fb.array(ingredientFGs);
    this.form.setControl('ingredients', ingredientArray);
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.group({
      name: ['', Validators.required],
      weight: [0, Validators.required],
      note: ['', Validators.required]
    }));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  onSubmit(): void {

    this.recipeService.editRecipe(this.form.value,this.id).subscribe(
      () => {
        this.toastr.success('La Receta se editó exitosamente.', 'Éxito'); // Muestra el toastr de éxito
        this.dialogRef.close()
        //TODO update al array investigar
      },
      error => {
        console.log(error)
        this.toastr.error( error, 'Error'); // Muestra el toastr de error si ocurrió un error
      }
    );
  }
}
