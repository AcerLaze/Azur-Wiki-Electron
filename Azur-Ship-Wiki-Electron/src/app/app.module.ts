import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button/';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree'

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { NgxElectronModule } from "ngx-electron";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShipListComponent } from './Component/AzurLane/ship-list/ship-list.component';
import { EquipmentListComponent } from './Component/AzurLane/equipment-list/equipment-list.component';

const routes: Routes = [{
		path: 'ship-list', 
		component: ShipListComponent	
	}, {
		path: 'equipment-list',
		component: EquipmentListComponent
	}];
@NgModule({
	declarations: [AppComponent, ShipListComponent, EquipmentListComponent],
	imports: [BrowserModule, 
		AppRoutingModule, 
		MatIconModule, 
		NgxElectronModule, 
		BrowserAnimationsModule, 
		MatSliderModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatTreeModule,
		RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor() {
	}
}
