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
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {map} from "rxjs/operators";
import {ThisReceiver} from "@angular/compiler";

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
  customers: Customer[] = [];  // Assuming Customer is properly defined

  constructor(
    private customerService: CustomerApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCustomers();
  }

  private initForm(): void {
    this.formOrder = this.fb.group({
      customer: ['', Validators.required],
      products: this.fb.array([this.createProduct()])
    });
  }

  get products(): FormArray {
    return this.formOrder.get('products') as FormArray;
  }

  private createProduct(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  getCustomers(): void {
    this.customerService.fetchCustomers().subscribe({
      next: (data: any[]) => this.customers = data,
      error: (err: any) => console.error('Failed to fetch customers', err)
    });
  }

  onSubmit(): void {
    console.log(this.formOrder.value);
    // Handle form submission
  }

  addProduct(): void {
    this.products.push(this.createProduct());
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
  }

}
