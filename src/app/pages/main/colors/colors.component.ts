import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgClass, NgForOf} from "@angular/common";
import {MainModule} from "../main.module";
import {ColorApiService} from "../../../services/color-api.service";
import {MatDialog} from "@angular/material/dialog";
import {
  RegisterMaterialDialogComponent
} from "../materials/register-material-dialog/register-material-dialog.component";
import {EditMaterialDialogComponent} from "../materials/edit-material-dialog/edit-material-dialog.component";
import {DeleteMaterialDialogComponent} from "../materials/delete-material-dialog/delete-material-dialog.component";


@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    NgForOf,
    NgClass,
  ],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.scss'
})
export class ColorsComponent implements OnInit{

  searchUser: any;
  colorsData: any[]=[];
  currentPage = 0;

  constructor(
    private colorService : ColorApiService,
    private matDialog : MatDialog
  ) {



  }

  ngOnInit(): void {
    this.colorService.getColors().subscribe( (res) => {

      console.log(res)

      this.colorsData = res.colors
    })
  }
  getCurrentPageItems() {
    return [{},{}]
  }

  openDialogRegisterColor() {
    this.matDialog.open(RegisterMaterialDialogComponent)
  }

  editColor(colors: any) {
    this.matDialog.open(EditMaterialDialogComponent)
  }

  openDialogDeleteColor(colors: any, i: number) {
    this.matDialog.open(DeleteMaterialDialogComponent)
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
