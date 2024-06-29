import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterUserDialogComponent } from './register-user-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserApiService } from '../../../../services/user-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterUserDialogComponent', () => {
  let component: RegisterUserDialogComponent;
  let fixture: ComponentFixture<RegisterUserDialogComponent>;
  let userApiService: UserApiService;
  let dialogRef: MatDialogRef<RegisterUserDialogComponent>;

  beforeEach(async () => {
    const userApiServiceMock = {
      createUser: jest.fn().mockReturnValue(of({}))
    };

    const dialogRefMock = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterUserDialogComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserApiService, useValue: userApiServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        ToastrService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterUserDialogComponent);
    component = fixture.componentInstance;
    userApiService = TestBed.inject(UserApiService);
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService.createUser and close dialog on successful user registration', () => {
    const userData = {
      username: 'testuser',
      password: 'password123',
      email: 'test@example.com',
      name: 'Test',
      lastname: 'User',
      numberphone: '1234567890',
      ci: '12345678',
      role_id: '1'
    };

    component.registerUser({ value: userData });

    expect(userApiService.createUser).toHaveBeenCalledWith(userData);
    expect(dialogRef.close).toHaveBeenCalledWith({ user: userData, message: 'success' });
  });

});
