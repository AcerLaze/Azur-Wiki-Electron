import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';

import { NgxElectronModule } from "ngx-electron";

@NgModule({
	declarations: [AppComponent, LoaderComponent],
	imports: [BrowserModule, AppRoutingModule, MatIconModule, HttpClientModule, NgxElectronModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
		matIconRegistry.addSvgIconSet(
			domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
		);
	}
}
