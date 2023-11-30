import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {NavigationComponent} from "./navigation.component";
import {Test1Component} from "../test1/test1.component";
import {Test2Component} from "../test2/test2.component";
import {Test3Component} from "../test3/test3.component";
import {DashboardComponent} from "../dashboard/dashboard.component";


const routes: Route[] = [
  {
    path: '',
    component: NavigationComponent,
    title: 'Textiles Copacabana'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class NavigationModule { }
