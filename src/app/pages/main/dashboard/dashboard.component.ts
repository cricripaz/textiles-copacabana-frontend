import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  // Configuración del gráfico de líneas
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
        borderColor: '#FFB6C1', // LightPink
        backgroundColor: 'rgba(255,182,193,0.3)' // LightPink
      },
      {
        data: [45, 50, 60, 70, 75, 65, 50, 60, 55, 50, 45, 45],
        label: 'Ventas-2024',
        fill: true,
        tension: 0.5,
        borderColor: '#ADD8E6', // LightBlue
        backgroundColor: 'rgba(173,216,230,0.3)' // LightBlue
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
        backgroundColor: 'rgba(135,206,250,0.5)', // LightSkyBlue
        borderColor: '#87CEFA', // LightSkyBlue
      },
      {
        data: [28, 48, 40, 19],
        label: '2024',
        backgroundColor: 'rgba(144,238,144,0.5)', // LightGreen
        borderColor: '#90EE90', // LightGreen
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
        backgroundColor: [
          'rgba(255,182,193,0.3)', // LightPink
          'rgba(173,216,230,0.3)', // LightBlue
          'rgba(255,255,224,0.3)' // LightYellow
        ],
        borderColor: [
          '#FFB6C1', // LightPink
          '#ADD8E6', // LightBlue
          '#FFFFE0' // LightYellow
        ],
      }
    ]
  };
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public doughnutChartLegend = true;


}
