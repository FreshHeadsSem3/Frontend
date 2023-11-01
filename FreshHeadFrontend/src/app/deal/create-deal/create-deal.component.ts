import { Component  } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {DealService} from "../../service/deal.service";
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {Createmodel} from "../../model/deal/createmodel";
import { Company } from 'src/app/model/company/company';
import { CompanyService } from 'src/app/service/company.service';


@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.css']
})

export class CreateDealComponent {
  selectedDate: NgbDate | null = null;
  title: string = '';
  description: string = '';
  image: string = '';
  companies!: Company[];
  companyID!: Guid;

  constructor(private dealService: DealService, private router: Router, private companyService: CompanyService) {
    companyService.getCompanies()
      .subscribe(result => {
        if (result == null){
          //toastr errormessage
        } else {
          this.companies = result;
        }
      })
  }

  convertToDate(ngbDate: NgbDate | null): Date | null {
    if (ngbDate === null) {
      return null;
    }
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  onSubmit() {

    console.log('Formulier ingediend');
    console.log('Titel:', this.title);
    console.log('Beschrijving:', this.description);
    console.log('Foto:', this.image);

    if (!this.isValid()) {
      console.log('Validatie is mislukt. Het formulier wordt niet ingediend.');
    }
    let deal: Createmodel = new Createmodel(this.companyID, this.title, this.description, [this.image])
    this.dealService.postDeal(deal).subscribe(result =>{
      if(result == null){
        console.log("deal is empty")
      } else {
        this.router.navigate(['deal'], { queryParams: { data: JSON.stringify(result.id) }});
      }
    })
  }

  isValid(): boolean {

    return true;
  }

  cancel() {

    console.log('Formulier geannuleerd');
  }

}
