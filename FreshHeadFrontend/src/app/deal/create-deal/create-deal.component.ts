import { Component  } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';


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
      return;
    }

  }

  isValid(): boolean {

    return true; 
  }

  cancel() {

    console.log('Formulier geannuleerd');
  }

}
