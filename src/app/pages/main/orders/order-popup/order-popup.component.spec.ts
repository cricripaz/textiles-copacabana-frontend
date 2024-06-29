import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPopupComponent } from './order-popup.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrderPopupComponent', () => {
  let component: OrderPopupComponent;
  let fixture: ComponentFixture<OrderPopupComponent>;
  const mockDialogData = {
    order_id: 1,
    customer_name: 'Test Customer',
    order_status: 'Pending',
    products: {
      'Product A': { quantity: 10 },
      'Product B': { quantity: 20 }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OrderPopupComponent // Importar el componente standalone aquí
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with provided data', () => {
    expect(component.data).toEqual(mockDialogData);
  });

  it('should display order details correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.order-id').textContent).toContain(mockDialogData.order_id);
    expect(compiled.querySelector('.customer-name').textContent).toContain(mockDialogData.customer_name);
    expect(compiled.querySelector('.order-status').textContent).toContain(mockDialogData.order_status);
    // Puedes agregar más verificaciones para los productos si están renderizados en el template
  });
});
