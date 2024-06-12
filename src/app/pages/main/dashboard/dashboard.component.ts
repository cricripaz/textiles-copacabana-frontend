import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DashboardService } from "../../../services/dashboard.service";
import { forkJoin } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total Ordenes',
        fill: true,
        tension: 0.5,
        borderColor: '#227ddc',
        backgroundColor: 'rgba(117,174,252,0.62)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public lineChartLegend = true;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total Ordenes',
        backgroundColor: 'rgba(135,206,250,0.5)',
        borderColor: '#87CEFA',
      }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public barChartLegend = true;

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
      }
    ]
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public pieChartLegend = true;

  public loading = true;
  dateRangeForm: FormGroup;

  public dyeInventoryBarChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total Quantity Change',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1
      }
    ]
  };

  public dyeInventoryBarChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public dyeInventoryBarChartLegend = true;


  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {
    this.dateRangeForm = this.fb.group({
      start: [''],
      end: [''],
      groupBy: ['month'] // Agregar control para la agrupación
    });
  }

  ngOnInit(): void {
    this.loadInitialData();
    this.loadDyeInventoryData();
  }

  loadInitialData(): void {
    forkJoin({
      ordersByYear: this.dashboardService.getOrdersByYear(2024),
      ordersByCity: this.dashboardService.getOrdersByCity(),
      ordersByStatus: this.dashboardService.getOrdersByStatus() // Añade esta línea
    }).subscribe(
      ({ ordersByYear, ordersByCity, ordersByStatus }) => { // Añade ordersByStatus
        // Handle orders by year data
        const orders = ordersByYear.data;
        const labels: unknown[] | undefined = [];
        const orderCounts: any[] = [];

        orders.forEach((order: { year: any; month: { toString: () => string; }; total_orders: any; }) => {
          labels.push(`${order.year}-${order.month.toString().padStart(2, '0')}`);
          orderCounts.push(order.total_orders);
        });

        this.lineChartData.labels = labels;
        this.lineChartData.datasets[0].data = orderCounts;

        // Handle orders by city data
        const cities = ordersByCity.data.map((item: { city: any; }) => item.city);
        const totalOrders = ordersByCity.data.map((item: { total_orders: any; }) => item.total_orders);

        this.barChartData.labels = cities;
        this.barChartData.datasets[0].data = totalOrders;

        // Handle orders by status data for pie chart
        const statuses = ordersByStatus.data.map((item: { order_status: any; }) => item.order_status);
        const statusCounts = ordersByStatus.data.map((item: { total: any; }) => item.total);

        this.pieChartData.labels = statuses;
        this.pieChartData.datasets[0].data = statusCounts;

        this.loading = false;
        this.cdr.markForCheck(); // Mark the component for change detection
      },
      error => {
        console.error('Error fetching data', error);
        this.loading = false;
      }
    );
  }

  loadDyeInventoryData(): void {
    this.dashboardService.getInventoryDyesTop10().subscribe(response => {
      const data = response.data;
      const labels: string[] = [];
      const quantityChanges: number[] = [];

      data.forEach((item: { dye_name: string; total_quantity_change: number; }) => {
        labels.push(item.dye_name);
        quantityChanges.push(item.total_quantity_change);
      });

      this.dyeInventoryBarChartData = {
        labels: labels,
        datasets: [
          {
            data: quantityChanges,
            label: 'Total Quantity Change',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
          }
        ]
      };

      this.cdr.markForCheck(); // Mark the component for change detection
    }, (error: any) => {
      console.error('Error fetching dye inventory data', error);
    });
  }


  loadChartData(): void {
    const { start, end, groupBy } = this.dateRangeForm.value;
    const formattedStart: string | null = this.datePipe.transform(start, 'yyyy-MM-dd');
    const formattedEnd: string | null = this.datePipe.transform(end, 'yyyy-MM-dd');
    console.log('Fecha de inicio:', formattedStart, 'Fecha de fin:', formattedEnd, 'Agrupar por:', groupBy);

    this.dashboardService.getOrdersByDateRange(formattedStart, formattedEnd).subscribe(response => {
      console.log('Datos recibidos:', response);

      if (Array.isArray(response.data)) {
        const labels: string[] = [];
        const orderCounts: number[] = [];

        response.data.forEach((order: { entry_date: string; total_orders: number; }) => {
          const entryDate = new Date(order.entry_date);
          let label: string;

          if (groupBy === 'month') {
            const year = entryDate.getFullYear();
            const month = (entryDate.getMonth() + 1).toString().padStart(2, '0');
            label = `${year}-${month}`;
          } else { // agrupar por día
            label = this.datePipe.transform(entryDate, 'yyyy-MM-dd')!;
          }

          const labelIndex = labels.indexOf(label);
          if (labelIndex >= 0) {
            orderCounts[labelIndex] += order.total_orders;
          } else {
            labels.push(label);
            orderCounts.push(order.total_orders);
          }
        });

        this.lineChartData = {
          labels: labels,
          datasets: [
            {
              data: orderCounts,
              label: 'Total Ordenes',
              fill: true,
              tension: 0.5,
              borderColor: '#227ddc',
              backgroundColor: 'rgba(117,174,252,0.62)'
            }
          ]
        };

        console.log('Labels:', labels);
        console.log('Order Counts:', orderCounts);

        this.cdr.markForCheck();
      } else {
        console.error('Datos no son un arreglo:', response.data);
      }
    }, (error: any) => {
      console.error('Error fetching data', error);
    });
  }
}
