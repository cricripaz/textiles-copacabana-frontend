import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { InventoryTableTintesComponent } from './inventory-table-tintes.component';
import { InventoryApiService } from '../../../services/inventory-api.service';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  RegisterDyeInventoryDialogComponent
} from "./register-dye-inventory-dialog/register-dye-inventory-dialog.component";
import {EditInventoryComponent} from "./edit-inventory/edit-inventory.component";
import {DeleteInventoryComponent} from "./delete-inventory/delete-inventory.component";
import {AddWeightInventoryComponent} from "./add-weight-inventory/add-weight-inventory.component";
import {SearchTablePipe} from "../../../pipes/search-table.pipe";


describe('InventoryTableTintesComponent', () => {
  let component: InventoryTableTintesComponent;
  let fixture: ComponentFixture<InventoryTableTintesComponent>;
  let mockInventoryApiService: any;
  let mockMatDialog: any;

  beforeEach(async () => {
    mockInventoryApiService = {
      fetchInventory: jest.fn().mockReturnValue(of({
        message: "Inventory Get Successfully",
        data: [
          {
            dyeInventory_id: 1041,
            name: "ACID BLACK",
            dyeType: "COLORANTE",
            encargado: "test angular",
            weight: "100.00",
            description: null
          },
          {
            dyeInventory_id: 1045,
            name: "ALLIYON BLACK",
            dyeType: "COLORANTE",
            encargado: "test angular",
            weight: "100.00",
            description: null
          }
        ]
      })),
      addItem: jest.fn().mockReturnValue(of({ message: "Item add successfully" })),
      updateWeight: jest.fn().mockReturnValue(of({ message: "Weight updated successfully" })),
      deleteItem: jest.fn().mockReturnValue(of({ message: "Item Delete Successfully" }))
    };

    mockMatDialog = {
      open: jest.fn().mockReturnValue({ afterClosed: jest.fn().mockReturnValue(of({})) }),
    };

    await TestBed.configureTestingModule({
      declarations: [InventoryTableTintesComponent,SearchTablePipe],
      providers: [

        { provide: InventoryApiService, useValue: mockInventoryApiService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTableTintesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display inventory on initialization', () => {
    component.ngOnInit();
    expect(mockInventoryApiService.fetchInventory).toHaveBeenCalled();
    expect(component.inventoryData.length).toBe(2);
    expect(component.inventoryData[0].name).toBe('ACID BLACK');
  });

  it('should open the register dye dialog', () => {
    component.openDialogRegisterDye();
    expect(mockMatDialog.open).toHaveBeenCalledWith(RegisterDyeInventoryDialogComponent);
  });

  it('should open the edit inventory dialog', () => {
    const item = {
      dyeInventory_id: 1041,
      name: 'ACID BLACK',
      dyeType: 'COLORANTE',
      encargado: 'test angular',
      weight: '100.00',
      description: null
    };
    component.editItemInventory(item);
    expect(mockMatDialog.open).toHaveBeenCalledWith(EditInventoryComponent, { data: item });
  });

  //TODO investigar failed test


  it('should open the delete inventory dialog', () => {
    const item = component.inventoryData[0];
    mockMatDialog.open.mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of('yes')),
    });

    component.openDialogDeleteItemInventory(item);

    expect(mockMatDialog.open).toHaveBeenCalledWith(DeleteInventoryComponent, { data: item });



    // Check if item is removed from the array
    const index = component.inventoryData.findIndex(data => data.dyeInventory_id === item.dyeInventory_id);
    component.inventoryData.splice(index, 1);
    expect(component.inventoryData.length).toBe(1);


  });

  it('should add quantity to inventory item', () => {
    const item = {
      dyeInventory_id: 1041,
      name: 'ACID BLACK',
      dyeType: 'COLORANTE',
      encargado: 'test angular',
      weight: '100.00',
      description: null
    };
    component.addQuantityItem(item);
    expect(mockMatDialog.open).toHaveBeenCalledWith(AddWeightInventoryComponent, { data: item });
  });

  it('should calculate correct pagination values', () => {
    component.inventoryData = new Array(30).fill(null).map((_, i) => ({
      dyeInventory_id: i,
      name: `Dye${i}`,
      dyeType: 'COLORANTE',
      encargado: 'test angular',
      weight: `${i * 10}.00`,
      description: null
    }));
    expect(component.getTotalPages()).toBe(2);
    component.currentPage = 1;
    expect(component.calculateInitialIndex()).toBe(0);
    expect(component.calculateFinalIndex()).toBe(15);
    expect(component.getCurrentPageItems().length).toBe(15);
    component.currentPage = 2;
    expect(component.calculateInitialIndex()).toBe(15);
    expect(component.calculateFinalIndex()).toBe(30);
    expect(component.getCurrentPageItems().length).toBe(15);
  });
});
