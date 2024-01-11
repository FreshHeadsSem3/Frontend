import { Component } from '@angular/core';
import {Deal} from "../../model/deal/deal";
import {CompanyService} from "../../service/company.service";
import {DealService} from "../../service/deal.service";
import {Guid} from "guid-typescript";
import {Router} from "@angular/router";

@Component({
  selector: 'app-deal-management',
  templateUrl: './deal-management.component.html',
  styleUrls: ['./deal-management.component.css']
})
export class DealManagementComponent {

  public Deals : Deal[] = []

  constructor(private companyService: CompanyService, private dealService: DealService, private router: Router) {
    dealService.getDealByCompanyJWT().subscribe(result => {
      if(result == null){

      } else {
        this.Deals = result;
        console.log(this.Deals)
        this.Deals.forEach((deal) => {
        })
      }
    })
  }

  public MustDateBeShown(date: Date) : Boolean {
    return new Date(date) > new Date("2001-01-01");
  }

  public navigateInfoDeal(dealID: Guid) {
    this.router.navigate(['deal'], { queryParams: { data: JSON.stringify(dealID) } });
  }
  public navigateEditDeal(dealID: Guid) {
    this.router.navigate(['editDeal'], { queryParams: { data: JSON.stringify(dealID) } });
  }

  public HasDatePassed(date : Date) : boolean {
    if(new Date(date) < new Date()){
      if(new Date(date) < new Date(2001,1)){
        return true;
      }
      return false;
    }
    return true;
  }
}
