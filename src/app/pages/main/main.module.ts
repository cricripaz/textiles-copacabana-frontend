import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {Test1Component} from "./test1/test1.component";
import {Test2Component} from "./test2/test2.component";
import {Test3Component} from "./test3/test3.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CommonModule} from "@angular/common";
import {NavigationComponent} from "./navigation/navigation.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";

const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: 'Textiles Copacabana'
      },
      {
        path:'test1',
        component: Test1Component
      },
      {
        path: 'test2',
        component: Test2Component,
        title: 'Textiles Copacabana'
      },
      {
        path: 'test3',
        component: Test3Component,
        title: 'Textiles Copacabana'
      },
    ]
  }

]


@NgModule({
  declarations: [
    DashboardComponent,
    Test1Component,
    Test2Component,
    Test3Component,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  ],
  exports: [RouterModule, NavigationComponent]
})
export class MainModule { }
