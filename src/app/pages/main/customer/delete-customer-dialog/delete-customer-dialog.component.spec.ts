import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteCustomerDialogComponent } from './delete-customer-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomerApiService } from '../../../../services/customer-api.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DeleteCustomerDialogComponent', () => {
  let component: DeleteCustomerDialogComponent;
  let fixture: ComponentFixture<DeleteCustomerDialogComponent>;
  let mockCustomerApiService: any;
  let mockToastrService: any;
  let mockMatDialogRef: any;
  const mockDialogData = { customer_id: 1 };

  beforeEach(async () => {
    mockCustomerApiService = {
      deleteUser: jest.fn().mockReturnValue(of({}))
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
        DeleteCustomerDialogComponent // Importar el componente standalone aquí
      ],
      providers: [
        { provide: CustomerApiService, useValue: mockCustomerApiService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteUser and show success toastr on successful deletion', () => {
    component.deleteCustomer();
    expect(mockCustomerApiService.deleteUser).toHaveBeenCalledWith(mockDialogData.customer_id);
    expect(mockToastrService.success).toHaveBeenCalledWith('Cliente Eliminado Exitosamente');
    expect(mockMatDialogRef.close).toHaveBeenCalledWith('yes');
  });

  it('should call deleteUser and show error toastr on error', () => {
    mockCustomerApiService.deleteUser.mockReturnValueOnce(throwError({ error: 'Error' }));
    component.deleteCustomer();
    expect(mockCustomerApiService.deleteUser).toHaveBeenCalledWith(mockDialogData.customer_id);
    expect(mockToastrService.error).toHaveBeenCalledWith('Error Al Eliminar Cliente:', { error: 'Error' });
    expect(mockMatDialogRef.close).not.toHaveBeenCalled();
  });
});
