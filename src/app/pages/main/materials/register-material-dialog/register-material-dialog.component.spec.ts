import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterMaterialDialogComponent } from './register-material-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaterialApiService } from '../../../../services/material-api.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterMaterialDialogComponent', () => {
  let component: RegisterMaterialDialogComponent;
  let fixture: ComponentFixture<RegisterMaterialDialogComponent>;
  let mockMaterialApiService: any;
  let mockToastrService: any;
  let mockMatDialogRef: any;

  beforeEach(async () => {
    mockMaterialApiService = {
      createMaterial: jest.fn().mockReturnValue(of({}))
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
        RegisterMaterialDialogComponent // Importar el componente standalone aquí
      ],
      providers: [
        FormBuilder,
        { provide: MaterialApiService, useValue: mockMaterialApiService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MatDialogRef, useValue: mockMatDialogRef }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.DataMaterialForm).toBeDefined();
    expect(component.DataMaterialForm.controls['name']).toBeDefined();
    expect(component.DataMaterialForm.controls['description']).toBeDefined();
  });

  it('should call createMaterial and show success toastr on successful registration', () => {
    component.DataMaterialForm.setValue({ name: 'Cotton', description: 'Soft fabric' });
    component.registerMaterial();
    expect(mockMaterialApiService.createMaterial).toHaveBeenCalledWith({ name: 'Cotton', description: 'Soft fabric' });
    expect(mockToastrService.success).toHaveBeenCalledWith('Material Agregado Exitosamente');
    expect(mockMatDialogRef.closeAll).toHaveBeenCalled();
  });

  it('should call createMaterial and show error toastr on error', () => {
    mockMaterialApiService.createMaterial.mockReturnValueOnce(throwError({ error: 'Error' }));
    component.DataMaterialForm.setValue({ name: 'Cotton', description: 'Soft fabric' });
    component.registerMaterial();
    expect(mockMaterialApiService.createMaterial).toHaveBeenCalledWith({ name: 'Cotton', description: 'Soft fabric' });
    expect(mockToastrService.error).toHaveBeenCalledWith('Error');
    expect(mockMatDialogRef.closeAll).not.toHaveBeenCalled();
  });

  it('should show error toastr if form is invalid', () => {
    component.DataMaterialForm.setValue({ name: '', description: 'Soft fabric' });
    component.registerMaterial();
    expect(mockToastrService.error).toHaveBeenCalledWith('Por favor llena Todos los campos');
    expect(mockMaterialApiService.createMaterial).not.toHaveBeenCalled();
    expect(mockMatDialogRef.closeAll).not.toHaveBeenCalled();
  });
});
