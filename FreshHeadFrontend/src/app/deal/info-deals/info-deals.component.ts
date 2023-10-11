import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Guid} from "guid-typescript";
import {DealService} from "../../service/deal.service";
import {Deal} from "../../model/deal/deal";
import {ClaimDealComponent} from "./claim-deal/claim-deal.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-info-deals',
  templateUrl: './info-deals.component.html',
  styleUrls: ['./info-deals.component.css']
})
export class InfoDealsComponent {
  public DealID!: Guid
  public deal!: Deal

  constructor(private dealService: DealService, private router: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.DealID = JSON.parse(params['data']);
      this.dealService.getDealByID(this.DealID).subscribe(result => {
        if(result == null){
          //return to component (App.component.ts)
        } else {
          this.deal = result;
        }
      })
    });
  }

  openClaimDeal(){
    let dialogRef = this.dialog.open(ClaimDealComponent, {
      data: {deal: this.deal}
    });
  }

}
