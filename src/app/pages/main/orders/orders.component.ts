import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {OrdersApiService} from "../../../services/orders-api.service";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {RegisterDialogComponent} from "../recipes/register-dialog/register-dialog.component";
import {RegisterOrderDialogComponent} from "./register-order-dialog/register-order-dialog.component";
import {DeleteOrderDialogComponent} from "./delete-order-dialog/delete-order-dialog.component";
import {EditOrderDialogComponent} from "./edit-order-dialog/edit-order-dialog.component";
import {OrderPopupComponent} from "./order-popup/order-popup.component";
import {DatePipe} from "@angular/common";
import {ConfirmOrderDialogComponent} from "./confirm-order-dialog/confirm-order-dialog.component";
import {FinishOrderDialogComponent} from "./finish-order-dialog/finish-order-dialog.component";


// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [DatePipe],
})

export class OrdersComponent implements OnInit {
  searchItem: string = '';
  orderData: any;
  filteredOrders: any[] = [];
  paginatedOrders: any[] =[];
  selectedIndexes: Set<number> = new Set<number>();
  isSelectedAll: boolean = false; // Estado de la checkbox "Select All"
  selectedStatuses: Set<string> = new Set();
  dropdownVisible = false;

//PAGINATION
  currentPage: number = 1;
  itemsPerPage: number = 10;

  filters: { [key: string]: boolean } = {
    enProceso: false,
    completado: false,
    pendiente: false
  };

  constructor(
    private orderService: OrdersApiService,
    private toastrService: ToastrService,
    private matdialog: MatDialog
  ) {
  }

  ngOnInit(): void {

    this.showOrders()


  }


  //ACTIONS
  showOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orderData = data
      this.orderData = this.orderData.data
      this.filterOrders();
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('#filterDropdownButton') && !target.closest('#filterDropOrder')) {
      this.dropdownVisible = false;
    }
  }

  toggleStatusFilter(status: string): void {
    this.filters[status] = !this.filters[status];
    console.log(this.filters);

    if (this.selectedStatuses.has(status)) {
      this.selectedStatuses.delete(status);
    } else {
      this.selectedStatuses.add(status);
    }
    this.filterOrders();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  filterOrders(): void {
    if (this.selectedStatuses.size > 0) {
      this.filteredOrders = this.orderData.filter((order: { order_status: string }) => this.selectedStatuses.has(order.order_status));
    } else {
      this.filteredOrders = this.orderData;
    }
    this.applyPagination();
  }

  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.paginatedOrders = this.filteredOrders.slice(startIndex, endIndex);
  }

  openDialogRegisterOrder() {
    this.matdialog.open(RegisterOrderDialogComponent);
  }

  openDialogDeleteOrder(order: any, index: number) {
    this.matdialog.open(DeleteOrderDialogComponent, { data: order }).afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.orderData.splice(index, 1);
        this.filterOrders();
      }
    });
  }

  editOrder(order: any) {
    this.matdialog.open(EditOrderDialogComponent, { data: order });
  }

  openModalOrder(order: any) {
    this.matdialog.open(OrderPopupComponent, { data: order });
  }

//GENERATE PDF
  toggleAllSelections(): void {
    this.isSelectedAll = !this.isSelectedAll;
    if (this.isSelectedAll) {
      this.filteredOrders.forEach((_: any, index: number) => this.selectedIndexes.add(index));
    } else {
      this.selectedIndexes.clear();
    }
  }

  toggleSelection(index: number): void {
    if (this.selectedIndexes.has(index)) {
      this.selectedIndexes.delete(index);
      this.isSelectedAll = false;
    } else {
      this.selectedIndexes.add(index);
      this.isSelectedAll = this.selectedIndexes.size === this.filteredOrders.length;
    }
  }

  exportOrders() {
    const selectedOrders = Array.from(this.selectedIndexes).map(index => this.filteredOrders[index]);

    if (selectedOrders.length === 0) {
      this.toastrService.warning('Selecciona al menos 1 Orden');
    } else {
      const body = [];
      body.push([
        'ID', 'Nombre del Cliente', 'Estado', 'Fecha de Entrada', 'Nombre | Cantidad', 'Realizado'
      ]);
      console.log(selectedOrders);
      selectedOrders.forEach(order => {
        const products = Object.entries(order.products).map(([productName, product]) => {
          // @ts-ignore
          return [productName, product.quantity];
        });

        body.push([
          order.order_id.toString(),
          order.customer_name,
          order.order_status,
          new Date(order.entry_date).toLocaleDateString(),
          { table: { body: products } },
          '  '
        ]);
      });

      const docDefinition = {
        content: [
          {
            columns: [
              {
                text: `Órdenes del día: ${new Date().toLocaleDateString()}`,
                style: 'header',
                alignment: 'left',
                margin: [10, 0, 0, 0]
              }
            ]
          },
          {
            style: 'tableExample',
            table: {
              body: body
            }
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 10, 0, 10]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          }
        }
      };

      // @ts-ignore
      pdfMake.createPdf(docDefinition).open();
    }
  }

  startOrder(order: any, index: number) {

    this.matdialog.open(ConfirmOrderDialogComponent,{data : order}).afterClosed().subscribe( (res) => {

      console.log('res start: ',res)

      if (res=== 'yes'){
        order.order_status = 'En Proceso';
        this.orderData[index] = order;
      }
    })


  }

  finishOrder(order: any, i: number) {

    this.matdialog.open(FinishOrderDialogComponent,{ data : order }).afterClosed().subscribe( (res) => {
      console.log(res)
      //TODO validar el NO
      if (res == 'yes'){
        order.order_status = 'Completado';
        this.orderData[i] = order;
      }
    })

  }



//PAGINATION
  calculateInitialIndex() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  calculateFinalIndex() {
    const ordersLength = this.filteredOrders ? this.filteredOrders.length : 0;
    const endIndex = this.currentPage * this.itemsPerPage;
    return endIndex > ordersLength ? ordersLength : endIndex;
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
  }

  getPageNumbers() {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getCurrentPageItems() {
    const initialIndex = this.calculateInitialIndex();
    const finalIndex = this.calculateFinalIndex();
    return this.filteredOrders ? this.filteredOrders.slice(initialIndex, finalIndex) : [];
  }



}


