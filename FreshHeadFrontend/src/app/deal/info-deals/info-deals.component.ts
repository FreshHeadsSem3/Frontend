import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Guid} from "guid-typescript";
import {DealService} from "../../service/deal.service";
import {Deal} from "../../model/deal/deal";
import {ModalService} from "../../service/modal.service";
import {EmailModel} from "../../model/email-model";


@Component({
  selector: 'app-info-deals',
  templateUrl: './info-deals.component.html',
  styleUrls: ['./info-deals.component.css']
})
export class InfoDealsComponent {
  public DealID!: Guid
  public deal!: Deal
  public modalErrorMSG : string = ""
  public UserEmail: string = ""
  public disableSendButton: boolean = false

  constructor(private dealService: DealService, private router: ActivatedRoute, protected modalService: ModalService) {
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

  public SendEmail(){
    if(this.UserEmail.length > 1) {
      this.disableSendButton = true
      this.dealService.postMail(new EmailModel(this.DealID, this.UserEmail, "Dit is een test")).subscribe(
        result => {
          if (result == null || result == false) {
            this.modalErrorMSG = "Mail is niet verzonden"
            this.disableSendButton = false
          } else {
            this.modalErrorMSG = ""
            this.modalService.close()
            this.disableSendButton = false
          }
        }
      )
    }
  }
}
