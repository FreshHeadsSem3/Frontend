import { Component } from '@angular/core';
import {Deal} from "../../model/deal/deal";
import {DealService} from "../../service/deal.service";

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent {
  public AllDeals!: Deal[];
  public ErrorMassage: string = "";

  constructor(private dealService: DealService) {
    this.dealService.getAllDeals()
      .subscribe(element => {
        if (element == null){
          this.ErrorMassage == "No deals where found";
        } else {
          this.AllDeals = element
          console.log("ahlllasdjfoj", this.AllDeals)
        }
      })
  }
}
