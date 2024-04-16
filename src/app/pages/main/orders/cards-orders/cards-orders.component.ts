import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-orders',
  templateUrl: './cards-orders.component.html',
  styleUrls: ['./cards-orders.component.scss']
})
export class CardsOrdersComponent implements OnInit {

  colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light' },
    { color: 'dark' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
