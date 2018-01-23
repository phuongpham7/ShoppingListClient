import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SidebarComponent } from './components/sidebar/index';
import { HeaderComponent } from './components/header/index';
import { DashboardComponent } from './dashboard/index';
import { ShoppingListComponent } from './shoppingList/index';
import { WeatherForecastComponent } from './weatherForecast/index';


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        LayoutRoutingModule
    ],
    declarations: [
        SidebarComponent,
        HeaderComponent,
        DashboardComponent,
        ShoppingListComponent,
        WeatherForecastComponent
    ],
    exports: [
        SidebarComponent,
        HeaderComponent
    ]
})
export class LayoutModule {}
