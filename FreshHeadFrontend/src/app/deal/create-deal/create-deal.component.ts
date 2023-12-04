import { Component, OnInit  } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {DealService} from "../../service/deal.service";
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {Createmodel} from "../../model/deal/createmodel";
import {ToastrService} from "ngx-toastr";
import { Company } from 'src/app/model/company/company';
import { CompanyService } from 'src/app/service/company.service';
import {Category} from "../../model/deal/category";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule, MatDatepickerIntl} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

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

  constructor(private dealService: DealService, private router: Router, private companyService: CompanyService, private adapter: DateAdapter<any>, private toastr: ToastrService) {

    this.adapter.setLocale('nl')

    companyService.getCompanies()
      .subscribe(result => {
        if (result == null){
          this.toastr.error("Er zijn geen bedrijven gevonden", "Error")
        } else {
          this.companies = result;
        }
      })

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
      this.toastr.error("Er is een fout met een van de velden", "Error")
    } else {
      let today = new Date()
      if (this.selectedDate.getFullYear() == today.getFullYear() && this.selectedDate.getMonth() == today.getMonth() && this.selectedDate.getDay() == today.getDay()){
        this.selectedDate = new Date(1999,1,1)
      }
      let deal: Createmodel = new Createmodel(this.companyID, this.title, this.description, this.location, [this.image], this.MaxParticipants, this.selectedDate, this.selectedCategorie)
      console.log(deal)
      this.dealService.postDeal(deal).subscribe(result =>{
        if(result == null){
          this.toastr.error("Deal is verzonden maar niet opgeslagen", "Error")
        } else {
          this.toastr.success("Deal is succesvol opgeslagen", "Succes!")
          this.router.navigate(['deal'], { queryParams: { data: JSON.stringify(result.id) }});
        }
      })
    }
  }


  isValid(): boolean {
    return true;
  }

  cancel() {
    this.toastr.info("Deal aanmaken geannulleerd", "Info")
    this.router.navigate([''])
  }

}
