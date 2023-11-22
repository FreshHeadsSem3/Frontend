import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Guid} from "guid-typescript";
import {DealService} from "../../service/deal.service";
import {Deal} from "../../model/deal/deal";
import {ModalService} from "../../service/modal.service";
import {EmailModel} from "../../model/email-model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-info-deals',
  templateUrl: './info-deals.component.html',
  styleUrls: ['./info-deals.component.css']
})
export class InfoDealsComponent {
  public DealID!: Guid
  public deal!: Deal
  public UserEmail: string = ""
  public disableSendButton: boolean = false

  constructor(private dealService: DealService, private router: ActivatedRoute, protected modalService: ModalService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.DealID = JSON.parse(params['data']);
      this.dealService.getDealByID(this.DealID).subscribe(result => {
        if(result == null){
          //return to component (App.component.ts)
        } else {
          this.deal = result;
          console.log(this.deal)
        }
      })
    });
  }

  public SendEmail(){
    if(this.UserEmail.length > 1) {
      this.disableSendButton = true
      this.dealService.postMail(new EmailModel(this.DealID, this.UserEmail,
        "Bedankt voor het claimen van de deal "+"http://localhost:4200/cancel?dealid=%22"+this.DealID+"%22&email=%22"+this.UserEmail+"%22"
      )).subscribe(
        result => {
          if (result == null || result == false) {
            this.toastr.error("Mail is niet verzonden", "Error")
            this.disableSendButton = false
          } else {
            this.toastr.success("Mail is succesvol verzonden", "Voltooid")
            this.modalService.close()
            this.disableSendButton = false
          }
        }
      )
    }
  }

  public MustDateBeShown(date: Date) : Boolean {
    return new Date(date) > new Date("2001-01-01");
  }

  public HasDatePassed(date : Date) : Boolean {
    return new Date(date) > new Date()
  }
}
