import { Component, OnInit  } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {DealService} from "../../service/deal.service";
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {Createmodel} from "../../model/deal/createmodel";
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {Category} from "../../model/deal/category";
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.css'],
})

export class CreateDealComponent implements OnInit{
  public selectedCategories: Category[] = [];
  categoryDropdownSettings = {};
  selectedItems = [];

  selectedDate: NgbDate | null = null;
  title: string = '';
  description: string = '';
  image: string = '';


  constructor(private dealService: DealService, private router: Router) {
    this.selectedCategories = [];

    this.dealService.getAllCategories().subscribe(element => {
      if (element == null){
        console.error('Error getting categories:');
      } else {
        this.selectedCategories = element
        console.log("hallo444444444", this.selectedCategories)
      }
    });
  }

  ngOnInit() {
    this.dealService.getAllCategories().subscribe((categories) => {
      this.selectedCategories = categories.map((category) => ({
        id: category.id,
        name: category.name,
      }));
      this.selectedItems = [];
      this.categoryDropdownSettings = { 
        singleSelection: false, 
        idField: 'id',
        textField: 'name',
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        allowSearchFilter: true,
        itemsShowLimit: 3
      };       
    });

  }

  onItemSelect(item:any){
    console.log(item);
}
onSelectAll(items: any){
    console.log(items);
}


  convertToDate(ngbDate: NgbDate | null): Date | null {
    if (ngbDate === null) {
      return null;
    }
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  };
  

  onSubmit() {

    console.log('Formulier ingediend');
    console.log('Titel:', this.title);
    console.log('Beschrijving:', this.description);
    console.log('Foto:', this.image);
    console.log('Geselecteerde categorieën:', this.selectedItems);
    console.log('Geselecteerde datum:', this.selectedDate);

  
    if (!this.isValid()) {
      console.log('Validatie is mislukt. Het formulier wordt niet ingediend.');
    }
    let deal: Createmodel = new Createmodel("47b2cd37-05d8-49d7-a830-442366ce76cf", this.title, this.description, [this.image])
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
