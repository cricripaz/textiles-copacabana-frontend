import { Component, OnInit } from '@angular/core';
import {RecipeApiService} from "../../../services/recipe-api.service";
import {data} from "autoprefixer";
import {MatDialog} from "@angular/material/dialog";
import {RegisterDialogComponent} from "./register-dialog/register-dialog.component";
import {RecipePopupComponent} from "./recipe-popup/recipe-popup.component";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipeData:any
  searchUser: string=''
  dropdownStates: { [key: number]: boolean } = {};

  constructor(
    private recipeService : RecipeApiService,
    private matdialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.showRecipes()
  }


  showRecipes(){
    this.recipeService.fetchRecipes()
      .subscribe(
        data => {
          this.recipeData = data
          this.recipeData = this.recipeData.recipes
          console.log(this.recipeData)
        }
      )
  }
  toggleDropdown(index: number): void {
    this.dropdownStates[index] = !this.dropdownStates[index];
  }
  openDialogRegisterRecipe() {
    this.matdialog.open(RegisterDialogComponent)

  }

  openDialogDeleteRecipe(recipe : any) {

    this.matdialog.open(DeleteDialogComponent,{data : recipe})

  }

  editRecipe(recipes: any) {

  }

  deleteRecipe(i: number) {

  }

  protected readonly Object = Object;

  openModalInfoRecipe(recipes: any) {

    const dialogRef = this.matdialog.open(RecipePopupComponent,{data : recipes})


  }
}
