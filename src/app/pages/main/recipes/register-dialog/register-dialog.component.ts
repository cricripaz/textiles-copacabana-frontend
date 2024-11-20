import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeApiService } from '../../../../services/recipe-api.service';
import jwt_decode from 'jwt-decode';
import { InventoryApiService } from '../../../../services/inventory-api.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  recipeForm: FormGroup;
  allMaterials: any[] = [];
  filteredMaterials!: Observable<any[]>;
  user_id = 0;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeApiService,
    private inventoryService: InventoryApiService,
    private matDialogRef: MatDialogRef<RegisterDialogComponent>,
    private toastr: ToastrService
  ) {
    // Crear el formulario reactivo
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      ingredients: this.fb.array([]) // Inicializar el FormArray
    });
  }

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

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get ingredientGroups(): FormGroup[] {
    return this.ingredients.controls as FormGroup[];
  }

  addIngredient() {
    const ingredientGroup = this.fb.group({
      name: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(0.01)]],
      note: [''],  // No es requerido según tus necesidades
      dyeInventory_id: [null, Validators.required]  // Agrega el campo para dyeInventory_id
    });
    this.ingredients.push(ingredientGroup);
  }


  removeIngredient(index: number) {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  onInputChange(value: string, index: number): void {
    this.filteredMaterials = of(this.allMaterials).pipe(
      map(products => products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      ))
    );
  }

  onSelectionChange(selectedMaterial: any, index: number): void {
    const ingredient = this.ingredients.at(index) as FormGroup;
    ingredient.get('name')?.setValue(selectedMaterial.name);
    ingredient.get('dyeInventory_id')?.setValue(selectedMaterial.dyeInventory_id);  // Asigna dyeInventory_id
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const postData = {
        name: this.recipeForm.get('name')?.value,
        id_user: this.user_id,
        ingredients: this.recipeForm.get('ingredients')?.value.map((ingredient: any) => ({
          name: ingredient.name,
          weight: ingredient.weight,
          note: ingredient.note,
          dyeInventory_id: ingredient.dyeInventory_id
        }))
      };

      this.recipeService.createRecipe(postData).subscribe(response => {
        this.toastr.success('Receta registrada exitosamente');
        this.matDialogRef.close({recipe : response , message : 'yes'});
      }, error => {
        this.toastr.error('Error al registrar la receta');
      });
    } else {
      this.toastr.warning('Por favor, completa todos los campos requeridos');
    }
  }

}
