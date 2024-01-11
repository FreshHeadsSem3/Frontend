import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {DealService} from "../../service/deal.service";
import {ToastrService} from "ngx-toastr";
import {DateAdapter} from '@angular/material/core';
import {Deal} from "../../model/deal/deal";
import {Category} from "../../model/deal/category";
import {ModalService} from "../../service/modal.service";

@Component({
  selector: 'app-edit-deal',
  templateUrl: './edit-deal.component.html',
  styleUrls: ['./edit-deal.component.css']
})
export class EditDealComponent {

  public DealID! : Guid;
  public deal! : Deal;
  public categories: Category[] = [];
  public selectedCategorie!: Guid;
  public participantMails: string[] = [];

  constructor(private router: ActivatedRoute, private dealService: DealService, private adapter: DateAdapter<any>, private toastr: ToastrService, private _router: Router, protected modalService: ModalService) {
    this.adapter.setLocale('nl')
  }

  ngOnInit() {
    this.adapter.setLocale('nl')
    this.router.queryParams.subscribe(params => {
      this.DealID = JSON.parse(params['data']);
      this.dealService.getDealByID(this.DealID).subscribe(result => {
        console.log(result)
        if(result == null){
          this.toastr.error("Deal is niet gevonden")
          this._router.navigate(['manage-deals'])
        } else {
          this.deal = result
          if(!this.deal.activeTill || this.deal.activeTill < new Date(2000,12,1)){
            this.deal.activeTill = new Date(1,1,1)
          }
          if(!this.deal.eventDate || this.deal.eventDate < new Date(2000,12,1)){
            this.deal.eventDate = new Date(1,1,1)
          }
        }
        this.dealService.getParticipantEmailsByDeal(this.DealID).subscribe(emails => {
          this.participantMails = emails
        })
      })
    });
    this.dealService.getAllCategories().subscribe(element => {
      if (element == null){
        console.error('Error getting categories:');
      } else {
        this.categories = element
      }
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
    if(!this.deal.activeTill || this.deal.activeTill < new Date(2000,12,1)){
      this.deal.activeTill = new Date(1999,1,1)
    } else {
      this.deal.activeTill = new Date(this.deal.activeTill)
    }
    if(!this.deal.eventDate || this.deal.eventDate < new Date(2000,12,1)){
      this.deal.eventDate = new Date(1999,1,1)
    } else {
      this.deal.eventDate = new Date(this.deal.eventDate)
    }

    this.deal.activeTill.setHours(12)
    this.deal.eventDate.setHours(12)
    if(this.deal.maxParticipants < 0){
      this.deal.maxParticipants = 0
    }

    this.dealService.updateDeal(this.deal).subscribe(result => {
      if(result.id){
        this.toastr.success("Deal is geupdate")
        this._router.navigate(['manage-deals'])
      } else {
        this.toastr.error("Deal is niet geupdate")
      }
    })
  }
}
