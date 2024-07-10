import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { UserApiService } from '../../../../services/user-api.service';
import { EditUserDialogComponent } from './edit-user-dialog.component';
import { of, throwError } from 'rxjs';



describe('EditUserDialogComponent', () => {


  let component: EditUserDialogComponent;
  let fixture: ComponentFixture<EditUserDialogComponent>;
  let userServiceMock: any;
  let matDialogRefMock: any;
  let toastrServiceMock: any;

  beforeEach(async () => {
    userServiceMock = {
      editUser: jest.fn()
    };

    matDialogRefMock = {
      closeAll: jest.fn()
    };

    toastrServiceMock = {
      success: jest.fn(),
      error: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ EditUserDialogComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: UserApiService, useValue: userServiceMock },
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { userdata: {
              user_id: 1,
              username: 'testuser',
              role: 'admin',
              email: 'test@example.com',
              name: 'Test',
              lastName: 'User',
              numberPhone: '1234567890',
              ci: '123456'
            }}},
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with user data', () => {
    expect(component.editUserForm.value).toEqual({
      username: 'testuser',
      role_id: 1,
      email: 'test@example.com',
      name: 'Test',
      lastname: 'User',
      numberphone: '1234567890',
      ci: '123456'
    });
  });



  it('should call editUser and show error message on error', () => {
    userServiceMock.editUser.mockReturnValue(throwError('Error occurred'));
    component.editUser();
    expect(userServiceMock.editUser).toHaveBeenCalledWith(1, component.editUserForm.value);
    expect(toastrServiceMock.error).toHaveBeenCalledWith('Error occurred', 'Error');
  });
});
