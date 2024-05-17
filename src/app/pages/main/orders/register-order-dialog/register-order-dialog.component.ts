import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup, FormsModule, ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { CustomerApiService } from "../../../../services/customer-api.service";
import { Customer } from "../../../../models/customer.model";
import { ProductServiceService } from "../../../../services/product.service.service";
import { MaterialApiService } from "../../../../services/material-api.service";
import { Color } from "../../../../models/color.model";
import { Material } from "../../../../models/material.model";
import { Observable, startWith } from "rxjs";
import { map } from "rxjs/operators";
import { ColorApiService } from "../../../../services/color-api.service";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";

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
    MatDialogModule
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
    private materialService: MaterialApiService,
    private colorService: ColorApiService,
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
    console.log('Form initialized:', this.formOrder);
  }

  private createProductGroup(): FormGroup {

    const productGroup = this.fb.group({
      material: [''],
      color: [''],
      quantity: ['']
    });

    this.setupMaterialAutocomplete(productGroup);
    this.setupColorAutocomplete(productGroup);

    console.log('Product group created:', productGroup);
    return productGroup;
  }

  private setupMaterialAutocomplete(productGroup: FormGroup): void {

    const materialControl = productGroup.get('material')!;
    this.filteredMaterials.push(
      materialControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterMaterials(value ?? ''))
      )
    );

    console.log('Material autocomplete set up for product group:', productGroup);
  }

  private setupColorAutocomplete(productGroup: FormGroup): void {
    const colorControl = productGroup.get('color')!;
    this.filteredColors.push(
      colorControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterColors(value ?? ''))
      )
    );
    console.log('Color autocomplete set up for product group:', productGroup);
  }


  get products(): FormArray {
    return this.formOrder.get('products') as FormArray;
  }

  getData(): void {
    this.customerService.fetchCustomers().subscribe((res) => {
      this.customers = res.customers.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
      console.log('Customers loaded:', this.customers);
    });


    this.materialService.getOrders().subscribe((res) => {
      this.materials = res.materials;
      console.log('Materials loaded:', this.materials);
    });

    this.colorService.getColors().subscribe((res) => {
      this.colors = res.colors;
      console.log('Colors loaded:', this.colors);
      this.initFilteredObservables(); // Inicializar observables después de cargar los colores y materiales
    });
  }

  initFilteredObservables(): void {
    this.filteredMaterials = [];
    this.filteredColors = [];

    this.products.controls.forEach((productGroup) => {
      this.setupMaterialAutocomplete(productGroup as FormGroup);
      this.setupColorAutocomplete(productGroup as FormGroup);
    });

    console.log('Filtered observables initialized');
  }

  private _filterMaterials(value: string): Material[] {
    const filterValue = value.toLowerCase();
    const filteredMaterials = this.materials.filter(material => material.name.toLowerCase().includes(filterValue));
    console.log('Filtered materials:', filteredMaterials);
    return filteredMaterials;
  }

  private _filterColors(value: string): Color[] {
    const filterValue = value.toLowerCase();
    const filteredColors = this.colors.filter(color => color.name.toLowerCase().includes(filterValue));
    console.log('Filtered colors:', filteredColors);
    return filteredColors;
  }

  addProduct(): void {
    const productGroup = this.createProductGroup();
    this.products.push(productGroup);
    this.setupMaterialAutocomplete(productGroup);
    this.setupColorAutocomplete(productGroup);
    console.log('Product added:', productGroup);
  }

  removeProduct(index: number): void {
    if (this.products.length > 1) {
      this.products.removeAt(index);
      this.filteredMaterials.splice(index, 1);
      this.filteredColors.splice(index, 1);
      console.log('Product removed at index:', index);
    }
  }

  onSubmit(): void {
    console.log('Form submitted with value:', this.formOrder.value);
    // Handle form submission
  }
}
