import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {OrdersApiService} from "../../../../services/orders-api.service";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CustomerApiService} from "../../../../services/customer-api.service";
import {AsyncPipe} from "@angular/common";
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ProductServiceService} from "../../../../services/product.service.service";
import {ProductApiService} from "../../../../services/product-api.service";
import {ToastrService} from "ngx-toastr";
import {MaterialApiService} from "../../../../services/material-api.service";
import {ColorApiService} from "../../../../services/color-api.service";
import {Material} from "../../../../models/material.model";
import {Color} from "../../../../models/color.model";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
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
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './edit-order-dialog.component.html',
  styleUrl: './edit-order-dialog.component.scss'
})

export class EditOrderDialogComponent implements OnInit {
  formOrder: FormGroup;
  customers: Customer[] = [];
  materials = [];
  colors = [];
  filteredMaterials: Observable<any[]>[] = [];
  filteredColors: Observable<any[]>[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrdersApiService,
    private customerService: CustomerApiService,
    private productService: ProductApiService,
    private toastrService: ToastrService,
    private materialService: MaterialApiService,
    private colorService: ColorApiService
  ) {
    this.formOrder = this.fb.group({
      customer: [''],
      products: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadMaterials();
    this.loadColors();
  }

  loadMaterials() {
    this.materialService.getOrders().subscribe((res) => {
      this.materials = res.materials;
      const productsFormArray = this.formOrder.get('products') as FormArray;
      productsFormArray.controls.forEach((_, index) => {
        this.initMaterialAutocomplete(index);
      });
    });
  }

  loadColors() {
    this.colorService.getColors().subscribe((res) => {
      this.colors = res.colors;
      const productsFormArray = this.formOrder.get('products') as FormArray;
      productsFormArray.controls.forEach((_, index) => {
        this.initColorAutocomplete(index);
      });
    });
  }

  loadCustomers() {
    this.customerService.fetchCustomers().subscribe((res: { customers: Customer[] }) => {
      this.customers = res.customers.sort((a, b) => a.name.localeCompare(b.name));
      // Ahora que los clientes están cargados, carga los datos de la orden
      this.loadOrderData();
    });
  }

  loadOrderData() {
    const order = this.data;
    console.log('orderdata', order);
    if (order && order.customer_id && order.products) {
      // Usar la función getCustomerNameById para obtener el nombre del cliente
      const customerName = this.getCustomerNameById(order.customer_id);
      this.formOrder.patchValue({
        customer: customerName // Poner el nombre del cliente en el select
      });
      const productsFormArray = this.formOrder.get('products') as FormArray;
      let material!: string;
      let color!: string;

      for (let key in order.products) {
        this.productService.getMaterialAndColorByName(key).subscribe((res: any) => {
          material = res.product.material_name;
          color = res.product.color_name;

          if (order.products.hasOwnProperty(key)) {
            const product = order.products[key];
            productsFormArray.push(this.createProductGroup({ name_material: material, name_color: color, quantity: product.quantity }));
            const index = productsFormArray.length - 1;  // Obtener el índice del nuevo producto
            this.initMaterialAutocomplete(index);
            this.initColorAutocomplete(index);
          }
        });
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
    this.initMaterialAutocomplete(products.length - 1);
    this.initColorAutocomplete(products.length - 1);
  }

  removeProduct(index: number) {
    const products = this.formOrder.get('products') as FormArray;
    products.removeAt(index);
    this.filteredMaterials.splice(index, 1);
    this.filteredColors.splice(index, 1);
  }

  onSubmit() {
    const formValue = this.formOrder.value;
    // Mapear el nombre del cliente al ID del cliente antes de enviar
    const customer = this.customers.find(c => c.name === formValue.customer);
    if (customer) {
      formValue.customer = customer.customer_id;
    }
    console.log(formValue);
    if (this.formOrder.valid) {
      this.orderService.updateOrder(this.data.order_id, formValue).subscribe(
        (response: any) => {
          this.dialogRef.close(response);
        },
        (error: any) => {
          this.toastrService.error(error.message, 'Error Actualizando la orden');
          console.error('Error updating order:', error.message);
        }
      );
    }
  }

  private initMaterialAutocomplete(index: number) {
    const control = (this.formOrder.get('products') as FormArray).at(index).get('name_material') as FormControl;
    this.filteredMaterials[index] = control.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMaterials(value))
    );
  }

  private initColorAutocomplete(index: number) {
    const control = (this.formOrder.get('products') as FormArray).at(index).get('name_color') as FormControl;
    this.filteredColors[index] = control.valueChanges.pipe(
      startWith(''),
      map(value => this._filterColors(value))
    );
  }

  private _filterMaterials(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.materials.filter((option : any) => option.name.toLowerCase().includes(filterValue));
  }

  private _filterColors(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.colors.filter((option :any) => option.name.toLowerCase().includes(filterValue));
  }

  getCustomerNameById(customerId: string): string {
    const customer = this.customers.find((c :any) => c.customer_id === customerId);
    return customer ? customer.name : '';
  }


}
