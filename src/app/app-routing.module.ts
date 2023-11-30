import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";



const routes : Routes =[
  {
  path: 'login',
  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {

    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
