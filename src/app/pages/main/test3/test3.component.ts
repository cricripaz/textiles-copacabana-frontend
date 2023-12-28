import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

interface Element {
  No: number;
  Name: string;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: Element[] = [
  { No: 1, Name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { No: 2, Name: 'Helium', weight: 4.0026, symbol: 'He' },
  { No: 3, Name: 'Lithium', weight: 6.94, symbol: 'Li' },
  { No: 4, Name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { No: 5, Name: 'Boron', weight: 10.81, symbol: 'B' },
  { No: 6, Name: 'Carbon', weight: 12.011, symbol: 'C' },
  { No: 7, Name: 'Nitrogen', weight: 14.007, symbol: 'N' },
  { No: 8, Name: 'Oxygen', weight: 15.999, symbol: 'O' },
  { No: 9, Name: 'Fluorine', weight: 18.998, symbol: 'F' },
  { No: 10, Name: 'Neon', weight: 20.180, symbol: 'Ne' },
  { No: 11, Name: 'Sodium', weight: 22.990, symbol: 'Na' },
  { No: 12, Name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { No: 13, Name: 'Aluminum', weight: 26.982, symbol: 'Al' },
  { No: 14, Name: 'Silicon', weight: 28.085, symbol: 'Si' },
  { No: 15, Name: 'Phosphorus', weight: 30.974, symbol: 'P' },
  { No: 16, Name: 'Sulfur', weight: 32.06, symbol: 'S' },
  { No: 17, Name: 'Chlorine', weight: 35.45, symbol: 'Cl' },
  { No: 18, Name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { No: 19, Name: 'Potassium', weight: 39.098, symbol: 'K' },
  { No: 20, Name: 'Calcium', weight: 40.078, symbol: 'Ca' },
  // Agrega más datos según sea necesario hasta llegar a 30
];
@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.scss']
})
export class Test3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['No', 'Name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
