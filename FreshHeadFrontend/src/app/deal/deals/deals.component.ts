import { Component } from '@angular/core';
import {Deal} from "../../model/deal/deal";
import {DealService} from "../../service/deal.service";
import { Router } from '@angular/router';
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent {
  public AllDeals: Deal[] = [];
  public ErrorMassage: string = "";
  public mynumbers: number[] = [1,2,43,4,5,7,43,23,423,5,25,2]

  constructor(private dealService: DealService, private router: Router) {
    this.dealService.getAllDeals()
      .subscribe(element => {
        if (element == null){
          this.ErrorMassage == "No deals where found";
        } else {
          this.AllDeals = element
          console.log("hallo", this.AllDeals)
        }
      })
  }

  navigateInfoDeal(dealID: Guid) {
    this.router.navigate(['deal'], { queryParams: { data: JSON.stringify(dealID) } });
  }
}