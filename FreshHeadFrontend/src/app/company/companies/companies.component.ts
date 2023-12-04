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
}
