import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NavigationComponent} from "./navigation/navigation.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import {FormsModule} from "@angular/forms";
import { RegisterDyeInventoryDialogComponent } from './inventory-table-tintes/register-dye-inventory-dialog/register-dye-inventory-dialog.component';
import { InventoryTableTintesComponent } from './inventory-table-tintes/inventory-table-tintes.component';
import {TypeDyePipe} from "../../pipes/type-dye.pipe";
import { UserComponent } from './user/user.component';
import { RegisterUserDialogComponent } from './user/register-user-dialog/register-user-dialog.component';
import { EditUserDialogComponent } from './user/edit-user-dialog/edit-user-dialog.component';
import {SearchTablePipe} from "../../pipes/search-table.pipe";
import { RecipesComponent } from './recipes/recipes.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerComponent } from './customer/customer.component';
import { RegisterDialogComponent } from './recipes/register-dialog/register-dialog.component';
import { RecipePopupComponent } from './recipes/recipe-popup/recipe-popup.component';
import { DeleteDialogComponent } from './recipes/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './recipes/edit-dialog/edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {DeleteDialogUserComponent} from "./user/delete-dialog-userr/delete-dialog.component";
import {DyeingComponent} from "./dyeing/dyeing.component";
import {RoleIdToNamePipe} from "../../pipes/role-id-to-name.pipe";
import {BaseChartDirective} from "ng2-charts";
import {DateTimeFormatPipe} from "../../pipes/date-time-format.pipe";
import {ColorsComponent} from "./colors/colors.component";
import {MaterialsComponent} from "./materials/materials.component";

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
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Textiles Copacabana'
      },
      {
        path:'dyeing',
        component: DyeingComponent
      },
      {
        path: 'inventory-dye',
        component: InventoryTableTintesComponent,
        title: 'Textiles Copacabana'
      },
      {
        path: 'users',
        component : UserComponent ,
      },
      {
        path: 'recipes',
        component : RecipesComponent
      },
      {
        path:'orders',
        component :OrdersComponent
      },
      {
        path:'customers',
        component: CustomerComponent
      },
      {
        path:'colors',
        component :ColorsComponent
      },
      {
        path:'materials',
        component: MaterialsComponent
      },



    ]
  }

]


@NgModule({
  declarations: [
    DashboardComponent,
    NavigationComponent,
    RegisterDyeInventoryDialogComponent,
    InventoryTableTintesComponent,
    TypeDyePipe,
    UserComponent,
    RegisterUserDialogComponent,
    EditUserDialogComponent,
    SearchTablePipe,
    RecipesComponent,
    OrdersComponent,
    CustomerComponent,
    RegisterDialogComponent,
    RecipePopupComponent,
    DeleteDialogComponent,
    EditDialogComponent
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
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    DeleteDialogUserComponent,
    RoleIdToNamePipe,
    BaseChartDirective,
    DateTimeFormatPipe,

  ],
    exports: [RouterModule, NavigationComponent, SearchTablePipe]
})
export class MainModule { }
