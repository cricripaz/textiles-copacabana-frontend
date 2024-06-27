import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ColorsComponent } from './colors.component';
import {MaterialsComponent} from "../materials/materials.component";
import {MaterialApiService} from "../../../services/material-api.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {
  RegisterMaterialDialogComponent
} from "../materials/register-material-dialog/register-material-dialog.component";
import {EditMaterialDialogComponent} from "../materials/edit-material-dialog/edit-material-dialog.component";
import {DeleteMaterialDialogComponent} from "../materials/delete-material-dialog/delete-material-dialog.component";
import {ColorApiService} from "../../../services/color-api.service";
import {RegisterColorDialogComponent} from "./register-color-dialog/register-color-dialog.component";
import {EditColorDialogComponent} from "./edit-color-dialog/edit-color-dialog.component";
import {DeleteColorDialogComponent} from "./delete-color-dialog/delete-color-dialog.component";  // Import the standalone component here



describe('Colors Component', () => {
  let component: ColorsComponent;
  let fixture: ComponentFixture<ColorsComponent>;
  let mockColorApiService: any;
  let mockMatDialog: any;

  beforeEach(async () => {
    mockColorApiService = {
      getColors: jest.fn().mockReturnValue(of({
        message: "Colors Get Successfully",
        colors: [
          {
            color_id: 1,
            name: "color test",
            description: null,
            status: "inactive"
          },
          {
            color_id: 2,
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
        { provide: ColorApiService, useValue: mockColorApiService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should fetch and display color on initialization', () => {
    component.ngOnInit();
    expect(mockColorApiService.getColors).toHaveBeenCalled();
    expect(component.colorsData.length).toBe(2);
    expect(component.colorsData[0].name).toBe('color test');
  });


  it('should open the register material dialog', () => {
    component.openDialogRegisterColor();
    expect(mockMatDialog.open).toHaveBeenCalledWith(RegisterColorDialogComponent);
  });


  it('should open the edit color dialog', () => {
    const color = {
      color_id: 1,
      name: 'Algodon test',
      description: null,
      status: 'inactive'
    };
    component.editColor(color);

    expect(mockMatDialog.open).toHaveBeenCalledWith(EditColorDialogComponent, { data: color });
  });


  //TODO REVISAR
  it('should delete color from the list', () => {
    const color = {
      material_id: 1,
      name: 'Algodon test',
      description: null,
      status: 'inactive'
    };
    component.colorsData = [color];
    component.openDialogDeleteColor(color);
    expect(mockMatDialog.open).toHaveBeenCalledWith(DeleteColorDialogComponent, { data: color });

    // Mock de la respuesta del diálogo de eliminación
    mockMatDialog.open.mockReturnValue({
      afterClosed: jest.fn().mockReturnValue(of('yes')),
    });

    component.openDialogDeleteColor(color);
    expect(component.colorsData.length).toBe(0);
  });

  it('should calculate correct pagination values', () => {


  });
});
