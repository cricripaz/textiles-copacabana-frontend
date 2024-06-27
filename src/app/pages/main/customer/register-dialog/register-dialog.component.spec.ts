import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RegisterDialogComponent } from './register-dialog.component';
import { CustomerApiService } from '../../../../services/customer-api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('RegisterDialogComponent', () => {
  let component: RegisterDialogComponent;
  let fixture: ComponentFixture<RegisterDialogComponent>;
  let mockCustomerApiService: any;
  let mockMatDialog: any;
  let mockToastrService: any;

  beforeEach(async () => {
    mockCustomerApiService = {
      createCustomer: jest.fn()
    };

    mockMatDialog = {
      closeAll: jest.fn()
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        RegisterDialogComponent // Importamos el componente standalone aquí
      ],
      providers: [
        FormBuilder,
        { provide: CustomerApiService, useValue: mockCustomerApiService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ToastrService, useValue: mockToastrService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(component.DataInventoryForm).toBeDefined();
    expect(component.DataInventoryForm.controls['name']).toBeDefined();
    expect(component.DataInventoryForm.controls['type']).toBeDefined();
    expect(component.DataInventoryForm.controls['address']).toBeDefined();
    expect(component.DataInventoryForm.controls['city']).toBeDefined();
    expect(component.DataInventoryForm.controls['phoneNumber']).toBeDefined();
    expect(component.DataInventoryForm.controls['email']).toBeDefined();
    expect(component.DataInventoryForm.controls['NIT']).toBeDefined();
    expect(component.DataInventoryForm.controls['notes']).toBeDefined();
  });

  it('should display error if form is invalid on submit', () => {
    component.registerCustomer();
    expect(mockToastrService.error).toHaveBeenCalledWith('Por favor llena Todos los campos');
  });

  it('should submit form and display success message', () => {

    component.ngOnInit();
    component.DataInventoryForm.setValue({
      name: 'Test Customer',
      type: 'Empresa',
      address: '123 Test Street',
      city: 'Test City',
      phoneNumber: '123456789',
      email: 'test@example.com',
      NIT: '1234567890',
      notes: 'Test notes'
    });

    mockCustomerApiService.createCustomer.mockReturnValue(of({ message: 'Cliente Agregado Exitosamente' }));

    component.registerCustomer();

    expect(mockCustomerApiService.createCustomer).toHaveBeenCalledWith(component.DataInventoryForm.value);
    expect(mockToastrService.success).toHaveBeenCalledWith('Cliente Agregado Exitosamente');
    expect(mockMatDialog.closeAll).toHaveBeenCalled();
  });

  it('should display error message on submit failure', () => {
    component.ngOnInit();
    component.DataInventoryForm.setValue({
      name: 'Test Customer',
      type: 'Empresa',
      address: '123 Test Street',
      city: 'Test City',
      phoneNumber: '123456789',
      email: 'test@example.com',
      NIT: '1234567890',
      notes: 'Test notes'
    });

    mockCustomerApiService.createCustomer.mockReturnValue(throwError('Error'));

    component.registerCustomer();

    expect(mockCustomerApiService.createCustomer).toHaveBeenCalledWith(component.DataInventoryForm.value);
    expect(mockToastrService.error).toHaveBeenCalledWith('Error');
  });
});
