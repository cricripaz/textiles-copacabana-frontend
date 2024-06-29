import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteOrderDialogComponent } from './delete-order-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrdersApiService } from '../../../../services/orders-api.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DeleteOrderDialogComponent', () => {
  let component: DeleteOrderDialogComponent;
  let fixture: ComponentFixture<DeleteOrderDialogComponent>;
  let mockOrdersApiService: any;
  let mockToastrService: any;
  let mockMatDialogRef: any;
  const mockDialogData = { order_id: 1 };

  beforeEach(async () => {
    mockOrdersApiService = {
      deleteOrder: jest.fn().mockReturnValue(of({}))
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
        DeleteOrderDialogComponent // Importar el componente standalone aquí
      ],
      providers: [
        { provide: OrdersApiService, useValue: mockOrdersApiService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteOrder and show success toastr on successful delete', () => {
    component.deleteOrder();
    expect(mockOrdersApiService.deleteOrder).toHaveBeenCalledWith(mockDialogData.order_id);
    expect(mockToastrService.success).toHaveBeenCalledWith('Orden Eliminada Exitosamente');
    expect(mockMatDialogRef.close).toHaveBeenCalledWith('yes');
  });

  it('should call deleteOrder and show error toastr on error', () => {
    mockOrdersApiService.deleteOrder.mockReturnValueOnce(throwError({ error: 'Error' }));
    component.deleteOrder();
    expect(mockOrdersApiService.deleteOrder).toHaveBeenCalledWith(mockDialogData.order_id);
    expect(mockToastrService.error).toHaveBeenCalledWith('Error Al Eliminar Cliente:', { error: 'Error' });
    expect(mockMatDialogRef.close).not.toHaveBeenCalled();
  });
});
