import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {CustomerApiService} from "../../../services/customer-api.service";
import {RegisterDialogComponent} from "./register-dialog/register-dialog.component";

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customersData:any
  searchUser: string = '';
  dropdownStates: { [key: number]: boolean } = {};

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

  toggleDropdown(index: number): void {
    this.dropdownStates[index] = !this.dropdownStates[index];
  }

  openDialogDeleteCustomer() {

  }

  editUser(users: any) {

  }

  deleteUser(i: number) {

  }
}
