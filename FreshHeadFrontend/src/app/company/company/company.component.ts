import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Guid} from "guid-typescript";
import {CompanyService} from "../../service/company.service";
import {Company} from "../../model/company/company";
import { DealService } from 'src/app/service/deal.service';
import { Deal } from 'src/app/model/deal/deal';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  public CompanyID!: Guid
  public Company!: Company
  public AllDeals: Deal[] = [];
  public TopThreeDeals: Deal[] = [];
  public ErrorMassage: string = "";

  constructor(private CompanyService: CompanyService, private DealService: DealService, private router: Router, private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params => {
      this.CompanyID = JSON.parse(params['data']);
      this.CompanyService.getCompanyByID(this.CompanyID).subscribe(result => {
          this.Company = result;
      })
    });
    this.DealService.getDealByCompanyID(this.CompanyID)
    .subscribe(element => {
        this.AllDeals = element
        this.AllDeals = this.AllDeals.slice(0, 3);
        console.log('Name:', Company.name);
     });
  }

  navigateInfoDeal(dealID: Guid) {
    this.router.navigate(['deal'], { queryParams: { data: JSON.stringify(dealID) } });
  }

  public MustDateBeShown(date: Date) : Boolean {
    return new Date(date) > new Date("2001-01-01");
  }
}
