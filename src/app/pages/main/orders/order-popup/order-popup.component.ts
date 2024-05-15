import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {KeyValuePipe, NgClass, NgForOf} from "@angular/common";
import {Order} from "../../../../models/order.model";


@Component({
  selector: 'app-order-popup',
  standalone: true,
  imports: [
    NgForOf,
    KeyValuePipe,
    NgClass
  ],
  templateUrl: './order-popup.component.html',
  styleUrl: './order-popup.component.scss'
})
export class OrderPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Order,
  ) {

  }

  protected readonly Object = Object;

  ngOnInit(): void {

  }
}
