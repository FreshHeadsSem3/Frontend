import { Component  } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {CompanyService} from "../../service/company.service";
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {Createmodel} from "../../model/company/createmodel";


@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})

export class CreateCompanyComponent {
  title: string = '';
  description: string = '';
  kvk: number = NaN;
  image: string = '';

  constructor(private companyService: CompanyService, private router: Router) {

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
    console.log('Kvk:', this.kvk);
    console.log('Foto:', this.image);

    if (!this.isValid()) {
      console.log('Validatie is mislukt. Het formulier wordt niet ingediend.');
    }
    let company: Createmodel = new Createmodel(this.title, this.description, this.kvk, [this.image])
    this.companyService.postCompany(company).subscribe(result =>{
      if(result == null){
        console.log("company is empty")
      } else {
        this.router.navigate(['company'], { queryParams: { data: JSON.stringify(result.id) }});
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