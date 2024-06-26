import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MaterialsComponent } from './materials.component';
import { MaterialApiService } from '../../../services/material-api.service';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {DeleteMaterialDialogComponent} from "./delete-material-dialog/delete-material-dialog.component";
import {EditMaterialDialogComponent} from "./edit-material-dialog/edit-material-dialog.component";
import {RegisterMaterialDialogComponent} from "./register-material-dialog/register-material-dialog.component";

describe('MaterialsComponent', () => {
  let component: MaterialsComponent;
  let fixture: ComponentFixture<MaterialsComponent>;
  let mockMaterialApiService: any;
  let mockMatDialog: any;

  beforeEach(async () => {
    mockMaterialApiService = {
      getOrders: jest.fn().mockReturnValue(of({
        message: "Materials Get Successfully",
        materials: [
          {
            material_id: 1,
            name: "Algodon test",
            description: null,
            status: "inactive"
          },
          {
            material_id: 2,
            name: "Polyester",
            description: "Synthetic fabric",
            status: "active"
          }
        ]
      }))
    };

    mockMatDialog = {
      open: jest.fn().mockReturnValue({ afterClosed: jest.fn().mockReturnValue(of({})) }),
    };

    await TestBed.configureTestingModule({
      imports: [MaterialsComponent], // Aquí se importa el componente standalone
      providers: [
        { provide: MaterialApiService, useValue: mockMaterialApiService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display materials on initialization', () => {
    component.ngOnInit();
    expect(mockMaterialApiService.getOrders).toHaveBeenCalled();
    expect(component.materialData.length).toBe(2);
    expect(component.materialData[0].name).toBe('Algodon test');
  });

  it('should open the register material dialog', () => {
    component.openDialogRegisterMaterial();
    expect(mockMatDialog.open).toHaveBeenCalledWith(RegisterMaterialDialogComponent);
  });

  it('should open the edit material dialog', () => {
    const material = {
      material_id: 1,
      name: 'Algodon test',
      description: null,
      status: 'inactive'
    };
    component.editMaterial(material);
    expect(mockMatDialog.open).toHaveBeenCalledWith(EditMaterialDialogComponent, { data: material });
  });

  it('should delete material from the list', () => {
    const material = {
      material_id: 1,
      name: 'Algodon test',
      description: null,
      status: 'inactive'
    };
    component.materialData = [material];
    component.openDialogDeleteMaterial(material, 0);
    expect(mockMatDialog.open).toHaveBeenCalledWith(DeleteMaterialDialogComponent, { data: material });

    // Mock de la respuesta del diálogo de eliminación
    mockMatDialog.open.mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of('yes')),
    });

    component.openDialogDeleteMaterial(material, 0);
    expect(component.materialData.length).toBe(0);
  });

  it('should calculate correct pagination values', () => {


  });
});
