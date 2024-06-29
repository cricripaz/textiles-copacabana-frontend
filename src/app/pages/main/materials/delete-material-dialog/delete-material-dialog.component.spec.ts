import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteMaterialDialogComponent } from './delete-material-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MaterialApiService } from '../../../../services/material-api.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DeleteMaterialDialogComponent', () => {
  let component: DeleteMaterialDialogComponent;
  let fixture: ComponentFixture<DeleteMaterialDialogComponent>;
  let mockMaterialApiService: any;
  let mockToastrService: any;
  let mockMatDialogRef: any;
  const mockDialogData = { material_id: 1 };

  beforeEach(async () => {
    mockMaterialApiService = {
      deleteMaterial: jest.fn().mockReturnValue(of({}))
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockMatDialogRef = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        DeleteMaterialDialogComponent // Importar el componente standalone aquí
      ],
      providers: [
        { provide: MaterialApiService, useValue: mockMaterialApiService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteMaterial and show success toastr on successful deletion', () => {
    component.deleteMaterial();
    expect(mockMaterialApiService.deleteMaterial).toHaveBeenCalledWith(mockDialogData.material_id);
    expect(mockToastrService.success).toHaveBeenCalledWith('Material Eliminado Exitosamente');
    expect(mockMatDialogRef.close).toHaveBeenCalledWith('yes');
  });

  it('should call deleteMaterial and show error toastr on error', () => {
    mockMaterialApiService.deleteMaterial.mockReturnValueOnce(throwError({ error: 'Error' }));
    component.deleteMaterial();
    expect(mockMaterialApiService.deleteMaterial).toHaveBeenCalledWith(mockDialogData.material_id);
    expect(mockToastrService.error).toHaveBeenCalledWith('Error Al Eliminar Material:', { error: 'Error' });
    expect(mockMatDialogRef.close).not.toHaveBeenCalled();
  });
});
