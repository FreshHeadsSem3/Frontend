import { Component  } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {DealService} from "../../service/deal.service";
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {Createmodel} from "../../model/deal/createmodel";
import {ToastrService} from "ngx-toastr";


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

  constructor(private dealService: DealService, private router: Router, private Toastr: ToastrService) {

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
      this.Toastr.error("Er is een fout met een van de velden", "Error")
    }
    let deal: Createmodel = new Createmodel("7661fdca-8c92-4c8d-a70c-717d34b3d162", this.title, this.description, [this.image])
    this.dealService.postDeal(deal).subscribe(result =>{
      if(result == null){
        this.Toastr.error("Deal is verzonden maar niet opgeslagen", "Error")
      } else {
        this.Toastr.success("Deal is succesvol opgeslagen", "Succes!")
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
