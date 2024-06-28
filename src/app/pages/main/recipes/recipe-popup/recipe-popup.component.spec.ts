import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipePopupComponent } from './recipe-popup.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RecipePopupComponent', () => {
  let component: RecipePopupComponent;
  let fixture: ComponentFixture<RecipePopupComponent>;
  let mockDialogData: any;

  beforeEach(async () => {
    mockDialogData = {
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
    };

    await TestBed.configureTestingModule({
      declarations: [RecipePopupComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with dialog data', () => {
    expect(component.data).toBe(mockDialogData);
    expect(component.data.recipeRegistry_id).toBe(mockDialogData.recipeRegistry_id);
    expect(component.data.recipe_name).toBe(mockDialogData.recipe_name);
    expect(component.data.ingredients).toBe(mockDialogData.ingredients);
  });
});
