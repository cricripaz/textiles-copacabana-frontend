import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCustomerDialogComponent } from './edit-customer-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerApiService } from '../../../../services/customer-api.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditCustomerDialogComponent', () => {
  let component: EditCustomerDialogComponent;
  let fixture: ComponentFixture<EditCustomerDialogComponent>;
  let mockCustomerApiService: any;
  let mockToastrService: any;
  let mockMatDialogRef: any;
  const mockDialogData = {
    customer_id: 1,
    name: 'John Doe',
    type: 'Individual',
    address: '123 Main St',
    city: 'Anytown',
    phoneNumber: '555-1234',
    email: 'john.doe@example.com',
    NIT: '123456789',
    notes: 'Test note'
  };

  beforeEach(async () => {
    mockCustomerApiService = {
      editCustomer: jest.fn().mockReturnValue(of({}))
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockMatDialogRef = {
      closeAll: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        EditCustomerDialogComponent // Importar el componente standalone aquí
      ],
      providers: [
        FormBuilder,
        { provide: CustomerApiService, useValue: mockCustomerApiService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with injected data', () => {
    expect(component.editCustomerForm.value).toEqual({
      name: mockDialogData.name,
      type: mockDialogData.type,
      address: mockDialogData.address,
      city: mockDialogData.city,
      phoneNumber: mockDialogData.phoneNumber,
      email: mockDialogData.email,
      NIT: mockDialogData.NIT,
      notes: mockDialogData.notes
    });
  });

  it('should call editCustomer and show success toastr on successful edit', () => {
    component.editCustomer();
    expect(mockCustomerApiService.editCustomer).toHaveBeenCalledWith(mockDialogData.customer_id, component.editCustomerForm.value);
    expect(mockToastrService.success).toHaveBeenCalledWith('Cliente Actualizado Exitosamente.', 'Éxito');
    expect(mockMatDialogRef.closeAll).toHaveBeenCalled();
  });

  it('should call editCustomer and show error toastr on error', () => {
    mockCustomerApiService.editCustomer.mockReturnValueOnce(throwError({ error: 'Error' }));
    component.editCustomer();
    expect(mockCustomerApiService.editCustomer).toHaveBeenCalledWith(mockDialogData.customer_id, component.editCustomerForm.value);
    expect(mockToastrService.error).toHaveBeenCalledWith({ error: 'Error' }, 'Error');
    expect(mockMatDialogRef.closeAll).not.toHaveBeenCalled();
  });
});
