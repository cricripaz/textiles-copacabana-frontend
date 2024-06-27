import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InventoryApiService } from '../../../../services/inventory-api.service';
import { EditInventoryComponent } from './edit-inventory.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('EditInventoryComponent', () => {
  let component: EditInventoryComponent;
  let fixture: ComponentFixture<EditInventoryComponent>;
  let mockInventoryApiService: any;
  let mockMatDialog: any;
  let mockToastrService: any;
  let mockDialogData: any;

  beforeEach(async () => {
    mockInventoryApiService = {
      editItemInventory: jest.fn()
    };

    mockMatDialog = {
      closeAll: jest.fn()
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockDialogData = {
      dyeInventory_id: 1041,
      name: "ACID BLACK",
      dyeType: "COLORANTE",
      weight: "100.00",
      description: "Some description"
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule, EditInventoryComponent],
      providers: [
        FormBuilder,
        { provide: InventoryApiService, useValue: mockInventoryApiService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with dialog data', () => {
    component.ngOnInit();
    expect(component.inventoryForm).toBeDefined();
    expect(component.inventoryForm.controls['name'].value).toBe(mockDialogData.name);
    expect(component.inventoryForm.controls['type'].value).toBe(mockDialogData.dyeType);
    expect(component.inventoryForm.controls['weight'].value).toBe(mockDialogData.weight);
    expect(component.inventoryForm.controls['description'].value).toBe(mockDialogData.description);
  });

  it('should call editItemInventory ', () => {
    component.ngOnInit();
    component.inventoryForm.setValue({
      name: mockDialogData.name,
      type: mockDialogData.dyeType,
      weight: mockDialogData.weight,
      description: mockDialogData.description
    });

    mockInventoryApiService.editItemInventory.mockReturnValue(of({ message: 'El Item se editó exitosamente.' }));

    component.EditDyeInventory();

    expect(mockInventoryApiService.editItemInventory).toHaveBeenCalledWith(mockDialogData.dyeInventory_id, component.inventoryForm.value);

  });

  it('should show error message on editItemInventory failure', () => {
    const error = { error: 'Error message' };
    mockInventoryApiService.editItemInventory.mockReturnValue(throwError(error));

    component.EditDyeInventory();

    expect(mockInventoryApiService.editItemInventory).toHaveBeenCalledWith(1041, component.inventoryForm.value);
    expect(mockToastrService.error).toHaveBeenCalledWith(error.error, 'Error');
  });
});
