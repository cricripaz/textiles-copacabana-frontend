import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DashboardService } from "../../../services/dashboard.service";
import { forkJoin } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import {DatePipe} from "@angular/common";

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
      end: ['']
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
    const { start, end } = this.dateRangeForm.value;
    const formattedStart = this.datePipe.transform(start, 'yyyy-MM-dd');
    const formattedEnd = this.datePipe.transform(end, 'yyyy-MM-dd');
    console.log('Fecha de inicio:', formattedStart, 'Fecha de fin:', formattedEnd);

    // Aquí deberías llamar al servicio para cargar los datos del gráfico según el rango de fechas seleccionado
    // Ejemplo:
    this.dashboardService.getOrdersByDateRange(formattedStart, formattedEnd).subscribe(data => {
      // Actualiza this.lineChartData con los nuevos datos
      const labels: unknown[] | undefined = [];
      const orderCounts: any[] = [];

      data.forEach((order: { year: any; month: { toString: () => string; }; total_orders: any; }) => {
        labels.push(`${order.year}-${order.month.toString().padStart(2, '0')}`);
        orderCounts.push(order.total_orders);
      });

      this.lineChartData.labels = labels;
      this.lineChartData.datasets[0].data = orderCounts;
      this.cdr.markForCheck();
    }, (error: any) => {
      console.error('Error fetching data', error);
    });
  }
}
