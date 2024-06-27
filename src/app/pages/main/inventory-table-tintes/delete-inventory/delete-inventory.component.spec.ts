import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InventoryApiService } from '../../../../services/inventory-api.service';
import { DeleteInventoryComponent } from './delete-inventory.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('DeleteInventoryComponent', () => {
  let component: DeleteInventoryComponent;
  let fixture: ComponentFixture<DeleteInventoryComponent>;
  let mockInventoryApiService: any;
  let mockMatDialog: any;
  let mockToastrService: any;
  let mockDialogData: any;

  beforeEach(async () => {
    mockInventoryApiService = {
      deleteItemInventory: jest.fn().mockReturnValue(of({ message: 'Item del inventario Eliminado Correctamente' }))
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
      imports: [MatDialogModule, DeleteInventoryComponent], // Cambiado a imports
      providers: [
        { provide: InventoryApiService, useValue: mockInventoryApiService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call deleteItemInventory with id', () => {
    component.deleteItemInventory();

    expect(mockInventoryApiService.deleteItemInventory).toHaveBeenCalledWith( mockDialogData.dyeInventory_id);


  });

  it('should show error message on deleteItemInventory failure', () => {
    const error = 'Error';
    mockInventoryApiService.deleteItemInventory.mockReturnValue(throwError(error));

    component.deleteItemInventory();

    expect(mockInventoryApiService.deleteItemInventory).toHaveBeenCalledWith( mockDialogData.dyeInventory_id);
    expect(mockToastrService.error).toHaveBeenCalledWith('Error al eliminar el item :', error);
  });
});
