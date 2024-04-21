import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})


export class UserPopupComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

}
