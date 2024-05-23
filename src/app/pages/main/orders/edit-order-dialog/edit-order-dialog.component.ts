import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrdersApiService} from "../../../../services/orders-api.service";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CustomerApiService} from "../../../../services/customer-api.service";
import {AsyncPipe} from "@angular/common";
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
interface Customer {
  customer_id: number;
  name: string;
}
@Component({
  selector: 'app-edit-order-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    AsyncPipe,
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-order-dialog.component.html',
  styleUrl: './edit-order-dialog.component.scss'
})

export class EditOrderDialogComponent implements OnInit {
  formOrder: FormGroup;
  customers: Customer[] = [];
  filteredMaterials = [];
  filteredColors = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrdersApiService,
    private customerService: CustomerApiService
  ) {
    this.formOrder = this.fb.group({
      customer: [''],
      products: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadOrderData();
  }

  loadCustomers() {
    this.customerService.fetchCustomers().subscribe((res: { customers: Customer[] }) => {
      this.customers = res.customers.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  loadOrderData() {
    const order = this.data;
    console.log('orderdata', order);
    if (order && order.customer_name && order.products) {

      this.formOrder.patchValue({
        customer: [order.customer_name]
      });
      const productsFormArray = this.formOrder.get('products') as FormArray;
      for (let key in order.products) {
        if (order.products.hasOwnProperty(key)) {
          const product = order.products[key];
          productsFormArray.push(this.createProductGroup({ name_material: key, name_color: '', quantity: product.quantity }));
        }
      }
    } else {
      console.error('La estructura de la orden no es válida', order);
    }
  }

  createProductGroup(product: { name_material: any; name_color: any; quantity: any; }): FormGroup {
    return this.fb.group({
      name_material: [product.name_material],
      name_color: [product.name_color],
      quantity: [product.quantity]
    });
  }

  get products(): FormArray {
    return this.formOrder.get('products') as FormArray;
  }

  addProduct() {
    const products = this.formOrder.get('products') as FormArray;
    products.push(this.createProductGroup({ name_material: '', name_color: '', quantity: '' }));
  }

  removeProduct(index: number) {
    const products = this.formOrder.get('products') as FormArray;
    products.removeAt(index);
  }

  onSubmit() {
    if (this.formOrder.valid) {
      this.orderService.updateOrder(this.data.order_id, this.formOrder.value).subscribe(
        (response: any) => {
          this.dialogRef.close(response);
        },
        (error: any) => {
          console.error('Error updating order:', error);
        }
      );
    }
  }


}
