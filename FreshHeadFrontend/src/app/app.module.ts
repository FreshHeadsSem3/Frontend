import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr'

import { FormsModule } from '@angular/forms';
import { DealsComponent } from './deal/deals/deals.component';
import { InfoDealsComponent } from './deal/info-deals/info-deals.component';
import { CompanyComponent } from './company/company/company.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateDealComponent } from './deal/create-deal/create-deal.component';
import { ModalComponent } from './modals/modal/modal.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CreateCompanyComponent } from './company/create-company/create-company.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import { CompaniesComponent } from './company/companies/companies.component'

@NgModule({
  declarations: [
    AppComponent,
    DealsComponent,
    InfoDealsComponent,
    CompanyComponent,
    NavbarComponent,
    CreateDealComponent,
    ModalComponent,
    CreateCompanyComponent,
    CompaniesComponent
  ],
  imports: [
    BrowserModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
