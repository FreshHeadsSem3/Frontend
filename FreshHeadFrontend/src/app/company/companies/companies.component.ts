import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Guid} from "guid-typescript";
import {ToastrService} from "ngx-toastr";
import { Company } from 'src/app/model/company/company';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-deals',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {
  public AllCompanies: Company[] = [];
  public ErrorMassage: string = "";
  public CompanyTitle: string = "";

  constructor(private companyService: CompanyService, private router: Router, private toastr: ToastrService) {
    this.companyService.getAllCompanies()
      .subscribe(element => {
        if (element == null){
          this.toastr.error("Er zijn geen companies gevonden", "Error")
        } else {
          this.AllCompanies = element
        }
      })
  }

  navigateInfoCompany(companyID: Guid) {
    this.router.navigate(['company'], { queryParams: { data: JSON.stringify(companyID) } });
  }

  public MustDateBeShown(date: Date) : Boolean {
    return new Date(date) > new Date("2001-01-01");
  }

  public SearchByName(title: string){
    console.log(title)
    this.companyService.searchByName(title).subscribe(element => {
      if (element == null){
        this.toastr.error("Er zijn geen deals gevonden", "Error")
      } else if(element.length == 0) {
        this.toastr.error("Er zijn met deze naam geen bedrijven beschikbaar", "Error")
      } else {
        this.AllCompanies = element
      }
    })
  }
}
