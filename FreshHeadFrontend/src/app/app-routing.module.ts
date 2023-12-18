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
import {DealManagementComponent} from "./deal/deal-management/deal-management.component";
import {EditDealComponent} from "./deal/edit-deal/edit-deal.component";

const routes: Routes = [
  { path: '', component: DealsComponent, pathMatch: 'full'},
  { path: 'alldeals', component: DealsComponent},
  { path: 'create-deal', component: CreateDealComponent},
  { path: 'manage-deals', component: DealManagementComponent},
  { path: 'editDeal', component: EditDealComponent},
  { path: 'login', component: CompanyLoginComponent},
  { path: 'company', component: CompanyComponent},
  { path: 'deal', component: InfoDealsComponent},
  { path: 'create-company', component: CreateCompanyComponent},
  { path: 'companies', component: CompaniesComponent},
  { path: 'cancel', component: CancelDealComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
