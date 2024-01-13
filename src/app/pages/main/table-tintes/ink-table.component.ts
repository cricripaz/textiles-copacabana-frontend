import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogConfig} from "@angular/cdk/dialog";
import {RegistroTinteDialogComponent} from "../registro-tinte-dialog/registro-tinte-dialog.component";
import {Observable} from "rxjs";
import {DyeApiService} from "../../../services/dye-api.service";



export interface TintesElement{

  id : number;
  nombre:string;
  tipo:string;
  cantidad:number;
  precio_unitario:number;
  fecha_ingreso : string;

}



@Component({
  selector: 'app-table-tintes',
  templateUrl: './ink-table.component.html',
  styleUrls: ['./ink-table.component.scss']
})


export class InkTableComponent implements OnInit , AfterViewInit {

  public allTintes : TintesElement[]=[] ;

  displayedColumns: string[] = ['id', 'nombre', 'tipo', 'cantidad','precio_unitario','fecha_ingreso'];
  dataSource = new MatTableDataSource<TintesElement>(this.allTintes);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;




  constructor(
    private _liveAnnouncer: LiveAnnouncer ,
    private matDialog:MatDialog ,
    private dyeService : DyeApiService
    ) {}



  ngOnInit(): void {
    this.dyeService.fetchDyes().subscribe(
      (data) => {
        this.allTintes = data.lista_tintes;
        this.dataSource.data = this.allTintes;
      },
      error => {
        console.error('Error al obtener los tintes:', error);
      }
    );

  }

  ngAfterViewInit() {
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

  openFormTintes() {
    this.matDialog.open(RegistroTinteDialogComponent)
  }


}



