import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {CustomerApiService} from "../../../services/customer-api.service";
import {RegisterDialogComponent} from "./register-dialog/register-dialog.component";

import { MatDialog } from '@angular/material/dialog';
import {EditUserDialogComponent} from "../user/edit-user-dialog/edit-user-dialog.component";
import {data} from "autoprefixer";
import {EditCustomerDialogComponent} from "./edit-customer-dialog/edit-customer-dialog.component";
import {DeleteCustomerDialogComponent} from "./delete-customer-dialog/delete-customer-dialog.component";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customersData: any[] = []
  searchUser: string = '';

  currentPage: number = 1 ;
  itemsPerPage: number = 10;
  constructor(
    private matDialog:MatDialog ,
    private customerService: CustomerApiService
  ) { }

  ngOnInit(): void {
    this.showCustomers()
  }
  showCustomers() {
    this.customerService.fetchCustomers()
      .subscribe(data => {
        // Verifica si 'data' y 'data.customers' están definidos
        this.customersData = data && data.customers ? data.customers : [];

        // Ordena los clientes por `customer_id` en orden descendente
        this.customersData.sort((a: any, b: any) => b.customer_id - a.customer_id);

        console.log(this.customersData);
      });
  }



  openDialogRegisterCustomer() {
    const dialogRef = this.matDialog.open(RegisterDialogComponent)

  }

  editCustomer(customers: any) {
    this.matDialog.open(EditCustomerDialogComponent, {data: customers})
  }

  openDialogDeleteCustomer(customers:any,index: number) {
    this.matDialog.open(DeleteCustomerDialogComponent,
      { data:customers }).afterClosed().subscribe( (res) => {
      if (res === 'yes'){
        this.customersData.splice(index,1)
      }

    })
  }



  //PAGINATION

  calculateInitialIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  calculateFinalIndex(): number {
    const inventoryLength = this.customersData ? this.customersData.length : 0;
    const endIndex = this.currentPage * this.itemsPerPage;
    return endIndex > inventoryLength ? inventoryLength : endIndex;
  }

  getTotalPages(): number {
    return Math.ceil(this.customersData.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }


  getCurrentPageItems() {
    const initialIndex = this.calculateInitialIndex();
    const finalIndex = this.calculateFinalIndex();
    return this.customersData ? this.customersData.slice(initialIndex, finalIndex) : [];
  }


}
