import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterLinkActive, RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";
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
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import {MainModule} from "./pages/main/main.module";
import { UnitKgPipe } from './pipes/unit-kg.pipe';
import { TypeDyePipe } from './pipes/type-dye.pipe';
import { SearchTablePipe } from './pipes/search-table.pipe';
import {ToastrModule} from "ngx-toastr";
import {DatePipe, NgOptimizedImage} from "@angular/common";

import { BaseChartDirective } from 'ng2-charts';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";

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
        RouterLink,
        RouterLinkActive,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        NoopAnimationsModule,
        LayoutModule,
        AppRoutingModule,
        MainModule,
        MatTableModule,
        ToastrModule.forRoot(),
        NgOptimizedImage,
        ReactiveFormsModule,
        BaseChartDirective,
        MatProgressSpinnerModule,
        MatNativeDateModule,
      BrowserAnimationsModule,


    ],
  providers: [
    DatePipe,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    provideCharts(withDefaultRegisterables()),
    JwtHelperService
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
