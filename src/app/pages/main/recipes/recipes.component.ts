import { Component, OnInit } from '@angular/core';
import { RecipeApiService } from "../../../services/recipe-api.service";
import { RegisterDialogComponent } from "./register-dialog/register-dialog.component";
import { RecipePopupComponent } from "./recipe-popup/recipe-popup.component";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { EditDialogComponent } from "./edit-dialog/edit-dialog.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipeData: any[] = [];
  searchUser: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private recipeService: RecipeApiService,
    private matdialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.showRecipes();
  }

  showRecipes() {
    this.recipeService.fetchRecipes()
      .subscribe(data => {
        this.recipeData = data && data.recipes ? data.recipes : []; // Verifica si data y data.data están definidos
      });
  }

  openDialogRegisterRecipe() {
    this.matdialog.open(RegisterDialogComponent);
  }

  openDialogDeleteRecipe(recipe: any, index: number) {
    this.matdialog.open(DeleteDialogComponent, { data: recipe }).afterClosed().subscribe((res) => {
      if (res === 'yes') {
        this.recipeData.splice(index, 1);
      }
    });
  }

  editRecipe(recipe: any) {
    this.matdialog.open(EditDialogComponent, { data: { recipe: { ...recipe, ingredients: recipe.ingredients || [] } } });
  }

  openModalInfoRecipe(recipes: any) {
    this.matdialog.open(RecipePopupComponent, { data: recipes });
  }

  // PAGINATION
  calculateInitialIndex(): number {
    return (+this.currentPage - 1) * this.itemsPerPage;
  }

  calculateFinalIndex(): number {
    const inventoryLength = this.recipeData ? this.recipeData.length : 0;
    const endIndex = +this.currentPage * this.itemsPerPage;
    return endIndex > inventoryLength ? inventoryLength : endIndex;
  }

  getTotalPages(): number {
    return Math.ceil(this.recipeData.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getVisiblePageNumbers(): (number | string)[] {
    const totalPages = this.getTotalPages();
    const visiblePages: (number | string)[] = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      let startPage = Math.max(2, +this.currentPage - 1);
      let endPage = Math.min(totalPages - 1, +this.currentPage + 1);

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
    return this.recipeData ? this.recipeData.slice(initialIndex, finalIndex) : [];
  }

  getEmptyRows(): any[] {
    const itemsShown = this.recipeData.slice(this.calculateInitialIndex(), this.calculateFinalIndex()).length;
    const emptyRowsCount = this.itemsPerPage - itemsShown;
    return Array(emptyRowsCount).fill(null);
  }
}
