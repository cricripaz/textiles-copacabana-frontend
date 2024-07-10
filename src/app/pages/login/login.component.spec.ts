import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any;
  let mockRouter: any;
  let mockToastrService: any;

  beforeEach(waitForAsync(() => {
    mockAuthService = {
      signin: jest.fn().mockReturnValue(of({ token: 'test-token' }))
    };

    mockRouter = {
      navigate: jest.fn()
    };

    mockToastrService = {
      error: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on init', () => {
    expect(component.loginForm).toBeDefined();
  });

  it('should show error if form is invalid on login', () => {
    component.loginForm.setValue({ username: '', password: '' });
    component.logIn();
    expect(mockToastrService.error).toHaveBeenCalledWith('Por favor llena Todos los campos');
  });

  it('should call authService.signin if form is valid', () => {
    component.loginForm.setValue({ username: 'test', password: 'password' });
    component.logIn();
    expect(mockAuthService.signin).toHaveBeenCalledWith({ username: 'test', password: 'password' });
  });

  it('should navigate to main on successful login', () => {
    component.loginForm.setValue({ username: 'test', password: 'password' });
    component.logIn();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['main']);
  });

  it('should store token in local storage on successful login', () => {
    component.loginForm.setValue({ username: 'test', password: 'password' });
    component.logIn();
    expect(localStorage.getItem('token')).toBe('test-token');
  });

  it('should show error if login fails', () => {
    mockAuthService.signin.mockReturnValueOnce(throwError({}));
    component.loginForm.setValue({ username: 'test', password: 'password' });
    component.logIn();
    expect(mockToastrService.error).toHaveBeenCalledWith('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
  });
});
