import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddWeightInventoryComponent } from './add-weight-inventory.component';
import { InventoryApiService } from '../../../../services/inventory-api.service';
import { ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('AddWeightInventoryComponent', () => {
  let component: AddWeightInventoryComponent;
  let fixture: ComponentFixture<AddWeightInventoryComponent>;
  let mockInventoryApiService: any;
  let mockMatDialog: any;
  let mockToastrService: any;
  let mockDialogData: any;

  beforeEach(async () => {
    mockInventoryApiService = {
      addQuantityWeight: jest.fn()
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
      name: "ACID BLACK"
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule, AddWeightInventoryComponent],
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
    fixture = TestBed.createComponent(AddWeightInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with dialog data', () => {
    component.ngOnInit();
    expect(component.addWeightForm).toBeDefined();
    expect(component.addWeightForm.controls['id'].value).toBe(mockDialogData.dyeInventory_id);
    expect(component.addWeightForm.controls['type'].value).toBe('');
    expect(component.addWeightForm.controls['weigth'].value).toBe('');
  });

  it('should display error if form is invalid on submit', () => {
    component.addWeigth();
    expect(mockToastrService.error).toHaveBeenCalledWith('Por favor llena Todos los campos');
  });

  it('should submit form and display success message', () => {
    component.ngOnInit();
    component.addWeightForm.setValue({
      id: mockDialogData.dyeInventory_id,
      type: 'gr',
      weigth: 100
    });

    mockInventoryApiService.addQuantityWeight.mockReturnValue(of({ message: 'Weight added successfully' }));

    component.addWeigth();

    expect(mockInventoryApiService.addQuantityWeight).toHaveBeenCalledWith(component.addWeightForm.value);
    expect(mockToastrService.success).toHaveBeenCalledWith(`Exito ,Cantidad Agregada : 100`);
    expect(mockMatDialog.closeAll).toHaveBeenCalled();
  });

  it('should display error message on submit failure', () => {
    component.ngOnInit();
    component.addWeightForm.setValue({
      id: mockDialogData.dyeInventory_id,
      type: 'gr',
      weigth: 100
    });

    mockInventoryApiService.addQuantityWeight.mockReturnValue(throwError('Error'));

    component.addWeigth();

    expect(mockInventoryApiService.addQuantityWeight).toHaveBeenCalledWith(component.addWeightForm.value);
    expect(mockToastrService.error).toHaveBeenCalledWith('Por favor llena Todos los campos');
  });
});
