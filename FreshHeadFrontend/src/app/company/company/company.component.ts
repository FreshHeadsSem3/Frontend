import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Guid} from "guid-typescript";
import {CompanyService} from "../../service/company.service";
import {Company} from "../../model/company/company";


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  public CompanyID!: Guid
  public Company!: Company

  constructor(private CompanyService: CompanyService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.CompanyID = JSON.parse(params['data']);
      this.CompanyService.getCompanyByID(this.CompanyID).subscribe(result => {
        if(result == null){
          //return to component (App.component.ts)
        } else {
          this.Company = result;
        }
      })
    });
  }

}
