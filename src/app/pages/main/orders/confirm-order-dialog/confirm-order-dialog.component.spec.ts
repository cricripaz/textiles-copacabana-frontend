import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmOrderDialogComponent } from './confirm-order-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecipeApiService } from '../../../../services/recipe-api.service';
import { OrdersApiService } from '../../../../services/orders-api.service';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ConfirmOrderDialogComponent', () => {
  let component: ConfirmOrderDialogComponent;
  let fixture: ComponentFixture<ConfirmOrderDialogComponent>;
  let mockRecipeApiService: any;
  let mockOrdersApiService: any;
  let mockToastrService: any;
  let mockMatDialogRef: any;
  const mockDialogData = {
    order_id: 1,
    products: {
      'Product A': { quantity: 10 },
      'Product B': { quantity: 20 }
    }
  };

  beforeEach(async () => {
    mockRecipeApiService = {
      fetchRecipes: jest.fn().mockReturnValue(of({ recipes: [{ recipe_name: 'Recipe 1', recipeRegistry_id: 1 }] }))
    };

    mockOrdersApiService = {
      startOrder: jest.fn().mockReturnValue(of({ message: 'Order Start Successfully' }))
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockMatDialogRef = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        ConfirmOrderDialogComponent // Importar el componente standalone aquí
      ],
      providers: [
        FormBuilder,
        { provide: RecipeApiService, useValue: mockRecipeApiService },
        { provide: OrdersApiService, useValue: mockOrdersApiService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with injected data', () => {
    expect(component.products.length).toBe(2);
    expect(component.products.at(0).value).toEqual({
      name: 'Product A',
      quantity: 10,
      recipe_name: '',
      recipe_id: ''
    });
    expect(component.products.at(1).value).toEqual({
      name: 'Product B',
      quantity: 20,
      recipe_name: '',
      recipe_id: ''
    });
  });

  it('should call startOrder and show success toastr on successful start', () => {
    component.onSubmit();
    expect(mockOrdersApiService.startOrder).toHaveBeenCalledWith(mockDialogData.order_id, component.orderConfirmationForm.value);
    expect(mockToastrService.success).toHaveBeenCalledWith('Orden Comenzada');
    expect(mockMatDialogRef.close).toHaveBeenCalledWith('yes');
  });

  it('should call startOrder and show error toastr on error', () => {
    mockOrdersApiService.startOrder.mockReturnValueOnce(throwError({ error: { message: 'Error' } }));
    component.onSubmit();
    expect(mockOrdersApiService.startOrder).toHaveBeenCalledWith(mockDialogData.order_id, component.orderConfirmationForm.value);
    expect(mockToastrService.error).toHaveBeenCalledWith('Error');
    expect(mockMatDialogRef.close).toHaveBeenCalledWith('no');
  });
});
