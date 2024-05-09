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
  customersData:any
  searchUser: string = '';

  constructor(
    private matDialog:MatDialog ,
    private toastr: ToastrService,
    private customerService: CustomerApiService
  ) { }

  ngOnInit(): void {
    this.showCustomers()
  }


  showCustomers(){
    this.customerService.fetchCustomers()
      .subscribe(data => {
        this.customersData = data
        this.customersData = this.customersData.data
      })
  }
  openDialogRegisterCustomer() {
    const dialogRef = this.matDialog.open(RegisterDialogComponent)

  }

  openDialogDeleteCustomer(customers:any,index: number) {
    this.matDialog.open(DeleteCustomerDialogComponent,
      { data:customers }).afterClosed().subscribe( (res) => {
      if (res === 'yes'){
        this.customersData.splice(index,1)
      }

    })
  }


  openModalInfoCustomer(customers: any) {

  }

  editCustomer(customers: any) {
      this.matDialog.open(EditCustomerDialogComponent, {data: customers})
  }
}
