import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company/company.component';
import { InfoDealsComponent } from './deal/info-deals/info-deals.component';
import { CreateDealComponent } from './deal/create-deal/create-deal.component';
import {DealsComponent} from "./deal/deals/deals.component";

const routes: Routes = [
  { path: 'deal', component: InfoDealsComponent, pathMatch: 'full'},
  { path: 'create-deal', component: CreateDealComponent},
  { path: 'company', component: CompanyComponent},
  { path: 'alldeals', component: DealsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
