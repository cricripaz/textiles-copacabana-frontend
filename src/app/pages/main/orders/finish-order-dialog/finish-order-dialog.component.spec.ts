import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinishOrderDialogComponent } from './finish-order-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OrdersApiService } from '../../../../services/orders-api.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FinishOrderDialogComponent', () => {
  let component: FinishOrderDialogComponent;
  let fixture: ComponentFixture<FinishOrderDialogComponent>;
  let mockOrdersApiService: any;
  let mockMatDialogRef: any;
  const mockDialogData = { order_id: 1 };

  beforeEach(async () => {
    mockOrdersApiService = {
      finishOrder: jest.fn().mockReturnValue(of({ message: 'Order Finished Successfully' }))
    };

    mockMatDialogRef = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        FinishOrderDialogComponent // Importar el componente standalone aquí
      ],
      providers: [
        { provide: OrdersApiService, useValue: mockOrdersApiService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call finishOrder and close the dialog with "yes" on success', () => {
    component.finishOrder();
    expect(mockOrdersApiService.finishOrder).toHaveBeenCalledWith(mockDialogData.order_id);
    expect(mockMatDialogRef.close).toHaveBeenCalledWith('yes');
  });

  it('should call finishOrder and not close the dialog on error', () => {
    mockOrdersApiService.finishOrder.mockReturnValueOnce(throwError({ error: 'Error' }));
    component.finishOrder();
    expect(mockOrdersApiService.finishOrder).toHaveBeenCalledWith(mockDialogData.order_id);
    expect(mockMatDialogRef.close).not.toHaveBeenCalled();
  });
});
