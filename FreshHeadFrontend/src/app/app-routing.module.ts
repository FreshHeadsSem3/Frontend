import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company/company.component';
import { InfoDealsComponent } from './deal/info-deals/info-deals.component';
import { CreateDealComponent } from './deal/create-deal/create-deal.component';
import { DealsComponent } from "./deal/deals/deals.component";
import { CreateCompanyComponent } from './company/create-company/create-company.component';
import { CompaniesComponent } from './company/companies/companies.component';
import {CancelDealComponent} from "./deal/cancel-deal/cancel-deal.component";
import { CompanyLoginComponent } from './company-login/company-login.component';

const routes: Routes = [
  { path: '', component: DealsComponent, pathMatch: 'full'},
  { path: 'create-deal', component: CreateDealComponent},
  {path: 'login', component: CompanyLoginComponent},
  { path: 'company', component: CompanyComponent},
  { path: 'deal', component: InfoDealsComponent},
  { path: 'create-company', component: CreateCompanyComponent},
  { path: 'companies', component: CompaniesComponent},
  { path: 'cancel', component: CancelDealComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
