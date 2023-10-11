import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";
import {DealService} from "../../../service/deal.service";
import {Deal} from "../../../model/deal/deal";

@Component({
  selector: 'app-claim-deal',
  templateUrl: './claim-deal.component.html',
  styleUrls: ['./claim-deal.component.css']
})
export class ClaimDealComponent {

  constructor(public dialogRef: MatDialogRef<ClaimDealComponent>,@Inject(MAT_DIALOG_DATA) public data: Deal, private dealService: DealService) {}
}
