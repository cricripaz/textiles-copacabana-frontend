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
import { MainComponent } from './pages/main/main.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './pages/main/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './pages/main/navigation/navigation.component';
import { Test1Component } from './pages/main/test1/test1.component';
import { Test2Component } from './pages/main/test2/test2.component';
import { Test3Component } from './pages/main/test3/test3.component';
import { AppRoutingModule } from './app-routing.module';
import {MainModule} from "./pages/main/main.module";
import {MatTableModule} from "@angular/material/table";
import { UnitKgPipe } from './pipes/unit-kg.pipe';
import { TypeDyePipe } from './pipes/type-dye.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    UnitKgPipe,

  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterLinkWithHref,
    RouterLinkActive,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NoopAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    MainModule,
    MatTableModule
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
