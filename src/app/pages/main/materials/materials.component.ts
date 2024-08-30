import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgForOf } from '@angular/common';
import { MaterialApiService } from '../../../services/material-api.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterColorDialogComponent } from '../colors/register-color-dialog/register-color-dialog.component';
import { RegisterMaterialDialogComponent } from './register-material-dialog/register-material-dialog.component';
import { EditMaterialDialogComponent } from './edit-material-dialog/edit-material-dialog.component';
import { DeleteMaterialDialogComponent } from './delete-material-dialog/delete-material-dialog.component';
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [
    CommonModule,  // Asegúrate de importar CommonModule
    FormsModule,
    MatButtonModule,
    MatIconModule,
    NgForOf,
    NgClass,
    SharedModule
  ],
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {

  searchUser: string = '';
  materialData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private materialService: MaterialApiService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.materialService.getOrders().subscribe((res) => {
      console.log(res)
      this.materialData = res.materials
    })
  }
  openDialogRegisterMaterial() {
    this.matDialog.open(RegisterMaterialDialogComponent);
  }

  openDialogDeleteMaterial(material: any, index: number) {
    this.matDialog.open(DeleteMaterialDialogComponent, { data: material }).afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.materialData.splice(index, 1);
        this.updatePagination();
      }
    });
  }

  editMaterial(material: any) {
    this.matDialog.open(EditMaterialDialogComponent, { data: material });
  }

  // PAGINATION METHODS

  calculateInitialIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  calculateFinalIndex(): number {
    const materialsLength = this.materialData.length;
    return Math.min(this.currentPage * this.itemsPerPage, materialsLength);
  }

  getTotalPages(): number {
    return Math.ceil(this.materialData.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getVisiblePageNumbers(): (number | string)[] {
    const totalPages = this.getTotalPages();
    const visiblePages: (number | string)[] = [];
    const maxVisiblePages = 10;
    const currentPage = this.currentPage;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);

      visiblePages.push(1);

      if (startPage > 2) {
        visiblePages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }

      if (endPage < totalPages - 1) {
        visiblePages.push('...');
      }

      visiblePages.push(totalPages);
    }

    return visiblePages;
  }

  getCurrentPageItems() {
    const initialIndex = this.calculateInitialIndex();
    const finalIndex = this.calculateFinalIndex();
    return this.materialData.slice(initialIndex, finalIndex);
  }

  updatePagination() {
    this.currentPage = Math.min(this.currentPage, this.getTotalPages());
  }

  protected readonly Number = Number;
}
