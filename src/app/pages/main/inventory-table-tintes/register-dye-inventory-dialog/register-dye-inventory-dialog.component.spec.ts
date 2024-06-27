import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InventoryApiService } from '../../../../services/inventory-api.service';
import { RegisterDyeInventoryDialogComponent } from './register-dye-inventory-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';

jest.mock('jwt-decode', () => jest.fn());

describe('RegisterDyeInventoryDialogComponent', () => {
  let component: RegisterDyeInventoryDialogComponent;
  let fixture: ComponentFixture<RegisterDyeInventoryDialogComponent>;
  let mockInventoryApiService: any;
  let mockMatDialog: any;
  let mockToastrService: any;
  let mockTokenData: any;

  beforeEach(async () => {
    mockInventoryApiService = {
      createDyeInventory: jest.fn()
    };

    mockMatDialog = {
      closeAll: jest.fn()
    };

    mockToastrService = {
      success: jest.fn(),
      error: jest.fn()
    };

    mockTokenData = {
      user_id: 123
    };

    localStorage.setItem('token', 'mockToken');
    (jwt_decode as jest.Mock).mockReturnValue(mockTokenData);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule],
      declarations: [RegisterDyeInventoryDialogComponent],
      providers: [
        FormBuilder,
        { provide: InventoryApiService, useValue: mockInventoryApiService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ToastrService, useValue: mockToastrService }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDyeInventoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with user_id from token', () => {
    component.ngOnInit();
    expect(component.user_id).toBe(mockTokenData.user_id);
    expect(component.inventoryForm).toBeDefined();
    expect(component.inventoryForm.controls['user_id'].value).toBe(mockTokenData.user_id);
  });

  it('should display error if form is invalid on submit', () => {
    component.registerDyeInventory();
    expect(mockToastrService.error).toHaveBeenCalledWith('Por favor llena Todos los campos');
  });

  it('should submit form and display success message on valid form', () => {
    component.ngOnInit();
    component.inventoryForm.setValue({
      name: 'Test Dye',
      type: 'Colorante',
      user_id: mockTokenData.user_id,
      weigth: '100',
      description: 'Test description'
    });

    mockInventoryApiService.createDyeInventory.mockReturnValue(of({ message: 'Tinte registrado exitosamente' }));

    component.registerDyeInventory();

    expect(mockInventoryApiService.createDyeInventory).toHaveBeenCalledWith(component.inventoryForm.value);
    expect(mockToastrService.success).toHaveBeenCalledWith('Tinte registrado exitosamente');
    expect(mockMatDialog.closeAll).toHaveBeenCalled();
  });

  it('should display error message on submit failure', () => {
    component.ngOnInit();
    component.inventoryForm.setValue({
      name: 'Test Dye',
      type: 'Colorante',
      user_id: mockTokenData.user_id,
      weigth: '100',
      description: 'Test description'
    });

    mockInventoryApiService.createDyeInventory.mockReturnValue(throwError('Error'));

    component.registerDyeInventory();

    expect(mockInventoryApiService.createDyeInventory).toHaveBeenCalledWith(component.inventoryForm.value);
  });
});
