import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryPopupComponent } from './inventory-popup.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InventoryPopupComponent', () => {
  let component: InventoryPopupComponent;
  let fixture: ComponentFixture<InventoryPopupComponent>;
  let mockDialogData: any;

  beforeEach(async () => {
    mockDialogData = {
      dyeInventory_id: 1041,
      name: "ACID BLACK",
      dyeType: "COLORANTE",
      weight: "100.00",
      description: "Some description"
    };

    await TestBed.configureTestingModule({
      imports: [InventoryPopupComponent], // Importamos el componente standalone aquí
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with dialog data', () => {
    expect(component.data).toBeDefined();
    expect(component.data.dyeInventory_id).toBe(mockDialogData.dyeInventory_id);
    expect(component.data.name).toBe(mockDialogData.name);
    expect(component.data.dyeType).toBe(mockDialogData.dyeType);
    expect(component.data.weight).toBe(mockDialogData.weight);
    expect(component.data.description).toBe(mockDialogData.description);
  });
});
