import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        data: [40, 45, 50, 55, 60, 65, 100, 75, 70, 60, 50, 45],
        label: 'Ventas-2022',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      },
      {
        data: [45, 50, 60, 70, 75, 65, 50, 60, 55, 50, 45, 45],
        label: 'Ventas-2024',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(0,255,0,0.3)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public lineChartLegend = true;

  // Configuración del gráfico de barras
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        data: [65, 59, 80, 81],
        label: '2023',
        backgroundColor: 'rgba(0,123,255,0.5)',
        borderColor: 'blue',
      },
      {
        data: [28, 48, 40, 19],
        label: '2024',
        backgroundColor: 'rgba(40,167,69,0.5)',
        borderColor: 'green',
      }
    ]
  };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public barChartLegend = true;

  // Configuración del gráfico de dona
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,255,0,0.3)'],
        borderColor: ['red', 'blue', 'yellow'],
      }
    ]
  };
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public doughnutChartLegend = true;
}
