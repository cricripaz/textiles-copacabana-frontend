import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {CommonModule, NgClass, NgForOf} from "@angular/common";
import { ColorApiService } from "../../../services/color-api.service";
import { MatDialog } from "@angular/material/dialog";
import { EditColorDialogComponent } from "./edit-color-dialog/edit-color-dialog.component";
import { RegisterColorDialogComponent } from "./register-color-dialog/register-color-dialog.component";
import { DeleteColorDialogComponent } from "./delete-color-dialog/delete-color-dialog.component";
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    NgForOf,
    NgClass,
    SharedModule,
  ],
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {
  searchUser: string = '';
  colorsData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private colorService: ColorApiService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.colorService.getColors().subscribe((res) => {
      this.colorsData = res.colors || [];
    });
  }

  openDialogRegisterColor() {
    this.matDialog.open(RegisterColorDialogComponent);
  }

  editColor(colors: any) {
    this.matDialog.open(EditColorDialogComponent, { data: colors });
  }

  openDialogDeleteColor(colors: any, index: number) {
    this.matDialog.open(DeleteColorDialogComponent, { data: colors }).afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.colorsData.splice(index, 1);
        this.updatePagination();
      }
    });
  }

  // PAGINATION METHODS

  calculateInitialIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  calculateFinalIndex(): number {
    const colorsLength = this.colorsData.length;
    return Math.min(this.currentPage * this.itemsPerPage, colorsLength);
  }

  getTotalPages(): number {
    return Math.ceil(this.colorsData.length / this.itemsPerPage);
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
    return this.colorsData.slice(initialIndex, finalIndex);
  }

  updatePagination() {
    this.currentPage = Math.min(this.currentPage, this.getTotalPages());
  }

  protected readonly Number = Number;
}
