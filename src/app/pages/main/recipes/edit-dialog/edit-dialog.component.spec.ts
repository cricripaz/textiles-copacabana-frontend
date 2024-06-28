import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RecipeApiService } from '../../../../services/recipe-api.service';
import { EditDialogComponent } from './edit-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;
  let mockRecipeApiService: any;
  let mockMatDialogRef: any;
  let mockToastrService: any;
  let mockDialogData: any;

  beforeEach(async () => {
    mockRecipeApiService = {
      editRecipe: jest.fn()
    };

    mockMatDialogRef = {
      close: jest.fn()
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockDialogData = {
      recipe: {
        recipeRegistry_id: 87,
        recipe_name: "Color Rosa Pastel",
        ingredients: {
          "CANTONIC YELLOW X-GL 250%": {
            id: 1111,
            weight: 0.53,
            note: null,
            dyeType: "COLORANTE"
          },
          "DIANIK BLACK": {
            id: 1122,
            weight: 0.52,
            note: null,
            dyeType: "COLORANTE"
          }
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [EditDialogComponent],
      providers: [
        FormBuilder,
        { provide: RecipeApiService, useValue: mockRecipeApiService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with dialog data', () => {
    component.ngOnInit();
    expect(component.id).toBe(mockDialogData.recipe.recipeRegistry_id);
    expect(component.form).toBeDefined();
    expect(component.form.controls['name'].value).toBe(mockDialogData.recipe.recipe_name);
    expect(component.ingredients.length).toBe(2);
    expect(component.ingredients.at(0).value).toEqual({
      dyeInventory_id: 1111,
      name: "CANTONIC YELLOW X-GL 250%",
      weight: 0.53,
      note: ""
    });
    expect(component.ingredients.at(1).value).toEqual({
      dyeInventory_id: 1122,
      name: "DIANIK BLACK",
      weight: 0.52,
      note: ""
    });
  });

  it('should call editRecipe and close dialog on success', () => {
    component.ngOnInit();
    component.form.setValue({
      name: 'Color Rosa Pastel',
      ingredients: [
        { dyeInventory_id: 1111, name: "CANTONIC YELLOW X-GL 250%", weight: 0.53, note: "" },
        { dyeInventory_id: 1122, name: "DIANIK BLACK", weight: 0.52, note: "" }
      ]
    });

    mockRecipeApiService.editRecipe.mockReturnValue(of({ message: 'La Receta se editó exitosamente.' }));

    component.onSubmit();

    expect(mockRecipeApiService.editRecipe).toHaveBeenCalledWith(component.form.value, 87);
    expect(mockToastrService.success).toHaveBeenCalledWith('La Receta se editó exitosamente.', 'Éxito');
    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });

  it('should show error message on editRecipe failure', () => {
    const error = 'Error';
    mockRecipeApiService.editRecipe.mockReturnValue(throwError(error));

    component.onSubmit();

    expect(mockRecipeApiService.editRecipe).toHaveBeenCalledWith(component.form.value, 87);
    expect(mockToastrService.error).toHaveBeenCalledWith(error, 'Error');
  });
});
