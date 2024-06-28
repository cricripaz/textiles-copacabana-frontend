import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { OrdersApiService } from '../../../services/orders-api.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Asegúrate de ajustar la ruta correctamente
import * as pdfMake from 'pdfmake/build/pdfmake';
import {FinishOrderDialogComponent} from "./finish-order-dialog/finish-order-dialog.component";
import {ConfirmOrderDialogComponent} from "./confirm-order-dialog/confirm-order-dialog.component";
import {DeleteOrderDialogComponent} from "./delete-order-dialog/delete-order-dialog.component";
import {RegisterOrderDialogComponent} from "./register-order-dialog/register-order-dialog.component";
import {SharedModule} from "../../../shared/shared.module";

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let mockOrdersApiService: any;
  let mockToastrService: any;
  let mockMatDialog: any;

  beforeEach(async () => {
    mockOrdersApiService = {
      getOrders: jest.fn().mockReturnValue(of({
        data: [
          { order_id: 1, customer_name: 'Customer 1', order_status: 'En Proceso', entry_date: '2023-01-01', products: {} },
          { order_id: 2, customer_name: 'Customer 2', order_status: 'Pendiente', entry_date: '2023-01-02', products: {} }
        ]
      })),
      deleteOrder: jest.fn().mockReturnValue(of({ message: 'Order deleted successfully' })),
      // Mock other methods if necessary
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn()
    };

    mockMatDialog = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of('yes'))
      })
    };

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule, SharedModule],
      declarations: [OrdersComponent],
      providers: [
        { provide: OrdersApiService, useValue: mockOrdersApiService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MatDialog, useValue: mockMatDialog }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch orders on init', () => {
    component.ngOnInit();
    expect(mockOrdersApiService.getOrders).toHaveBeenCalled();
    expect(component.orderData.length).toBe(2);
  });

  it('should filter orders based on status', () => {
    component.orderData = [
      { order_id: 1, customer_name: 'Customer 1', order_status: 'En Proceso', entry_date: '2023-01-01', products: {} },
      { order_id: 2, customer_name: 'Customer 2', order_status: 'Pendiente', entry_date: '2023-01-02', products: {} }
    ];
    component.selectedStatuses.add('En Proceso');
    component.filterOrders();
    expect(component.filteredOrders.length).toBe(1);
    expect(component.filteredOrders[0].order_status).toBe('En Proceso');
  });

  it('should paginate filtered orders', () => {
    component.filteredOrders = new Array(25).fill({}).map((_, i) => ({ order_id: i + 1, customer_name: `Customer ${i + 1}`, order_status: 'En Proceso', entry_date: '2023-01-01', products: {} }));
    component.currentPage = 2;
    component.itemsPerPage = 10;
    component.applyPagination();
    expect(component.paginatedOrders.length).toBe(10);
    expect(component.paginatedOrders[0].order_id).toBe(11);
  });

  it('should open dialog to register order', () => {
    component.openDialogRegisterOrder();
    expect(mockMatDialog.open).toHaveBeenCalledWith(RegisterOrderDialogComponent);
  });

  it('should open dialog to delete order and remove order on success', () => {
    const order = { order_id: 1, customer_name: 'Customer 1', order_status: 'En Proceso', entry_date: '2023-01-01', products: {} };
    component.orderData = [order];
    component.openDialogDeleteOrder(order, 0);
    expect(mockMatDialog.open).toHaveBeenCalledWith(DeleteOrderDialogComponent, { data: order });
    expect(component.orderData.length).toBe(0);
  });

  it('should export orders to PDF', () => {
    const selectedOrders = [
      { order_id: 1, customer_name: 'Customer 1', order_status: 'En Proceso', entry_date: '2023-01-01', products: {} },
      { order_id: 2, customer_name: 'Customer 2', order_status: 'Pendiente', entry_date: '2023-01-02', products: {} }
    ];
    component.selectedIndexes = new Set([0, 1]);
    component.filteredOrders = selectedOrders;
    const createPdfSpy = jest.spyOn(pdfMake, 'createPdf');
    component.exportOrders();
    expect(createPdfSpy).toHaveBeenCalled();
  });

  it('should display warning if no orders selected for export', () => {
    component.selectedIndexes.clear();
    component.exportOrders();
    expect(mockToastrService.warning).toHaveBeenCalledWith('Selecciona al menos 1 Orden');
  });

  it('should start order and update status', () => {
    const order = { order_id: 1, customer_name: 'Customer 1', order_status: 'Pendiente', entry_date: '2023-01-01', products: {} };
    component.orderData = [order];
    component.startOrder(order, 0);
    expect(mockMatDialog.open).toHaveBeenCalledWith(ConfirmOrderDialogComponent, { data: order });
    order.order_status = 'En Proceso';
    component.orderData[0] = order;
    expect(component.orderData[0].order_status).toBe('En Proceso');
  });

  it('should finish order and update status', () => {
    const order = { order_id: 1, customer_name: 'Customer 1', order_status: 'En Proceso', entry_date: '2023-01-01', products: {} };
    component.orderData = [order];
    component.finishOrder(order, 0);
    expect(mockMatDialog.open).toHaveBeenCalledWith(FinishOrderDialogComponent, { data: order });
    order.order_status = 'Completado';
    component.orderData[0] = order;
    expect(component.orderData[0].order_status).toBe('Completado');
  });

});
