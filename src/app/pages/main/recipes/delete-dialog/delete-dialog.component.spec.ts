import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RecipeApiService } from '../../../../services/recipe-api.service';
import { DeleteDialogComponent } from './delete-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  let mockRecipeApiService: any;
  let mockMatDialogRef: any;
  let mockToastrService: any;
  let mockDialogData: any;

  beforeEach(async () => {
    mockRecipeApiService = {
      deleteRecipe: jest.fn()
    };

    mockMatDialogRef = {
      close: jest.fn()
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockDialogData = {
      recipeRegistry_id: 87,
      recipe_name: "Color Rosa Pastel"
    };

    await TestBed.configureTestingModule({
      declarations: [DeleteDialogComponent],
      providers: [
        { provide: RecipeApiService, useValue: mockRecipeApiService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteRecipe and close dialog on success', () => {
    mockRecipeApiService.deleteRecipe.mockReturnValue(of({ message: 'Receta Eliminada Correctamente' }));

    component.deleteRecipe();

    expect(mockRecipeApiService.deleteRecipe).toHaveBeenCalledWith(mockDialogData.recipeRegistry_id);
    expect(mockMatDialogRef.close).toHaveBeenCalledWith('yes');
    expect(mockToastrService.success).toHaveBeenCalledWith('Receta Eliminada Correctamente');
  });

  it('should log error message on deleteRecipe failure', () => {
    const error = 'Error';
    mockRecipeApiService.deleteRecipe.mockReturnValue(throwError(error));

    console.error = jest.fn(); // Mock console.error

    component.deleteRecipe();

    expect(mockRecipeApiService.deleteRecipe).toHaveBeenCalledWith(mockDialogData.recipeRegistry_id);
    expect(console.error).toHaveBeenCalledWith('Error al eliminar receta:', error);
  });
});
