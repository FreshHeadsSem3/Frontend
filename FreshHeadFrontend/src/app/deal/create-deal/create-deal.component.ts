import { Component, OnInit  } from '@angular/core';
import {DealService} from "../../service/deal.service";
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {Createmodel} from "../../model/deal/createmodel";
import {ToastrService} from "ngx-toastr";
import { Company } from 'src/app/model/company/company';
import {Category} from "../../model/deal/category";
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.css'],
})

export class CreateDealComponent{
  public categories: Category[] = [];
  public selectedCategorie!: Guid;
  categoryDropdownSettings = {};
  selectedItems = [];
  public location: string = ""
  public MaxParticipants: number = 0

  selectedDate: Date = new Date();
  title: string = '';
  description: string = '';
  image: string = '';
  companies!: Company[];
  companyID!: Guid;

  constructor(private dealService: DealService, private router: Router, private adapter: DateAdapter<any>, private toastr: ToastrService) {

    this.adapter.setLocale('nl')

    this.dealService.getAllCategories().subscribe(element => {
      if (element == null){
        console.error('Error getting categories:');
      } else {
        this.categories = element
      }
    });
  }

  onItemSelect(item:any){
    console.log(item);
  }
  onSelectAll(items: any){
      console.log(items);
  }

  onSubmit() {
    if (!this.isValid()) {
      this.toastr.error("Een van de velden is niet correct ingevuld")
    } else {
      let today = new Date()
      if (this.selectedDate.getFullYear() == today.getFullYear() && this.selectedDate.getMonth() == today.getMonth() && this.selectedDate.getDay() == today.getDay()){
        this.selectedDate = new Date(1999,1,1)
      }
      let deal: Createmodel = new Createmodel(this.title, this.description, this.location, [this.image], this.MaxParticipants, this.selectedDate, this.selectedCategorie)
      console.log(deal)
      this.dealService.postDeal(deal).subscribe(result =>{
        if(result == null){
          this.toastr.error("De deal kon niet worden opgeslagen.")
        } else {
          this.toastr.success("De deal is succesvol opgeslagen", "Succes!")
          this.router.navigate(['deal'], { queryParams: { data: JSON.stringify(result.id) }});
        }
      })
    }
  }

  public HasDatePassed(date : Date) : Boolean {
    return new Date(date) > new Date()
  }

  isValid(): boolean {
    return true;
  }

  cancel() {
    this.toastr.info("Deal aanmaken geannuleerd", "Info")
    this.router.navigate([''])
  }

}
