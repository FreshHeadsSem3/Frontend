import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { DealsComponent } from './deal/deals/deals.component';
import { InfoDealsComponent } from './deal/info-deals/info-deals.component';
import { CompanyComponent } from './company/company/company.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateDealComponent } from './deal/create-deal/create-deal.component';
import {ClaimDealComponent} from "./deal/info-deals/claim-deal/claim-deal.component";


@NgModule({
  declarations: [
    AppComponent,
    DealsComponent,
    InfoDealsComponent,
    CompanyComponent,
    NavbarComponent,
    CreateDealComponent,
    ClaimDealComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
