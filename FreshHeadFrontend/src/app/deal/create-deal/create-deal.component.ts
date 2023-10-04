import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerNavigateEvent, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.css']
})
export class CreateDealComponent {
  model: NgbDateStruct;
	date: NgbDateStruct;
  @ViewChild('someViewChildReference') someViewChildVariable!: ElementRef;
  @ViewChild('dp') dp!: NgbDatepicker;

	constructor(private calendar: NgbCalendar) {
    this.model = this.calendar.getToday();
    this.date = {year: this.model.year, month: this.model.month, day: this.model.day}
  }

	selectToday() {
		this.model = this.calendar.getToday();
  }


  onDateNavigate(event: NgbDatepickerNavigateEvent) {
    //this.date = event.next;
  }
}
