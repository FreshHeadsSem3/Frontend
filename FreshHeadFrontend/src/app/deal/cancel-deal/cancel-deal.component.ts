import { Component } from '@angular/core';
import {DealService} from "../../service/deal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {ToastrService} from "ngx-toastr";
import {RemoveParticipant} from "../../model/remove-participant";
import {Deal} from "../../model/deal/deal";

@Component({
  selector: 'app-cancel-deal',
  templateUrl: './cancel-deal.component.html',
  styleUrls: ['./cancel-deal.component.css']
})
export class CancelDealComponent {

  public DealID!: Guid
  public Email!: string
  public Deal!: Deal

  //http://localhost:4200/cancel?dealid=%2252e3a3ab-f1dc-48d7-833a-b2d7038783dd%22&email=%22user@example.com%22
  constructor(private dealService: DealService, private router: ActivatedRoute, private toastr: ToastrService, private _router : Router) {
    this.router.queryParams.subscribe(params => {
      this.DealID = JSON.parse(params['dealid']);
      this.Email = JSON.parse(params['email'])
    });

    if(this.DealID != null){
      this.dealService.getDealByID(this.DealID).subscribe(
        result => {
          if (result == null){
            this.toastr.error("Deal is niet gevonden")
          } else {
            this.Deal = result
          }
          if(this.Deal == null){
            this._router.navigate([''])
          }
        }
      )
    }
  }

  public RemoveParticipation(){
    this.dealService.RemoveParticipant(new RemoveParticipant(this.DealID, this.Email)).subscribe(result => {
      if(result == null){
        this.toastr.error("Geen verbinding met server")
        this._router.navigate([""])
      } else if(result == false) {
        this.toastr.info("Je deelname is niet gevonden")
      } else {
        this.toastr.success("Succesvol afgemeld")
      }
    })
  }
}
