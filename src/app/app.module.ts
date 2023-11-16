import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterLinkActive, RouterLinkWithHref, RouterModule, RouterOutlet, Routes} from "@angular/router";
import { LoginComponent } from './pages/login/login.component';



//Routes

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    canActivate : [AuthGuard]
  }
];
//Modules

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

//providers

import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {AuthGuard} from "./guards/auth.guard";
import { HeaderComponent } from './pages/header/header.component';
import { SideNavComponent } from './pages/side-nav/side-nav.component';
import { MainComponent } from './pages/main/main.component';
import { TopWidgetsComponent } from './pages/top-widgets/top-widgets.component';
import { SalesByMonthComponent } from './pages/sales-by-month/sales-by-month.component';
import { SalesByCategoryComponent } from './pages/sales-by-category/sales-by-category.component';
import { LastFewTransactionsComponent } from './pages/last-few-transactions/last-few-transactions.component';
import { TopThreeProductsComponent } from './pages/top-three-products/top-three-products.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SideNavComponent,
    MainComponent,
    TopWidgetsComponent,
    SalesByMonthComponent,
    SalesByCategoryComponent,
    LastFewTransactionsComponent,
    TopThreeProductsComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterLinkWithHref,
    RouterLinkActive,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: JWT_OPTIONS,useValue:JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
