import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgClass, NgForOf} from "@angular/common";
import {MaterialApiService} from "../../../services/material-api.service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterColorDialogComponent} from "../colors/register-color-dialog/register-color-dialog.component";
import {RegisterMaterialDialogComponent} from "./register-material-dialog/register-material-dialog.component";
import {EditMaterialDialogComponent} from "./edit-material-dialog/edit-material-dialog.component";
import {DeleteMaterialDialogComponent} from "./delete-material-dialog/delete-material-dialog.component";

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.scss'
})
export class MaterialsComponent implements OnInit{

  searchUser: any;
  materialData: any[]= [];
  currentPage = 0;

  constructor(
    private materialService : MaterialApiService,
    private matDialog : MatDialog
  ) {
  }
  ngOnInit(): void {
    this.materialService.getOrders().subscribe((res) => {
      console.log(res)
      this.materialData = res.materials
    })
  }

  openDialogRegisterMaterial() {
    this.matDialog.open(RegisterMaterialDialogComponent)
  }

  openDialogDeleteMaterial(material: any, i: number) {
    this.matDialog.open(DeleteMaterialDialogComponent , {data : material}).afterClosed().subscribe(
      (res) => {
        if (res === 'yes'){
          this.materialData.splice(i,1)
        }
      }
    )
  }

  editMaterial(material: any) {
    this.matDialog.open(EditMaterialDialogComponent , { data : material})
  }

  calculateInitialIndex() {
    return 30
  }

  calculateFinalIndex() {
    return 20
  }

  getPageNumbers() : any {
    return [''] ;
  }

  getTotalPages() {
    return 0;
  }
}
