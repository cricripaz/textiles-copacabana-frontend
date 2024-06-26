import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerComponent } from './customer.component';
import { CustomerApiService } from '../../../services/customer-api.service';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {RegisterDialogComponent} from "./register-dialog/register-dialog.component";
import {EditCustomerDialogComponent} from "./edit-customer-dialog/edit-customer-dialog.component";
import {DeleteCustomerDialogComponent} from "./delete-customer-dialog/delete-customer-dialog.component";
import {of} from "rxjs";
import {SearchTablePipe} from "../../../pipes/search-table.pipe";

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let mockCustomerApiService: any;
  let mockMatDialog: any;

  beforeEach(async () => {
    mockCustomerApiService = {
      fetchCustomers: jest.fn().mockReturnValue(of({
        message: "Customers Get Successfully",
        customers: [
          {
            customer_id: 1020,
            name: "COPACABANA",
            type: "Empresa",
            address: "Av. 6 de Agosto, La Paz",
            city: "La Paz",
            phoneNumber: "2123456",
            email: "info@copacabana.bo",
            NIT: "123456789",
            notes: "Cliente habitual",
            state: "active"
          },
          {
            customer_id: 1021,
            name: "ANOTHER COMPANY",
            type: "Empresa",
            address: "Calle Falsa 123",
            city: "Cochabamba",
            phoneNumber: "7123456",
            email: "contact@anothercompany.bo",
            NIT: "987654321",
            notes: "Nuevo cliente",
            state: "inactive"
          }
        ]
      }))
    };

    mockMatDialog = {
      open: jest.fn().mockReturnValue({ afterClosed: jest.fn().mockReturnValue(of({})) }),
    };

    await TestBed.configureTestingModule({
      declarations: [CustomerComponent,SearchTablePipe],
      providers: [
        { provide: CustomerApiService, useValue: mockCustomerApiService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA,],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display customers on initialization', () => {
    component.ngOnInit();
    expect(mockCustomerApiService.fetchCustomers).toHaveBeenCalled();
    expect(component.customersData.length).toBe(2);
    expect(component.customersData[0].name).toBe('COPACABANA');
  });

  it('should open the register customer dialog', () => {
    component.openDialogRegisterCustomer();
    expect(mockMatDialog.open).toHaveBeenCalledWith(RegisterDialogComponent);
  });

  it('should open the edit customer dialog', () => {
    const customer = {
      customer_id: 1020,
      name: "COPACABANA",
      type: "Empresa",
      address: "Av. 6 de Agosto, La Paz",
      city: "La Paz",
      phoneNumber: "2123456",
      email: "info@copacabana.bo",
      NIT: "123456789",
      notes: "Cliente habitual",
      state: "active"
    };
    component.editCustomer(customer);
    expect(mockMatDialog.open).toHaveBeenCalledWith(EditCustomerDialogComponent, { data: customer });
  });

  it('should delete customer from the list', () => {
    const customer = {
      customer_id: 1020,
      name: "COPACABANA",
      type: "Empresa",
      address: "Av. 6 de Agosto, La Paz",
      city: "La Paz",
      phoneNumber: "2123456",
      email: "info@copacabana.bo",
      NIT: "123456789",
      notes: "Cliente habitual",
      state: "active"
    };
    component.customersData = [customer];
    component.openDialogDeleteCustomer(customer, 0);
    expect(mockMatDialog.open).toHaveBeenCalledWith(DeleteCustomerDialogComponent, { data: customer });

    // Mock de la respuesta del diálogo de eliminación
    mockMatDialog.open.mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of('yes')),
    });

    component.openDialogDeleteCustomer(customer, 0);
    expect(component.customersData.length).toBe(0);
  });

  it('should calculate correct pagination values', () => {
    component.customersData = new Array(15).fill(null).map((_, i) => ({
      customer_id: i,
      name: `Customer${i}`,
      type: "Empresa",
      address: "Address",
      city: "City",
      phoneNumber: "1234567",
      email: `customer${i}@example.com`,
      NIT: `NIT${i}`,
      notes: "Notes",
      state: "active"
    }));
    expect(component.getTotalPages()).toBe(2);
    component.currentPage = 1;
    expect(component.getCurrentPageItems().length).toBe(10);
    component.currentPage = 2;
    expect(component.getCurrentPageItems().length).toBe(5);
  });
});
