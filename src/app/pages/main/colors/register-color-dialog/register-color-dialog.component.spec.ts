import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterColorDialogComponent } from './register-color-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorApiService } from '../../../../services/color-api.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterColorDialogComponent', () => {
  let component: RegisterColorDialogComponent;
  let fixture: ComponentFixture<RegisterColorDialogComponent>;
  let mockColorApiService: any;
  let mockToastrService: any;
  let mockMatDialogRef: any;

  beforeEach(async () => {
    mockColorApiService = {
      createColor: jest.fn().mockReturnValue(of({}))
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
        RegisterColorDialogComponent // Importar el componente standalone aquí
      ],
      providers: [
        FormBuilder,
        { provide: ColorApiService, useValue: mockColorApiService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MatDialogRef, useValue: mockMatDialogRef }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.DataColorForm).toBeDefined();
    expect(component.DataColorForm.controls['name']).toBeDefined();
    expect(component.DataColorForm.controls['description']).toBeDefined();
  });

  it('should call createColor and show success toastr on successful registration', () => {
    component.DataColorForm.setValue({ name: 'Red', description: 'Bright red' });
    component.registerColor();
    expect(mockColorApiService.createColor).toHaveBeenCalledWith({ name: 'Red', description: 'Bright red' });
    expect(mockToastrService.success).toHaveBeenCalledWith('Color Agregado Exitosamente');
    expect(mockMatDialogRef.closeAll).toHaveBeenCalled();
  });

  it('should call createColor and show error toastr on error', () => {
    mockColorApiService.createColor.mockReturnValueOnce(throwError({ error: 'Error' }));
    component.DataColorForm.setValue({ name: 'Red', description: 'Bright red' });
    component.registerColor();
    expect(mockColorApiService.createColor).toHaveBeenCalledWith({ name: 'Red', description: 'Bright red' });
    expect(mockToastrService.error).toHaveBeenCalledWith('Error');
    expect(mockMatDialogRef.closeAll).not.toHaveBeenCalled();
  });

  it('should show error toastr if form is invalid', () => {
    component.DataColorForm.setValue({ name: '', description: 'Bright red' });
    component.registerColor();
    expect(mockToastrService.error).toHaveBeenCalledWith('Por favor llena Todos los campos');
    expect(mockColorApiService.createColor).not.toHaveBeenCalled();
    expect(mockMatDialogRef.closeAll).not.toHaveBeenCalled();
  });
});
