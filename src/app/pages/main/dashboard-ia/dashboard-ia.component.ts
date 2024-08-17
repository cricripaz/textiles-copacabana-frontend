import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {FormBuilder, FormsModule} from '@angular/forms';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DashboardService } from "../../../services/dashboard.service";
import { forkJoin } from 'rxjs';
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-dashboard-ia',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './dashboard-ia.component.html',
  styleUrls: ['./dashboard-ia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardIaComponent implements OnInit {
  public lineChartData: ChartConfiguration<'line' | 'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Datos Reales',
        fill: true,
        tension: 0.5,
        borderColor: '#227ddc',
        backgroundColor: 'rgba(117,174,252,0.62)'
      },
      {
        data: [],
        label: 'Predicción',
        fill: true,
        tension: 0.5,
        borderColor: '#ff0000',
        backgroundColor: 'rgba(255,99,132,0.2)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public lineChartLegend = true;
  public loading = true;
  public chartType: 'line' | 'bar' = 'line'; // Default to line chart
  private filterType: 'day' | 'month' = 'day';

  public predictionYear: number = new Date().getFullYear();
  public predictionMonth: number = new Date().getMonth() + 1;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  setFilter(type: 'day' | 'month'): void {
    this.filterType = type;
    this.chartType = type === 'day' ? 'line' : 'bar'; // Set chart type based on filter
    this.loadChartData();
  }

  loadChartData(): void {
    this.loading = true;
    forkJoin({
      realData: this.dashboardService.getOrdersByDateRange('2024-02-01', '2024-06-29'),
      predictedData: this.dashboardService.getPredictedOrders(this.predictionYear, this.predictionMonth)
    }).subscribe(
      ({ realData, predictedData }) => {
        if (this.filterType === 'month') {
          this.aggregateByMonth(realData.data, predictedData.data);
        } else {
          this.aggregateByDay(realData.data, predictedData.data);
        }
        this.loading = false;
        this.cdr.markForCheck();
      },
      error => {
        console.error('Error fetching data', error);
        this.loading = false;
      }
    );
  }

  loadPrediction(): void {
    this.loadChartData();
  }

  aggregateByDay(realData: any[], predictedData: any[]): void {
    const realLabels: string[] = [];
    const realCounts: number[] = [];
    realData.forEach((order: { entry_date: string; total_quantity: number }) => {
      const entryDate = this.datePipe.transform(order.entry_date, 'yyyy-MM-dd')!;
      realLabels.push(entryDate);
      realCounts.push(order.total_quantity);
    });

    const predictedLabels: string[] = [];
    const predictedCounts: number[] = [];
    predictedData.forEach((order: { date: string; quantity: number }) => {
      const entryDate = this.datePipe.transform(order.date, 'yyyy-MM-dd')!;
      predictedLabels.push(entryDate);
      predictedCounts.push(order.quantity);
    });

    this.lineChartData.labels = realLabels.concat(predictedLabels);
    this.lineChartData.datasets[0].data = realCounts.concat(new Array(predictedLabels.length).fill(null));
    this.lineChartData.datasets[1].data = new Array(realLabels.length).fill(null).concat(predictedCounts);
    this.lineChartData.datasets[1].label = 'Predicción';
  }

  aggregateByMonth(realData: any[], predictedData: any[]): void {
    const realDataByMonth = this.groupByMonth(realData, 'entry_date', 'total_orders');
    const predictedDataByMonth = this.groupByMonth(predictedData, 'date', 'quantity');

    this.lineChartData.labels = realDataByMonth.labels.concat(predictedDataByMonth.labels);
    this.lineChartData.datasets[0].data = realDataByMonth.values.concat(new Array(predictedDataByMonth.labels.length).fill(null));
    this.lineChartData.datasets[1].data = new Array(realDataByMonth.labels.length).fill(null).concat(predictedDataByMonth.values);
    this.lineChartData.datasets[1].label = 'Predicción';
  }

  groupByMonth(data: any[], dateKey: string, valueKey: string): { labels: string[], values: number[] } {
    const groupedData = data.reduce((acc: any, item: any) => {
      const month = this.datePipe.transform(item[dateKey], 'yyyy-MM')!;
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += item[valueKey];
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData).map(value => value as number);
    return { labels, values };
  }
}
