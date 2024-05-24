import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {NavigationComponent} from "./navigation.component";



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
