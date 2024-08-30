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
    this.loadPrediction();
  }

  setFilter(type: 'day' | 'month'): void {
    this.filterType = type;
    this.chartType = type === 'day' ? 'line' : 'bar'; // Set chart type based on filter
    this.loadPrediction();
  }

  loadPrediction(): void {
    this.loading = true;
    this.dashboardService.getPredictedOrders(this.predictionYear, this.predictionMonth).subscribe(
      predictedData => {
        if (this.filterType === 'month') {
          this.aggregateByMonth(predictedData.data);
        } else {
          this.aggregateByDay(predictedData.data);
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

  aggregateByDay(predictedData: any[]): void {
    const predictedLabels: string[] = [];
    const predictedCounts: number[] = [];
    predictedData.forEach((order: { date: string; quantity: number }) => {
      const entryDate = this.datePipe.transform(order.date, 'yyyy-MM-dd')!;
      predictedLabels.push(entryDate);
      predictedCounts.push(order.quantity);
    });

    this.lineChartData.labels = predictedLabels;
    this.lineChartData.datasets[0].data = predictedCounts;
  }

  aggregateByMonth(predictedData: any[]): void {
    const predictedDataByMonth = this.groupByMonth(predictedData, 'date', 'quantity');

    this.lineChartData.labels = predictedDataByMonth.labels;
    this.lineChartData.datasets[0].data = predictedDataByMonth.values;
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
