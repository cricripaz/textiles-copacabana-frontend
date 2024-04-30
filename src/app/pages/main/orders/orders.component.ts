import { Component, OnInit } from '@angular/core';
import {OrdersApiService} from "../../../services/orders-api.service";
import {data} from "autoprefixer";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  searchItem: string= '';
  orderData: any;
  currentPage: number = 0;

  constructor(
    private orderService : OrdersApiService
  ) { }

  ngOnInit(): void {

    this.showOrders()

  }


  showOrders(){

    this.orderService.getOrders().subscribe( data => {
      this.orderData = data
      this.orderData =  this.orderData.data
    })

  }

  openDialogRegisterOrder() {

  }

  getCurrentPageItems() {

  }

  openDialogDeleteOrder(order: any) {

  }

  editOrder(order: any) {

  }

  openModalOrder(order: any) {

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
}
