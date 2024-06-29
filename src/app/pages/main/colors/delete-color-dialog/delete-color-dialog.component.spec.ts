import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteColorDialogComponent } from './delete-color-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ColorApiService } from '../../../../services/color-api.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DeleteColorDialogComponent', () => {
  let component: DeleteColorDialogComponent;
  let fixture: ComponentFixture<DeleteColorDialogComponent>;
  let mockColorApiService: any;
  let mockToastrService: any;
  let mockMatDialogRef: any;
  const mockDialogData = { color_id: 1 };

  beforeEach(async () => {
    mockColorApiService = {
      deleteColor: jest.fn().mockReturnValue(of({}))
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockMatDialogRef = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [MatDialogModule,DeleteColorDialogComponent],
      providers: [
        { provide: ColorApiService, useValue: mockColorApiService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteColor and show success toastr on successful deletion', () => {
    component.deleteColor();
    expect(mockColorApiService.deleteColor).toHaveBeenCalledWith(mockDialogData.color_id);
    expect(mockToastrService.success).toHaveBeenCalledWith('Color Eliminado Exitosamente');
    expect(mockMatDialogRef.close).toHaveBeenCalledWith('yes');
  });

  it('should call deleteColor and show error toastr on error', () => {
    mockColorApiService.deleteColor.mockReturnValueOnce(throwError({ error: 'Error' }));
    component.deleteColor();
    expect(mockColorApiService.deleteColor).toHaveBeenCalledWith(mockDialogData.color_id);
    expect(mockToastrService.error).toHaveBeenCalledWith('Error Al Eliminar Color:', { error: 'Error' });
    expect(mockMatDialogRef.close).not.toHaveBeenCalled();
  });
});
