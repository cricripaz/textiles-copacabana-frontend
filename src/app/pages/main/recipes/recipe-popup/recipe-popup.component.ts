import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-recipe-popup',
  templateUrl: './recipe-popup.component.html',
  styleUrls: ['./recipe-popup.component.scss']
})
export class RecipePopupComponent  {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }



  protected readonly Object = Object;
}
