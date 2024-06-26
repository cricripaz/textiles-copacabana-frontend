import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserComponent } from './user.component';
import { UserApiService } from '../../../services/user-api.service';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {EditUserDialogComponent} from "./edit-user-dialog/edit-user-dialog.component";
import {RegisterUserDialogComponent} from "./register-user-dialog/register-user-dialog.component";
import {UserPopupComponent} from "./user-popup/user-popup.component";
import {SearchTablePipe} from "../../../pipes/search-table.pipe";


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockUserApiService: any;
  let mockMatDialog: any;

  beforeEach(async () => {
    mockUserApiService = {
      fetchUsers: jest.fn().mockReturnValue(of({ users: [{ id: 1, name: 'User1', state: 'active' }, { id: 2, name: 'User2', state: 'inactive' }] })),
    };

    mockMatDialog = {
      open: jest.fn().mockReturnValue({ afterClosed: jest.fn().mockReturnValue(of({})) }),
    };

    await TestBed.configureTestingModule({
      declarations: [
        UserComponent,
        SearchTablePipe
      ],
      providers: [
        { provide: UserApiService, useValue: mockUserApiService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should open the edit user dialog', () => {
    const user = { id: 1, name: 'User1', state: 'active' };
    component.editUser(user);
    expect(mockMatDialog.open).toHaveBeenCalledWith(EditUserDialogComponent, {
      data: {
        userdata: user,
      },
    });
  });

  it('should add new user after registering', () => {
    // Simulamos la respuesta del diálogo después de cerrarse
    mockMatDialog.open.mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of({ message: 'User Create Successfully' })),
    });

    // Detalles del nuevo usuario
    const newUser = {
      id: 2, // Asegúrate de que el ID es único y diferente al existente
      username: "test-ps",
      password: "12344",
      role_id: 3,
      email: "test@gmail.com",
      name: "pepito",
      lastname: "perez",
      numberphone: "72010260",
      ci: "678342",
      state: "active"
    };

    // Inicializamos el componente con un usuario
    component.usersData = [{ id: 1, name: 'User1', state: 'active' }];

    // Mock de la llamada fetchUsers para devolver el nuevo usuario añadido
    mockUserApiService.fetchUsers.mockReturnValue(of({
      users: [
        { id: 1, name: 'User1', state: 'active' },
        newUser
      ]
    }));

    // Abrimos el diálogo de registro de usuario
    component.openDialogRegisterUser();

    // Verificamos que el diálogo fue abierto
    expect(mockMatDialog.open).toHaveBeenCalledWith(RegisterUserDialogComponent);

    // Llamamos a showUsers para simular la actualización de la lista de usuarios
    component.showUsers();

    // Esperamos a que las suscripciones se resuelvan
    fixture.whenStable().then(() => {
      // Actualizamos el fixture para reflejar los cambios
      fixture.detectChanges();

      // Verificamos que el nuevo usuario ha sido añadido
      expect(component.usersData.length).toBe(2); // Verificamos que hay dos usuarios ahora
      expect(component.usersData).toContainEqual(newUser);
    });
  });



  it('should delete user and remove from the list', () => {
    const user = { id: 1, name: 'User1', state: 'active' };
    component.usersData = [user];
    component.openDialogDeleteUser(user, 0);
    expect(component.usersData.length).toBe(0);
  });

  it('should open user info modal', () => {
    const user = { id: 1, name: 'User1', state: 'active' };
    component.openModalInfoUser(user);
    expect(mockMatDialog.open).toHaveBeenCalledWith(UserPopupComponent, { data: user });
  });


});
