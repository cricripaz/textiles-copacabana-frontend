import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-inventory-popup',
  standalone: true,
  imports: [],
  templateUrl: './inventory-popup.component.html',
  styleUrl: './inventory-popup.component.scss'
})
export class InventoryPopupComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
  }


}
