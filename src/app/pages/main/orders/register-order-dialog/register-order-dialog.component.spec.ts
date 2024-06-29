import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterOrderDialogComponent } from './register-order-dialog.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerApiService } from '../../../../services/customer-api.service';
import { OrdersApiService } from '../../../../services/orders-api.service';
import { MaterialApiService } from '../../../../services/material-api.service';
import { ColorApiService } from '../../../../services/color-api.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterOrderDialogComponent', () => {
  let component: RegisterOrderDialogComponent;
  let fixture: ComponentFixture<RegisterOrderDialogComponent>;
  let mockCustomerApiService: any;
  let mockOrdersApiService: any;
  let mockMaterialApiService: any;
  let mockColorApiService: any;
  let mockToastrService: any;
  let mockMatDialogRef: any;

  beforeEach(async () => {
    mockCustomerApiService = {
      fetchCustomers: jest.fn().mockReturnValue(of({ customers: [{ id: 1, name: 'Customer1' }] }))
    };

    mockOrdersApiService = {
      createOrder: jest.fn().mockReturnValue(of({ message: 'Order Created Successfully' }))
    };

    mockMaterialApiService = {
      getOrders: jest.fn().mockReturnValue(of({ materials: [{ id: 1, name: 'Material1' }] }))
    };

    mockColorApiService = {
      getColors: jest.fn().mockReturnValue(of({ colors: [{ id: 1, name: 'Color1' }] }))
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
        RegisterOrderDialogComponent // Importar el componente standalone aquí
      ],
      providers: [
        FormBuilder,
        { provide: CustomerApiService, useValue: mockCustomerApiService },
        { provide: OrdersApiService, useValue: mockOrdersApiService },
        { provide: MaterialApiService, useValue: mockMaterialApiService },
        { provide: ColorApiService, useValue: mockColorApiService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and load data', () => {
    expect(component.formOrder).toBeDefined();
    expect(mockCustomerApiService.fetchCustomers).toHaveBeenCalled();
    expect(mockMaterialApiService.getOrders).toHaveBeenCalled();
    expect(mockColorApiService.getColors).toHaveBeenCalled();
    expect(component.customers).toEqual([{ id: 1, name: 'Customer1' }]);
    expect(component.materials).toEqual([{ id: 1, name: 'Material1' }]);
    expect(component.colors).toEqual([{ id: 1, name: 'Color1' }]);
  });

  it('should add a product', () => {
    const initialLength = component.products.length;
    component.addProduct();
    expect(component.products.length).toBe(initialLength + 1);
  });

  it('should remove a product', () => {
    component.addProduct();
    const initialLength = component.products.length;
    component.removeProduct(0);
    expect(component.products.length).toBe(initialLength - 1);
  });

  it('should submit the form and show success message', () => {
    component.formOrder.patchValue({
      customer: 1,
      products: [{ name_material: 'Material1', name_color: 'Color1', quantity: 10 }]
    });
    component.onSubmit();
    expect(mockOrdersApiService.createOrder).toHaveBeenCalledWith({
      customer_id: 1,
      products: [{ name_material: 'Material1', name_color: 'Color1', quantity: 10 }]
    });
    expect(mockToastrService.success).toHaveBeenCalledWith('Orden Creada exitosamente', 'Exito');
    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });

  it('should show error message on form submission failure', () => {
    mockOrdersApiService.createOrder.mockReturnValueOnce(throwError({ error: 'Error' }));
    component.formOrder.patchValue({
      customer: 1,
      products: [{ name_material: 'Material1', name_color: 'Color1', quantity: 10 }]
    });
    component.onSubmit();
    expect(mockToastrService.error).toHaveBeenCalled();
  });
});
