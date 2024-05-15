import {Component, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerApiService} from "../../../../services/customer-api.service";
import {Customer} from "../../../../models/customer.model";
import {ProductServiceService} from "../../../../services/product.service.service";


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
  formOrder!: FormGroup;
  customers: Customer[] = [];
  productsData : any[] =[];

  constructor(
    private customerService: CustomerApiService,
    private productsService: ProductServiceService,
    private fb: FormBuilder
  ) {}

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
      product_select: ['', Validators.required],
      quantity:['']
    });
  }

  get products(): FormArray {
    return this.formOrder.get('products') as FormArray;
  }

  getData(): void {
    this.customerService.fetchCustomers().subscribe((res) => {
      this.customers = res.customers.sort((a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name));
    });

    this.productsService.fetchProducts().subscribe((res) => {
      this.productsData = res.products.sort((a: { name_product: string; }, b: { name_product: string; }) => a.name_product.localeCompare(b.name_product));
    });
  }

  addProduct(): void {
    this.products.push(this.createProductGroup());
  }

  removeProduct(index: number): void {
    if (this.products.length > 1) {
      this.products.removeAt(index);
    }
  }

  onSubmit(): void {
    console.log(this.formOrder.value);
    // Handle form submission
  }



}
