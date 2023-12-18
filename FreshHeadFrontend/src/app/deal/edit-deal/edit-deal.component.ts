import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {Deal} from "../../model/deal/deal";
import {DealService} from "../../service/deal.service";
import {ToastrService} from "ngx-toastr";
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-edit-deal',
  templateUrl: './edit-deal.component.html',
  styleUrls: ['./edit-deal.component.css']
})
export class EditDealComponent {

  public DealID! : Guid;
  public deal! : Deal;


  constructor(private router: ActivatedRoute, private dealService: DealService, private adapter: DateAdapter<any>, private toastr: ToastrService, private _router: Router) {
    this.adapter.setLocale('nl')
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.DealID = JSON.parse(params['data']);
      this.dealService.getDealByID(this.DealID).subscribe(result => {
        if(result == null){
          this.toastr.error("Deal is niet gevonden")
          this._router.navigate(['manage-deals'])
        } else {
          this.deal = result;
        }
      })
    });
  }

  public MustDateBeShown(date: Date) : Boolean {
    return new Date(date) > new Date("2001-01-01");
  }

  public HasDatePassed(date : Date) : Boolean {
    return new Date(date) > new Date()
  }

  public Cancel(){
    this._router.navigate(['manage-deals'])
  }

  public Opslaan(){
    this.dealService.updateDeal(this.deal)
  }
}
