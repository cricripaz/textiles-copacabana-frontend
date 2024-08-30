import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DashboardService } from "../../../services/dashboard.service";
import { forkJoin } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  private barColors: string[] = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
    '#FF5733', '#33FF57', '#3357FF', '#F0FF33'
  ];

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
    datasets: []
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          generateLabels: (chart) => {
            return chart.data.datasets.map((dataset, index) => ({
              text: dataset.label || '', // Muestra el label de la ciudad en la leyenda
              fillStyle: dataset.backgroundColor as string, // Color de la leyenda
              strokeStyle: dataset.borderColor as string,
              lineCap: 'butt', // Valor por defecto para cumplir con la interfaz
              lineDash: [], // Valor por defecto para cumplir con la interfaz
              lineDashOffset: 0, // Valor por defecto para cumplir con la interfaz
              lineJoin: 'miter', // Valor por defecto para cumplir con la interfaz
              lineWidth: 1, // Valor por defecto para cumplir con la interfaz
              hidden: !chart.isDatasetVisible(index), // Controlar visibilidad
              datasetIndex: index // Añadir `datasetIndex` para cumplir con la interfaz `LegendItem`
            }));
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value: number) => value.toFixed(0), // Formatear etiquetas como números enteros
        color: '#000', // Color de las etiquetas
        font: {
          weight: 'bold'
        }
      }
    }
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
      groupBy: ['month']
    });
  }

  ngOnInit(): void {
    this.loadInitialData();
    this.loadDyeInventoryData();
  }

  loadInitialData(): void {
    forkJoin({
      ordersByDateRange: this.dashboardService.getOrdersByDateRange('2024-04-01', '2024-06-29'),
      ordersByCity: this.dashboardService.getOrdersByCity(),
      ordersByStatus: this.dashboardService.getOrdersByStatus()
    }).subscribe(
      ({ ordersByDateRange, ordersByCity, ordersByStatus }) => {
        // Manejar datos por rango de fecha
        const orders = ordersByDateRange.data;
        const labels: string[] = [];
        const quantities: number[] = [];

        orders.forEach((order: { entry_date: string; total_quantity: string; }) => {
          const formattedDate = this.datePipe.transform(order.entry_date, 'yyyy-MM-dd');
          labels.push(formattedDate || '');
          quantities.push(parseFloat(order.total_quantity));
        });

        this.lineChartData = {
          labels: labels,
          datasets: [
            {
              data: quantities,
              label: 'Total Cantidad',
              fill: true,
              tension: 0.5,
              borderColor: '#227ddc',
              backgroundColor: 'rgba(117,174,252,0.62)'
            }
          ]
        };

        // Configurar etiquetas para el eje X
        this.barChartData.labels = ordersByCity.data.map((item: { city: string; }) => item.city);

        // Crear datasets para cada ciudad
        this.barChartData.datasets = ordersByCity.data.map((item: { city: string; total_orders: number; }, index: number) => ({
          label: item.city,
          data: this.barChartData.labels?.map((city, i) => city === item.city ? item.total_orders : 0),
          backgroundColor: this.barColors[index],
          borderColor: this.barColors[index],
          borderWidth: 1
        }));

        // Manejar datos por estado para el gráfico de pie
        const statuses = ordersByStatus.data.map((item: { order_status: string; }) => item.order_status);
        const statusCounts = ordersByStatus.data.map((item: { total: number; }) => item.total);

        this.pieChartData = {
          labels: statuses,
          datasets: [
            {
              data: statusCounts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
            }
          ]
        };

        this.loading = false;
        this.cdr.detectChanges(); // Forzar detección de cambios
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
            label: 'Cantidad Descontada',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
          }
        ]
      };

      this.cdr.detectChanges(); // Forzar detección de cambios
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

        // Crear un objeto temporal para agrupar por mes o día
        const groupedData: { [key: string]: number } = {};

        response.data.forEach((order: { entry_date: string; total_quantity: number; }) => {
          const entryDate = new Date(order.entry_date);
          let label: string;

          if (groupBy === 'month') {
            const year = entryDate.getFullYear();
            const month = (entryDate.getMonth() + 1).toString().padStart(2, '0');
            label = `${year}-${month}`;
          } else { // agrupar por día
            label = this.datePipe.transform(entryDate, 'yyyy-MM-dd')!;
          }

          // Asegurarse de que el valor se trate como número
          const quantity = Number(order.total_quantity);

          // Agrupar los datos en el objeto temporal asegurando que se sumen correctamente
          if (groupedData[label]) {
            groupedData[label] += quantity;
          } else {
            groupedData[label] = quantity;
          }
        });

        // Convertir el objeto temporal en arrays de labels y orderCounts
        for (const key in groupedData) {
          if (groupedData.hasOwnProperty(key)) {
            labels.push(key);
            orderCounts.push(groupedData[key]);
          }
        }

        this.lineChartData = {
          labels: labels,
          datasets: [
            {
              data: orderCounts,
              label: 'Total De Pedidos',
              fill: true,
              tension: 0.5,
              borderColor: '#227ddc',
              backgroundColor: 'rgba(117,174,252,0.62)'
            }
          ]
        };


        this.cdr.detectChanges();
      } else {
        console.error('Datos no son un arreglo:', response.data);
      }
    }, (error: any) => {
      console.error('Error fetching data', error);
    });
  }




}
