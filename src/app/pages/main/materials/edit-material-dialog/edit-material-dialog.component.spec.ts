import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMaterialDialogComponent } from './edit-material-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaterialApiService } from '../../../../services/material-api.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditMaterialDialogComponent', () => {
  let component: EditMaterialDialogComponent;
  let fixture: ComponentFixture<EditMaterialDialogComponent>;
  let mockMaterialApiService: any;
  let mockToastrService: any;
  let mockMatDialogRef: any;
  const mockDialogData = { material_id: 1, name: 'Cotton', description: 'Soft fabric' };

  beforeEach(async () => {
    mockMaterialApiService = {
      editMaterial: jest.fn().mockReturnValue(of({}))
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockMatDialogRef = {
      closeAll: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        EditMaterialDialogComponent // Importar el componente standalone aquí
      ],
      providers: [
        FormBuilder,
        { provide: MaterialApiService, useValue: mockMaterialApiService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with injected data', () => {

    console.log(component.editMaterialForm.value.description);
    console.log(component.editMaterialForm.value.name)

    expect(component.editMaterialForm.value).toEqual({
      name: mockDialogData.name,
      description: mockDialogData.description
    });
  });

  it('should call editMaterial and show success toastr on successful edit', () => {
    component.editMaterial();
    expect(mockMaterialApiService.editMaterial).toHaveBeenCalledWith(mockDialogData.material_id, component.editMaterialForm.value);
    expect(mockToastrService.success).toHaveBeenCalledWith('Material Actualizado Exitosamente.', 'Éxito');
    expect(mockMatDialogRef.closeAll).toHaveBeenCalled();
  });

  it('should call editMaterial and show error toastr on error', () => {
    mockMaterialApiService.editMaterial.mockReturnValueOnce(throwError({ error: 'Error' }));
    component.editMaterial();
    expect(mockMaterialApiService.editMaterial).toHaveBeenCalledWith(mockDialogData.material_id, component.editMaterialForm.value);
    expect(mockToastrService.error).toHaveBeenCalledWith({ error: 'Error' }, 'Error');
    expect(mockMatDialogRef.closeAll).not.toHaveBeenCalled();
  });
});
