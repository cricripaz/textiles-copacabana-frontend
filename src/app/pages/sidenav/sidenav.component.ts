import { Component, OnInit } from '@angular/core';
import {navbarData} from "./nav-data";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  collapsed = false;
  navData = navbarData


  constructor() { }

  ngOnInit(): void {
  }



  toggleCollapse():void {
    this.collapsed = !this.collapsed;
    console.log(this.collapsed)
  }

  closeSidenav():void {
    this.collapsed = false;

    console.log('close',this.collapsed)

  }
}
