import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from "../../../services/dashboard.service";
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardServiceMock: any;
  let datePipe: DatePipe;

  beforeEach(async () => {
    dashboardServiceMock = {
      getOrdersByYear: jest.fn().mockReturnValue(of({ data: [] })),
      getOrdersByCity: jest.fn().mockReturnValue(of({ data: [] })),
      getOrdersByStatus: jest.fn().mockReturnValue(of({ data: [] })),
      getInventoryDyesTop10: jest.fn().mockReturnValue(of({ data: [] })),
      getOrdersByDateRange: jest.fn().mockReturnValue(of({ data: [] }))
    };

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        ToastrModule.forRoot(),
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatOptionModule,
      ],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceMock },
        DatePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    datePipe = TestBed.inject(DatePipe);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group', () => {
    expect(component.dateRangeForm).toBeDefined();
  });

  it('should load initial data on init', () => {
    const ordersByYear = { data: [{ year: 2024, month: 1, total_orders: 100 }] };
    const ordersByCity = { data: [{ city: 'La Paz', total_orders: 50 }] };
    const ordersByStatus = { data: [{ order_status: 'Completed', total: 75 }] };

    dashboardServiceMock.getOrdersByYear.mockReturnValue(of(ordersByYear));
    dashboardServiceMock.getOrdersByCity.mockReturnValue(of(ordersByCity));
    dashboardServiceMock.getOrdersByStatus.mockReturnValue(of(ordersByStatus));

    component.ngOnInit();

    expect(dashboardServiceMock.getOrdersByYear).toHaveBeenCalledWith(2024);
    expect(dashboardServiceMock.getOrdersByCity).toHaveBeenCalled();
    expect(dashboardServiceMock.getOrdersByStatus).toHaveBeenCalled();

    fixture.detectChanges();

    expect(component.lineChartData.labels).toEqual(['2024-01']);
    expect(component.lineChartData.datasets[0].data).toEqual([100]);
    expect(component.barChartData.labels).toEqual(['La Paz']);
    expect(component.barChartData.datasets[0].data).toEqual([50]);
    expect(component.pieChartData.labels).toEqual(['Completed']);
    expect(component.pieChartData.datasets[0].data).toEqual([75]);
  });

  it('should handle error when loading initial data', () => {
    dashboardServiceMock.getOrdersByYear.mockReturnValue(throwError('Error occurred'));
    dashboardServiceMock.getOrdersByCity.mockReturnValue(of({ data: [] }));
    dashboardServiceMock.getOrdersByStatus.mockReturnValue(of({ data: [] }));

    component.ngOnInit();

    expect(component.loading).toBeFalsy();
    expect(component.lineChartData.labels).toEqual([]);
    expect(component.lineChartData.datasets[0].data).toEqual([]);
  });

  it('should load dye inventory data', () => {
    const dyeInventoryData = { data: [{ dye_name: 'Red', total_quantity_change: 20 }] };
    dashboardServiceMock.getInventoryDyesTop10.mockReturnValue(of(dyeInventoryData));

    component.loadDyeInventoryData();

    expect(dashboardServiceMock.getInventoryDyesTop10).toHaveBeenCalled();

    fixture.detectChanges();

    expect(component.dyeInventoryBarChartData.labels).toEqual(['Red']);
    expect(component.dyeInventoryBarChartData.datasets[0].data).toEqual([20]);
  });

  it('should handle error when loading dye inventory data', () => {
    dashboardServiceMock.getInventoryDyesTop10.mockReturnValue(throwError('Error occurred'));

    component.loadDyeInventoryData();

    expect(dashboardServiceMock.getInventoryDyesTop10).toHaveBeenCalled();
  });



  it('should handle error when loading chart data', () => {
    component.dateRangeForm.setValue({
      start: new Date('2024-01-01'),
      end: new Date('2024-01-31'),
      groupBy: 'month'
    });

    dashboardServiceMock.getOrdersByDateRange.mockReturnValue(throwError('Error occurred'));
    component.loadChartData();

    expect(dashboardServiceMock.getOrdersByDateRange).toHaveBeenCalled();
  });
});
