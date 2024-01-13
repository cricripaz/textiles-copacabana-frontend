import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {InventoryApiService} from "../../../services/inventory-api.service";




export interface InventoryElement{
  id : number;
  name : string;
  type : string;
  weigth : number;
  description : string;
}

@Component({
  selector: 'app-inventory-table-tintes',
  templateUrl: './inventory-table-tintes.component.html',
  styleUrls: ['./inventory-table-tintes.component.scss']
})
export class InventoryTableTintesComponent implements OnInit , AfterViewInit {

  public allInventory : InventoryElement[]=[]

  displayedColumns: string[] = ['dyeInventory_id', 'name', 'dyeType_id','weight','description'];
  dataSource = new MatTableDataSource<InventoryElement>(this.allInventory);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _liveAnnouncer: LiveAnnouncer ,
    private matDialog:MatDialog ,
    private inventoryService : InventoryApiService
  ) { }

  ngOnInit(): void {
    this.inventoryService.fetchInventory().subscribe(
      (data) => {
        console.log( 'inventory : ', data )
        this.allInventory = data.data;
        this.dataSource.data = this.allInventory;
      },
      error => {
        console.error('Error al obtener los items del inventario:', error);
      }
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
