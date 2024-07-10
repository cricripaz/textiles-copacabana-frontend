import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EditOrderDialogComponent } from './edit-order-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { OrdersApiService } from '../../../../services/orders-api.service';
import { CustomerApiService } from '../../../../services/customer-api.service';
import { ProductApiService } from '../../../../services/product-api.service';
import { MaterialApiService } from '../../../../services/material-api.service';
import { ColorApiService } from '../../../../services/color-api.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditOrderDialogComponent', () => {
  let component: EditOrderDialogComponent;
  let fixture: ComponentFixture<EditOrderDialogComponent>;
  let mockDialogRef: any;
  let mockOrdersApiService: any;
  let mockCustomerApiService: any;
  let mockProductApiService: any;
  let mockMaterialApiService: any;
  let mockColorApiService: any;
  let mockToastrService: any;
  let mockData: any;

  beforeEach(waitForAsync(() => {
    mockDialogRef = {
      close: jest.fn()
    };

    mockOrdersApiService = {
      updateOrder: jest.fn().mockReturnValue(of({}))
    };

    mockCustomerApiService = {
      fetchCustomers: jest.fn().mockReturnValue(of({ customers: [] }))
    };

    mockProductApiService = {
      getMaterialAndColorByName: jest.fn().mockReturnValue(of({ product: { material_name: 'Material', color_name: 'Color' } }))
    };

    mockMaterialApiService = {
      getOrders: jest.fn().mockReturnValue(of({ materials: [] }))
    };

    mockColorApiService = {
      getColors: jest.fn().mockReturnValue(of({ colors: [] }))
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockData = {
      order_id: 1,
      customer_id: 1,
      products: {}
    };

    TestBed.configureTestingModule({
      imports: [
        EditOrderDialogComponent,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        MatButtonModule,
        ToastrModule.forRoot(),
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: OrdersApiService, useValue: mockOrdersApiService },
        { provide: CustomerApiService, useValue: mockCustomerApiService },
        { provide: ProductApiService, useValue: mockProductApiService },
        { provide: MaterialApiService, useValue: mockMaterialApiService },
        { provide: ColorApiService, useValue: mockColorApiService },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on init', () => {
    expect(component.formOrder).toBeDefined();
  });

  it('should load customers on init', () => {
    expect(mockCustomerApiService.fetchCustomers).toHaveBeenCalled();
  });

  it('should load materials on init', () => {
    expect(mockMaterialApiService.getOrders).toHaveBeenCalled();
  });

  it('should load colors on init', () => {
    expect(mockColorApiService.getColors).toHaveBeenCalled();
  });

  it('should submit form', () => {
    component.formOrder.setValue({
      customer: 'Customer Name',
      products: []
    });

    const customer = { customer_id: 1, name: 'Customer Name' };
    component.customers = [customer];

    component.onSubmit();

    expect(mockOrdersApiService.updateOrder).toHaveBeenCalledWith(1, {
      customer: 1,
      products: []
    });
  });

  it('should handle error on submit', () => {
    mockOrdersApiService.updateOrder.mockReturnValueOnce(throwError({ message: 'Error' }));

    component.onSubmit();

    expect(mockToastrService.error).toHaveBeenCalledWith('Error', 'Error Actualizando la orden');
  });
});
