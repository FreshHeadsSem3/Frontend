import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Guid} from "guid-typescript";
import {DealService} from "../../service/deal.service";
import {Deal} from "../../model/deal/deal";
import {ModalService} from "../../service/modal.service";
import {EmailModel} from "../../model/email-model";
import { ToastrService } from 'ngx-toastr';
import {Company} from "../../model/company/company";
import {CompanyService} from "../../service/company.service";

@Component({
  selector: 'app-info-deals',
  templateUrl: './info-deals.component.html',
  styleUrls: ['./info-deals.component.css']
})
export class InfoDealsComponent {
  public DealID!: Guid
  public deal!: Deal
  public company!: Company
  public UserEmail: string = ""
  public disableSendButton: boolean = false

  constructor(private dealService: DealService, private companyService: CompanyService, private router: ActivatedRoute, protected modalService: ModalService, private toastr: ToastrService, private _router: Router) {
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.DealID = JSON.parse(params['data']);
      this.dealService.getDealByID(this.DealID).subscribe(result => {
        if(result == null){
          this.toastr.error("Deal is niet gevonden")
          this._router.navigate([''])
        } else {
          this.deal = result;
          this.companyService.getCompanyByDealID(this.deal.id).subscribe(result => {
            if(result == null){
              this.toastr.error("Company is niet gevonden")
              this._router.navigate([''])
            } else {
              this.company = result;
            }
          })
        }
      })
    });
  }

  public SendEmail(){
    if(this.UserEmail.length > 1) {
      this.disableSendButton = true
      this.dealService.postMail(new EmailModel(this.DealID, this.UserEmail,this.GetMailMassage()))
        .subscribe(result => {
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

  public GetMailMassage() : string{
    return `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>EduDeals</title>
      <style type="text/css">
        body {
          margin: 0;
          background-color: #cccccc;
        }
        table {
          border-spacing: 0;
        }
        td {
          padding: 0;
        }
        img {
          border: 0;
        }
        .wrapper {
          width: 100%;
          table-layout: fixed;
          background-color: #cccccc;
          padding-bottom: 60px;
        }
        .main {
          background-color: #ffffff;
          margin: 0 auto;
          width: 100%;
          max-width: 600px;
          border-spacing: 0;
          font-family: sans-serif;
          color: #171a1b;
        }
        .two-columns {
          text-align: center;
          font-size: 0;
        }
        .two-columns .column {
          width: 100%;
          max-width: 300px;
          display: inline-block;
          vertical-align: top;
        }
        a {
          text-decoration: none;
          color: #EDEEFF;
          font-weight: bold;
        }
        .two-columns.last {
          padding: 15px 0;
        }
        .two-columns .padding {
          padding: 20px;
        }
        .two-columns .content {
          font-size: 15px;
          line-height: 20px;
          text-align: left;
        }
        .button {
          background-color: #ffffff;
          color: #171a1b;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 5px;
          font-weight: bold;
        }
        .button-dark {
          background-color: #171a1b;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 5px;
          font-weight: bold;
        }
      </style>
      </head>
      <body>

      <center class="wrapper">
        <table class="main" width="100%">
          <!-- TOP BORDER -->
          <tr>
            <td height="8" style="background-color: #020522;"></td>
          </tr>

          <!-- LOGO SECTION -->
          <tr>
            <td>
              <table width="100%">
                <tr>
                  <td class="two-columns" style="background-color: #020522;">
                    <table class="column" style="display: unset;">
                      <tr>
                        <td>
                          <a href="http://localhost:4200" style="font-size: 50px;">EduDeals</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BANNER IMAGE -->
          <tr>
            <td>
              <a href="#"><img src="" width="600" style="max-width: 100%;"></a>
            </td>
          </tr>

          <!-- TWO COLUMN SECTION -->
          <tr>
            <td style="background-color: #26292b;color: #ffffff;">
              <table width="100%">
                <tr>
                  <td class="two-columns last">
                    <table class="column">
                      <tr>
                        <td class="padding">
                          <table class="content">
                            <tr>
                              <td>
                                <a href="http://localhost:4200/deal?data=%22${this.deal.id.toString()}%22"><img src="${this.deal.images[0]}" alt="" width="260" style="max-width: 260px"></a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table class="column">
                      <tr>
                        <td class="padding">
                          <table class="content">
                            <tr>
                              <td>
                                <p style="font-weight: bold; font-size: 18px;">${this.deal.description.slice(0,150)}...</p>
                                <a href="http://localhost:4200/cancel?dealid=%22${this.DealID}%22&email=%22${this.UserEmail}%22" class="button">Afmelden</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- TITLE, TEXT & BUTTON -->
          <tr>
            <td style="padding: 15px 0 50px;">
              <table width="100%">
                <tr>
                  <td style="text-align: center; padding: 16px;">
                    <p style="font-size: 20px; font-weight: bold;">${this.company.title}</p>
                    <p style="line-height: 23px; font-size: 15px; padding: 5px 0 15px;">${this.company.description.slice(0,150)}...</p>
                    <a href="http://localhost:4200/company?data=%22${this.company.id}%22" class="button-dark">View company</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER SECTION -->
          <tr>
            <td style="background-color: #26292b">
              <table width="100%">
                <tr>
                  <td style="text-align: center; padding: 45px 20px; color: #ffffff;">
                    <a href="http://localhost:4200" style="font-size: 25px;">EduDeals</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </center>
      </body>
      </html>
      `;
  }
}
