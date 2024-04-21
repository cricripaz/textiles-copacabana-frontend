import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomerApiService} from "../../../../services/customer-api.service";

@Component({
  selector: 'app-register-dialog',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})


export class RegisterDialogComponent implements OnInit{

  DataInventoryDyeForm: any;

  constructor(
    private customerService : CustomerApiService
  ) {
  }
  ngOnInit(): void {
  }
  registerCustomerInventory(data : any) {

    // this.customerService.createCustomer(
    //   //TODO CAMBIAR HTML INPUT del form
    //   {
    //     name: data.value
    //     type:
    //     address:
    //     city:
    //     phoneNumber:
    //     email:
    //     NIT:
    //     notes:
    //   }
    // )




  }


}
