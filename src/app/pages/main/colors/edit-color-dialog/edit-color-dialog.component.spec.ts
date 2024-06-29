import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditColorDialogComponent } from './edit-color-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorApiService } from '../../../../services/color-api.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditColorDialogComponent', () => {
  let component: EditColorDialogComponent;
  let fixture: ComponentFixture<EditColorDialogComponent>;
  let mockColorApiService: any;
  let mockToastrService: any;
  let mockMatDialogRef: any;
  const mockDialogData = { color_id: 1, name: 'Red' };

  beforeEach(async () => {
    mockColorApiService = {
      editColor: jest.fn().mockReturnValue(of({}))
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
        EditColorDialogComponent, // Importar el componente standalone aquí
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: ColorApiService, useValue: mockColorApiService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with injected data', () => {
    expect(component.EditDataColorForm.value).toEqual({
      name: mockDialogData.name,
      description: ''
    });
  });

  it('should call editColor and show success toastr on successful edit', () => {
    component.editColor();
    expect(mockColorApiService.editColor).toHaveBeenCalledWith(mockDialogData.color_id, component.EditDataColorForm.value);
    expect(mockToastrService.success).toHaveBeenCalledWith('Color Actualizado Exitosamente.', 'Éxito');
  });

  it('should call editColor and show error toastr on error', () => {
    mockColorApiService.editColor.mockReturnValueOnce(throwError({ error: 'Error' }));
    component.editColor();
    expect(mockColorApiService.editColor).toHaveBeenCalledWith(mockDialogData.color_id, component.EditDataColorForm.value);
    expect(mockToastrService.error).toHaveBeenCalledWith({ error: 'Error' }, 'Error');
    expect(mockMatDialogRef.closeAll).not.toHaveBeenCalled();
  });
});
