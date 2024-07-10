import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DeleteDialogUserComponent } from './delete-dialog.component';
import { UserApiService } from '../../../../services/user-api.service';
import { of, throwError } from 'rxjs';

describe('DeleteDialogUserComponent', () => {
  let component: DeleteDialogUserComponent;
  let fixture: ComponentFixture<DeleteDialogUserComponent>;
  let userServiceMock: any;
  let matDialogRefMock: any;
  let toastrServiceMock: any;

  beforeEach(async () => {
    userServiceMock = {
      deleteUser: jest.fn()
    };

    matDialogRefMock = {
      close: jest.fn()
    };

    toastrServiceMock = {
      success: jest.fn(),
      error: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ToastrModule.forRoot(),
        DeleteDialogUserComponent // Importa el componente standalone
      ],
      providers: [
        { provide: UserApiService, useValue: userServiceMock },
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { user_id: 1 } },
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteDialogUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteUser and show success message on successful delete', () => {
    userServiceMock.deleteUser.mockReturnValue(of({}));
    component.deleteRecipe();
    expect(userServiceMock.deleteUser).toHaveBeenCalledWith(1);
    expect(toastrServiceMock.success).toHaveBeenCalledWith('Usuario Eliminado Correctamente');
    expect(matDialogRefMock.close).toHaveBeenCalledWith('yes');
  });

  it('should call deleteUser and show error message on error', () => {
    userServiceMock.deleteUser.mockReturnValue(throwError('Error occurred'));
    component.deleteRecipe();
    expect(userServiceMock.deleteUser).toHaveBeenCalledWith(1);
    expect(toastrServiceMock.error).toHaveBeenCalledWith('Error al eliminar receta:', 'Error occurred');
  });
});
