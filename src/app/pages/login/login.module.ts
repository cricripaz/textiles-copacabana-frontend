import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {LoginComponent} from "./login.component";

const routes: Route[] = [
  {
    path: '',
    component: LoginComponent,
    title: 'Textiles Copacabana'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
