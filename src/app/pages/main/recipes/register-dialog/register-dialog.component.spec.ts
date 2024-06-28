import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { RegisterDialogComponent } from './register-dialog.component';
import { RecipeApiService } from '../../../../services/recipe-api.service';
import { InventoryApiService } from '../../../../services/inventory-api.service';
import jwt_decode from 'jwt-decode';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

jest.mock('jwt-decode', () => jest.fn());

describe('RegisterDialogComponent', () => {
  let component: RegisterDialogComponent;
  let fixture: ComponentFixture<RegisterDialogComponent>;
  let mockRecipeApiService: any;
  let mockInventoryApiService: any;
  let mockMatDialogRef: any;
  let mockDialogData: any;
  let mockTokenData: any;

  beforeEach(async () => {
    mockRecipeApiService = {
      createRecipe: jest.fn()
    };

    mockInventoryApiService = {
      fetchInventory: jest.fn().mockReturnValue(of({
        data: [
          { dyeInventory_id: 1, name: 'Material 1' },
          { dyeInventory_id: 2, name: 'Material 2' }
        ]
      }))
    };

    mockMatDialogRef = {
      close: jest.fn()
    };

    mockTokenData = {
      user_id: 123
    };

    localStorage.setItem('token', 'mockToken');
    (jwt_decode as jest.Mock).mockReturnValue(mockTokenData);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        NoopAnimationsModule // Importamos NoopAnimationsModule para deshabilitar las animaciones
      ],
      declarations: [RegisterDialogComponent],
      providers: [
        { provide: RecipeApiService, useValue: mockRecipeApiService },
        { provide: InventoryApiService, useValue: mockInventoryApiService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user_id from token', () => {
    component.ngOnInit();
    expect(component.user_id).toBe(mockTokenData.user_id);
  });

  it('should fetch inventory materials on init', () => {
    component.ngOnInit();
    expect(mockInventoryApiService.fetchInventory).toHaveBeenCalled();
    expect(component.allMaterials.length).toBe(2);
    expect(component.filteredMaterials).toBeDefined();
  });

  it('should add a new ingredient', () => {
    component.addIngredient();
    expect(component.ingredients.length).toBe(2); // Inicialmente hay un ingrediente
  });

  it('should remove an ingredient', () => {
    component.addIngredient(); // Agrega un segundo ingrediente
    component.removeIngredient(0);
    expect(component.ingredients.length).toBe(1);
  });

  it('should update ingredients on selection change', () => {
    const selectedMaterial = { dyeInventory_id: 1, name: 'Material 1' };
    component.addIngredient(); // Asegura que hay al menos un ingrediente para actualizar
    component.onSelectionChange(selectedMaterial, 0);
    expect(component.ingredients[0].dyeInventory_id).toBe(selectedMaterial.dyeInventory_id);
    expect(component.ingredients[0].name).toBe(selectedMaterial.name);
  });

  it('should submit the form and close dialog on success', () => {
    const mockForm = {
      value: {
        name: 'Test Recipe',
        ingredients: [{ name: 'Material 1', weight: 1, note: 'Note' }]
      }
    } as NgForm;

    mockRecipeApiService.createRecipe.mockReturnValue(of({ message: 'Receta creada exitosamente' }));

    component.onSubmit(mockForm);

    expect(mockRecipeApiService.createRecipe).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Test Recipe',
      id_user: mockTokenData.user_id,
      ingredients: component.ingredients
    }));
    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });

  it('should log error on form submission failure', () => {
    const mockForm = {
      value: {
        name: 'Test Recipe',
        ingredients: [{ name: 'Material 1', weight: 1, note: 'Note' }]
      }
    } as NgForm;

    const error = 'Error';
    mockRecipeApiService.createRecipe.mockReturnValue(throwError(error));

    console.error = jest.fn(); // Mock console.error

    component.onSubmit(mockForm);

    expect(mockRecipeApiService.createRecipe).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Test Recipe',
      id_user: mockTokenData.user_id,
      ingredients: component.ingredients
    }));
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
