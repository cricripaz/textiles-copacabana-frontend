import { Component, OnInit } from '@angular/core';
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

// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  searchItem: string= '';
  orderData: any;
  currentPage: number = 0;
  selectedIndexes: Set<number> = new Set<number>();
  isSelectedAll: boolean = false; // Estado de la checkbox "Select All"


  constructor(
    private orderService : OrdersApiService,
    private toastrService : ToastrService,
    private matdialog : MatDialog
  ) { }

  ngOnInit(): void {

    this.showOrders()

  }

  //ACTIONS

  showOrders(){

    this.orderService.getOrders().subscribe( data => {
      this.orderData = data
      this.orderData =  this.orderData.data

      console.log(this.orderData)
    })

  }

  openDialogRegisterOrder() {

    this.matdialog.open(RegisterOrderDialogComponent)

  }



  openDialogDeleteOrder(order: any) {
    this.matdialog.open(DeleteOrderDialogComponent, {data : order})

  }

  editOrder(order: any) {
      this.matdialog.open(EditOrderDialogComponent, {data : order})
  }

  openModalOrder(order: any) {
    this.matdialog.open(OrderPopupComponent, {data : order})
  }


  //GENERATE PDF

  toggleAllSelections(): void {
    this.isSelectedAll = !this.isSelectedAll; // Cambiar el estado de "Select All".
    if (this.isSelectedAll) {
      this.orderData.forEach((_: any, index: number) => this.selectedIndexes.add(index));
    } else {
      this.selectedIndexes.clear();
    }
  }
  toggleSelection(index: number): void {
    if (this.selectedIndexes.has(index)) {
      this.selectedIndexes.delete(index);
      this.isSelectedAll = false; // Si se desmarca alguna, "Select All" también debe desmarcarse.
    } else {
      this.selectedIndexes.add(index);
      // Si el tamaño del conjunto de índices seleccionados es igual al número de órdenes, marcar "Select All".
      this.isSelectedAll = this.selectedIndexes.size === this.orderData.length;
    }
  }




  calculateInitialIndex() {

  }

  calculateFinalIndex() {

  }

  getPageNumbers() {

  }

  getTotalPages() {
    return 0;
  }

  getCurrentPageItems() {

  }

  exportOrders() {


    const selectedOrders = Array.from(this.selectedIndexes).map(index => this.orderData[index])

    if (selectedOrders.length === 0) {

      this.toastrService.warning('Selecciona al menos 1 Orden')

    } else {


      // Aquí puedes hacer más acciones, como procesar las órdenes seleccionadas.

      const body = [];
      // Agregar los encabezados de columna al PDF
      body.push([
        'ID', 'Título', 'Color', 'Código Color', 'Fecha', 'Estado', 'realizado'
      ]);

      selectedOrders.forEach(order => {
        body.push([
          order.lote.toString(),
          order.title,
          order.color,
          order.cod_color,
          new Date(order.date).toLocaleDateString(),
          order.state,
          '  '
        ]);
      });

      const docDefinition = {
        content: [
          {
            // Contenedor para la imagen y el título
            columns: [
              {
                // Columna para el título, asegurándose de que se alinee a la izquierda
                text: `Órdenes del día: ${new Date().toLocaleDateString()}`,
                style: 'header',
                alignment: 'left',
                margin: [10, 0, 0, 0]  // Margen para alinear correctamente con la imagen
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
            margin: [0, 10, 0, 10] // Ajustado para alinear con la imagen
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
}
