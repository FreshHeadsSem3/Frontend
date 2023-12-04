import { Component  } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {CompanyService} from "../../service/company.service";
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {Createmodel} from "../../model/company/createmodel";
import { DealsComponent } from 'src/app/deal/deals/deals.component';
import {ToastrService} from "ngx-toastr";


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
  email: string = '';
  password: string = '';
  link1: string = '';
  link2: string = '';
  link3: string = '';
  link4: string = '';

  submitted = false;

  constructor(private companyService: CompanyService, private router: Router, private toastr : ToastrService) {

  }

  convertToDate(ngbDate: NgbDate | null): Date | null {
    if (ngbDate === null) {
      return null;
    }
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  onSubmit() {
    this.submitted = true;
    if (!this.isValid()) {
      this.toastr.info("Niet alle velden zijn correct ingevuld");
    } else {
      let company: Createmodel = new Createmodel(this.title, this.description, this.kvk, [this.image], this.email, this.password, this.link1, this.link2, this.link3, this.link4)
      this.companyService.postCompany(company).subscribe(result =>{
        if(result == null){
          console.log("company is empty")
        } else {
          this.toastr.success("Het bedrijf is aangemaakt")
          this.router.navigate(['company'], { queryParams: { data: JSON.stringify(result.id) }});
        }
      })
    }
  }

  isValid(): boolean {
    if(this.title.length >= 4 && this.kvk.toString().length == 8 && this.image.length >= 1 && this.email.length >= 6 && this.password.length >= 8){
      return true;
    }
    return false
  }

  cancel() {
    console.log('Formulier geannuleerd');
    this.router.navigate([''])
  }

}
