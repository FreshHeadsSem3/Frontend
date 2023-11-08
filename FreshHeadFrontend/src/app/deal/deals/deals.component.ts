import { Component } from '@angular/core';
import {Deal} from "../../model/deal/deal";
import {DealService} from "../../service/deal.service";
import { Router } from '@angular/router';
import {Guid} from "guid-typescript";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent {
  public AllDeals: Deal[] = [];
  public ErrorMassage: string = "";

  constructor(private dealService: DealService, private router: Router, private toastr: ToastrService) {
    this.dealService.getAllDeals()
      .subscribe(element => {
        if (element == null){
          this.toastr.error("Er zijn geen deals gevonden", "Error")
        } else {
          this.AllDeals = element
        }
      })
  }

  navigateInfoDeal(dealID: Guid) {
    this.router.navigate(['deal'], { queryParams: { data: JSON.stringify(dealID) } });
  }

  public MustDateBeShown(date: Date) : Boolean {
    return new Date(date) > new Date("2001-01-01");
  }
}
