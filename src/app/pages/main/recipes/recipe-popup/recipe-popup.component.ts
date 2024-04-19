import {Component, Inject, OnInit} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from "@angular/material/legacy-dialog";

@Component({
  selector: 'app-recipe-popup',
  templateUrl: './recipe-popup.component.html',
  styleUrls: ['./recipe-popup.component.scss']
})
export class RecipePopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  protected readonly Object = Object;
}
