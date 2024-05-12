import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerApiService} from "../../../../services/customer-api.service";
import {Customer} from "../../../../models/customer.model";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-register-order-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './register-order-dialog.component.html',
  styleUrl: './register-order-dialog.component.scss'
})
export class RegisterOrderDialogComponent implements OnInit{

  products = [];
  customers : any[] = [];

  constructor(
    private customerService : CustomerApiService
  ) {
  }


  ngOnInit(): void {
    this.getCustomers()

  }


  getCustomers(){

    this.customerService.fetchCustomers()
      .subscribe(data => {
        // Assuming 'data.customers' is the correct path if 'data' and 'data.customers' are valid
        this.customers = data && data.customers ? data.customers : [];

        this.customers.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      });

  }
  onSubmit(DataUserForm: any) {

  }

  removeProduct(i: number) {

  }

  addProduct() {

  }
}
