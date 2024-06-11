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

  public loading = true;
  dateRangeForm: FormGroup;

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
  }

  loadInitialData(): void {
    forkJoin({
      ordersByYear: this.dashboardService.getOrdersByYear(2024),
      ordersByCity: this.dashboardService.getOrdersByCity()
    }).subscribe(
      ({ ordersByYear, ordersByCity }) => {
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

        this.loading = false;
        this.cdr.markForCheck(); // Mark the component for change detection
      },
      error => {
        console.error('Error fetching data', error);
        this.loading = false;
      }
    );
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
