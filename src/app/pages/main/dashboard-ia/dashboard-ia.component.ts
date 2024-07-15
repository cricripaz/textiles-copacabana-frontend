import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DashboardService } from "../../../services/dashboard.service";
import { forkJoin } from 'rxjs';
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-dashboard-ia',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard-ia.component.html',
  styleUrls: ['./dashboard-ia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardIaComponent implements OnInit {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
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

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public lineChartLegend = true;
  public loading = true;
  private filterType: 'day' | 'month' = 'day';

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
    this.loadChartData();
  }

  loadChartData(): void {
    this.loading = true;
    forkJoin({
      realData: this.dashboardService.getOrdersByDateRange('2024-01-01', '2024-06-29'),
      predictedData: this.dashboardService.getPredictedOrders(2024, 7)
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

  aggregateByDay(realData: any[], predictedData: any[]): void {
    const realLabels: string[] = [];
    const realCounts: number[] = [];
    realData.forEach((order: { entry_date: string; total_orders: number }) => {
      const entryDate = this.datePipe.transform(order.entry_date, 'yyyy-MM-dd')!;
      realLabels.push(entryDate);
      realCounts.push(order.total_orders);
    });

    const predictedLabels: string[] = [];
    const predictedCounts: number[] = [];
    predictedData.forEach((order: { date: string; quantity: number }) => {
      const entryDate = this.datePipe.transform(order.date, 'yyyy-MM-dd')!;
      predictedLabels.push(entryDate);
      predictedCounts.push(order.quantity);
    });

    this.lineChartData.labels = [...new Set([...realLabels, ...predictedLabels])];
    this.lineChartData.datasets[0].data = this.lineChartData.labels.map(label => {
      // @ts-ignore
      const index = realLabels.indexOf(label);
      return index !== -1 ? realCounts[index] : 0;
    });
    this.lineChartData.datasets[1].data = this.lineChartData.labels.map(label => {
      // @ts-ignore
      const index = predictedLabels.indexOf(label);
      return index !== -1 ? predictedCounts[index] : 0;
    });
    this.lineChartData.datasets[1].label = 'Predicción';
  }

  aggregateByMonth(realData: any[], predictedData: any[]): void {
    const realDataByMonth = this.groupByMonth(realData, 'entry_date', 'total_orders');
    const predictedDataByMonth = this.groupByMonth(predictedData, 'date', 'quantity');

    this.lineChartData.labels = [...new Set([...realDataByMonth.labels, ...predictedDataByMonth.labels])];
    // @ts-ignore
    this.lineChartData.datasets[0].data = this.lineChartData.labels.map(label => realDataByMonth.values[label] || 0);
    // @ts-ignore
    this.lineChartData.datasets[1].data = this.lineChartData.labels.map(label => predictedDataByMonth.values[label] || 0);
    this.lineChartData.datasets[1].label = 'Predicción';
  }

  groupByMonth(data: any[], dateKey: string, valueKey: string): { labels: string[], values: { [key: string]: number } } {
    const groupedData = data.reduce((acc: { [key: string]: number }, item: any) => {
      const month = this.datePipe.transform(item[dateKey], 'yyyy-MM')!;
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += item[valueKey];
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const values = groupedData;
    return { labels, values };
  }
}
