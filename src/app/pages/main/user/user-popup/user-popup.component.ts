import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})


export class UserPopupComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

}
