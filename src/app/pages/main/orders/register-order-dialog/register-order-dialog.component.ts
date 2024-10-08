import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import { CustomerApiService } from "../../../../services/customer-api.service";
import { Customer } from "../../../../models/customer.model";
import { MaterialApiService } from "../../../../services/material-api.service";
import { Color } from "../../../../models/color.model";
import { Material } from "../../../../models/material.model";
import { Observable, startWith } from "rxjs";
import { map } from "rxjs/operators";
import { ColorApiService } from "../../../../services/color-api.service";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { OrdersApiService } from "../../../../services/orders-api.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-register-order-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    AsyncPipe,
    MatDialogModule,
    NgClass
  ],
  templateUrl: './register-order-dialog.component.html',
  styleUrls: ['./register-order-dialog.component.scss']
})
export class RegisterOrderDialogComponent implements OnInit {
  formOrder!: FormGroup;
  customers: Customer[] = [];
  productsData: any[] = [];
  materials: Material[] = [];
  colors: Color[] = [];
  filteredMaterials: Observable<Material[]>[] = [];
  filteredColors: Observable<Color[]>[] = [];

  constructor(
    private customerService: CustomerApiService,
    private orderService: OrdersApiService,
    private materialService: MaterialApiService,
    private colorService: ColorApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private matdialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getData();
  }

  private initForm(): void {
    this.formOrder = this.fb.group({
      customer: ['', Validators.required],
      products: this.fb.array([this.createProductGroup()])
    });
  }

  private createProductGroup(): FormGroup {
    return this.fb.group({
      name_material: ['', Validators.required],
      name_color: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }


  private setupMaterialAutocomplete(productGroup: FormGroup): void {
    const materialControl = productGroup.get('name_material')!;
    this.filteredMaterials.push(
      materialControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterMaterials(value ?? ''))
      )
    );
  }

  private setupColorAutocomplete(productGroup: FormGroup): void {
    const colorControl = productGroup.get('name_color')!;
    this.filteredColors.push(
      colorControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterColors(value ?? ''))
      )
    );
  }

  get products(): FormArray {
    return this.formOrder.get('products') as FormArray;
  }

  getData(): void {
    this.customerService.fetchCustomers().subscribe((res) => {
      this.customers = res.customers.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
    });

    this.materialService.getOrders().subscribe((res) => {
      this.materials = res.materials;
    });

    this.colorService.getColors().subscribe((res) => {
      this.colors = res.colors;
      this.initFilteredObservables();
    });
  }

  initFilteredObservables(): void {
    this.filteredMaterials = [];
    this.filteredColors = [];

    this.products.controls.forEach((productGroup) => {
      this.setupMaterialAutocomplete(productGroup as FormGroup);
      this.setupColorAutocomplete(productGroup as FormGroup);
    });
  }

  private _filterMaterials(value: string): Material[] {
    const filterValue = value.toLowerCase();
    return this.materials.filter(material => material.name.toLowerCase().includes(filterValue));
  }

  private _filterColors(value: string): Color[] {
    const filterValue = value.toLowerCase();
    return this.colors.filter(color => color.name.toLowerCase().includes(filterValue));
  }

  addProduct(): void {
    const productGroup = this.createProductGroup();
    this.products.push(productGroup);
    this.setupMaterialAutocomplete(productGroup);
    this.setupColorAutocomplete(productGroup);
  }

  removeProduct(index: number): void {
    if (this.products.length > 1) {
      this.products.removeAt(index);
      this.filteredMaterials.splice(index, 1);
      this.filteredColors.splice(index, 1);
    }
  }

  onSubmit(): void {
    const orderData = {
      customer_id: this.formOrder.value.customer,
      products: this.formOrder.value.products.map((product: any) => ({
        name_material: product.name_material,
        name_color: product.name_color,
        quantity: product.quantity
      }))
    };

    this.orderService.createOrder(orderData).subscribe(response => {
      this.toastr.success('Orden Creada exitosamente', 'Exito');
      this.matdialog.closeAll();
    }, error => {
      this.toastr.error('Error al crear la orden');
    });
  }
}
