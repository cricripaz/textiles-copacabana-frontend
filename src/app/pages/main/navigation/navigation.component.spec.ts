import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';
import { initFlowbite } from 'flowbite';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RoleIdToNamePipe } from '../../../pipes/role-id-to-name.pipe'; // Importar el pipe
import jwt_decode from 'jwt-decode'; // Importar jwt_decode

jest.mock('flowbite', () => ({
  initFlowbite: jest.fn()
}));

jest.mock('jwt-decode', () => jest.fn()); // Mockear jwt_decode

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatIconModule,
        RoleIdToNamePipe // Importar el pipe aquí
      ],
      declarations: [
        NavigationComponent,
      ],
      providers: [
        { provide: BreakpointObserver, useValue: { observe: () => of() } },
        {
          provide: AuthService,
          useValue: {
            logout: jest.fn(),
            isLoggedIn: jest.fn().mockReturnValue(true)
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] // Utilizar schemas para evitar errores desconocidos
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize Flowbite on init', () => {
    expect(initFlowbite).toHaveBeenCalled();
  });

  it('should decode token on init', () => {
    const token = 'dummyToken';
    const decodedToken = { role_id: 1, username: 'testUser' };
    jest.spyOn(localStorage, 'getItem').mockImplementation(() => token);
    (jwt_decode as jest.Mock).mockReturnValue(decodedToken);

    component.ngOnInit();

    expect(component.role_id).toBe(1);
    expect(component.username).toBe('testUser');
  });

  it('should handle missing token in localStorage', () => {
    jest.spyOn(localStorage, 'getItem').mockImplementation(() => null);

    component.ngOnInit();

    expect(component.role_id).toBe(0);
    expect(component.username).toBe('');
  });

  it('should handle invalid token', () => {
    const token = 'invalidToken';
    jest.spyOn(localStorage, 'getItem').mockImplementation(() => token);
    (jwt_decode as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    component.ngOnInit();

    expect(component.role_id).toBe(0);
    expect(component.username).toBe('');
  });

  it('should call authService.logout on logOut', () => {
    const logoutSpy = jest.spyOn(authService, 'logout');
    component.logOut();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should return navData for role_id 1', () => {
    component.role_id = 1;
    expect(component.getNavData()).toEqual(component.navData);
  });

  it('should return navData for role_id 2', () => {
    component.role_id = 2;
    expect(component.getNavData()).toEqual(component.navData);
  });

  it('should return empty array for other role_ids', () => {
    component.role_id = 3;
    expect(component.getNavData()).toEqual([]);
  });

  it('should set active item', () => {
    component.setActiveItem('testItem');
    expect(component.activeItem).toBe('testItem');
  });
});
