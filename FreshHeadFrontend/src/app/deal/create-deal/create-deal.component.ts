import { Component  } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.css']
})

export class CreateDealComponent {
  selectedDate: NgbDate | null = null;

  convertToDate(ngbDate: NgbDate | null): Date | null {
    if (ngbDate === null) {
      return null;
    }
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }
}
