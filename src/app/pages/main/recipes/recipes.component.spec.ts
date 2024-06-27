import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RecipesComponent } from './recipes.component';
import { RecipeApiService } from '../../../services/recipe-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {RegisterDialogComponent} from "./register-dialog/register-dialog.component";
import {EditDialogComponent} from "./edit-dialog/edit-dialog.component";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {RecipePopupComponent} from "./recipe-popup/recipe-popup.component";
import {SearchTablePipe} from "../../../pipes/search-table.pipe";

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;
  let mockRecipeApiService: any;
  let mockMatDialog: any;
  let mockToastrService: any;

  beforeEach(async () => {
    mockRecipeApiService = {
      fetchRecipes: jest.fn().mockReturnValue(of({
        message: "Recipes get successfully",
        recipes: [
          {
            recipeRegistry_id: 87,
            recipe_name: "Color Rosa Pastel",
            ingredients: {
              "CANTONIC YELLOW X-GL 250%": {
                id: 1111,
                weight: 0.53,
                notes: null,
                dyeType: "COLORANTE"
              },
              "DIANIK BLACK": {
                id: 1122,
                weight: 0.52,
                notes: null,
                dyeType: "COLORANTE"
              },
              "ROJO HISPACRIL BTL 200 %": {
                id: 1190,
                weight: 1,
                notes: null,
                dyeType: "COLORANTE"
              },
              "ROJO HISPACRIL GRL 270 %": {
                id: 1191,
                weight: 0.48,
                notes: null,
                dyeType: "COLORANTE"
              }
            }
          },
          {
            recipeRegistry_id: 88,
            recipe_name: "Color Púrpura Intenso",
            ingredients: {
              "NEGRO ACIDO 194": {
                id: 1157,
                weight: 0.93,
                notes: null,
                dyeType: "COLORANTE"
              },
              "SOUP TEX ": {
                id: 1206,
                weight: 1.28,
                notes: null,
                dyeType: "QUIMICO"
              }
            }
          }
        ]
      })),
      createRecipe: jest.fn().mockReturnValue(of({ message: "Recipe Create Successfully" })),
      updateRecipe: jest.fn().mockReturnValue(of({ message: "Recipe Update Successfully" })),
      deleteRecipe: jest.fn().mockReturnValue(of({ message: "Recipe Delete Successfully" }))
    };

    mockMatDialog = {
      open: jest.fn().mockReturnValue({ afterClosed: jest.fn().mockReturnValue(of({})) }),
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [RecipesComponent,SearchTablePipe],
      providers: [
        { provide: RecipeApiService, useValue: mockRecipeApiService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ToastrService, useValue: mockToastrService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display recipes on initialization', () => {
    component.ngOnInit();
    expect(mockRecipeApiService.fetchRecipes).toHaveBeenCalled();
    expect(component.recipeData.length).toBe(2);
    expect(component.recipeData[0].recipe_name).toBe('Color Rosa Pastel');
  });

  it('should open the register recipe dialog', () => {
    component.openDialogRegisterRecipe();
    expect(mockMatDialog.open).toHaveBeenCalledWith(RegisterDialogComponent);
  });

  it('should open the edit recipe dialog', () => {
    const recipe = {
      recipeRegistry_id: 87,
      recipe_name: "Color Rosa Pastel",
      ingredients: {
        "CANTONIC YELLOW X-GL 250%": {
          id: 1111,
          weight: 0.53,
          notes: null,
          dyeType: "COLORANTE"
        },
        "DIANIK BLACK": {
          id: 1122,
          weight: 0.52,
          notes: null,
          dyeType: "COLORANTE"
        },
        "ROJO HISPACRIL BTL 200 %": {
          id: 1190,
          weight: 1,
          notes: null,
          dyeType: "COLORANTE"
        },
        "ROJO HISPACRIL GRL 270 %": {
          id: 1191,
          weight: 0.48,
          notes: null,
          dyeType: "COLORANTE"
        }
      }
    };
    component.editRecipe(recipe);
    expect(mockMatDialog.open).toHaveBeenCalledWith(EditDialogComponent, { data: { recipe: { ...recipe, ingredients: recipe.ingredients || [] } } });
  });

  it('should open the delete recipe dialog and delete recipe', () => {
    const recipe = {
      recipeRegistry_id: 87,
      recipe_name: "Color Rosa Pastel",
      ingredients: {
        "CANTONIC YELLOW X-GL 250%": {
          id: 1111,
          weight: 0.53,
          notes: null,
          dyeType: "COLORANTE"
        },
        "DIANIK BLACK": {
          id: 1122,
          weight: 0.52,
          notes: null,
          dyeType: "COLORANTE"
        },
        "ROJO HISPACRIL BTL 200 %": {
          id: 1190,
          weight: 1,
          notes: null,
          dyeType: "COLORANTE"
        },
        "ROJO HISPACRIL GRL 270 %": {
          id: 1191,
          weight: 0.48,
          notes: null,
          dyeType: "COLORANTE"
        }
      }
    };
    component.recipeData = [recipe];
    component.openDialogDeleteRecipe(recipe, 0);
    expect(mockMatDialog.open).toHaveBeenCalledWith(DeleteDialogComponent, { data: recipe });

    // Mock de la respuesta del diálogo de eliminación
    mockMatDialog.open.mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of('yes')),
    });

    component.openDialogDeleteRecipe(recipe, 0);
    expect(component.recipeData.length).toBe(0);
  });

  it('should open the recipe info dialog', () => {
    const recipe = {
      recipeRegistry_id: 87,
      recipe_name: "Color Rosa Pastel",
      ingredients: {
        "CANTONIC YELLOW X-GL 250%": {
          id: 1111,
          weight: 0.53,
          notes: null,
          dyeType: "COLORANTE"
        },
        "DIANIK BLACK": {
          id: 1122,
          weight: 0.52,
          notes: null,
          dyeType: "COLORANTE"
        },
        "ROJO HISPACRIL BTL 200 %": {
          id: 1190,
          weight: 1,
          notes: null,
          dyeType: "COLORANTE"
        },
        "ROJO HISPACRIL GRL 270 %": {
          id: 1191,
          weight: 0.48,
          notes: null,
          dyeType: "COLORANTE"
        }
      }
    };
    component.openModalInfoRecipe(recipe);
    expect(mockMatDialog.open).toHaveBeenCalledWith(RecipePopupComponent, { data: recipe });
  });

  it('should calculate correct pagination values', () => {
    component.recipeData = new Array(30).fill(null).map((_, i) => ({
      recipeRegistry_id: i,
      recipe_name: `Recipe${i}`,
      ingredients: {},
      status: "active"
    }));
    expect(component.getTotalPages()).toBe(3);
    component.currentPage = 1;
    expect(component.calculateInitialIndex()).toBe(0);
    expect(component.calculateFinalIndex()).toBe(10);
    expect(component.getCurrentPageItems().length).toBe(10);
    component.currentPage = 2;
    expect(component.calculateInitialIndex()).toBe(10);
    expect(component.calculateFinalIndex()).toBe(20);
    expect(component.getCurrentPageItems().length).toBe(10);
    component.currentPage = 3;
    expect(component.calculateInitialIndex()).toBe(20);
    expect(component.calculateFinalIndex()).toBe(30);
    expect(component.getCurrentPageItems().length).toBe(10);
  });
});
