import { Component } from '@angular/core';
import { Deal } from "../../model/deal/deal";
import { DealService } from "../../service/deal.service";
import { Router } from '@angular/router';
import { Guid } from "guid-typescript";
import { ToastrService } from "ngx-toastr";
import { Category } from "../../model/deal/category";

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent {
  public AllDeals: Deal[] = [];
  public ErrorMassage: string = "";
  public Categories: Category[] = [];
  public SelectedCategory: string = "";
  public SelectedCategoryID!: Guid;
  public DealTitle: string = "";
  public SearchTitle: string = "";

  constructor(private dealService: DealService, private router: Router, private toastr: ToastrService) {
    this.dealService.getAllDeals()
      .subscribe(element => {
        if (element == null) {
          this.toastr.error("Er zijn geen deals gevonden", "Error")
        } else {
          this.AllDeals = element
        }
      })
    this.dealService.getAllCategories().subscribe(element => {
      if (element == null) {
        console.error('Error getting categories:');
      } else {
        this.Categories = element
      }
    });
  }

  navigateInfoDeal(dealID: Guid) {
    this.router.navigate(['deal'], { queryParams: { data: JSON.stringify(dealID) } });
  }

  public MustDateBeShown(date: Date): Boolean {
    return new Date(date) > new Date("2001-01-01");
  }

  public HasDatePassed(date: Date): Boolean {
    return new Date(date) > new Date()
  }

  public SearchByName(title: string) {
    if (title == '') {
      this.dealService.getAllDeals()
        .subscribe(element => {
          if (element == null) {
            this.toastr.error("Er zijn geen deals gevonden")
          } else if (element.length == 0) {
            this.toastr.error("Er zijn geen deals beschikbaar met deze categorie")
          } else {
            this.AllDeals = element
          }
        })
        this.SearchTitle = '';
    } else {
      console.log(title)
      this.SearchTitle = title;
      this.dealService.searchByName(title).subscribe(element => {
        if (element == null) {
          this.SearchTitle = ''
          this.toastr.error("Er zijn geen deals gevonden")
        } else if (element.length == 0) {
          this.SearchTitle = ''
          this.toastr.info("Er zijn geen deals met deze naam beschikbaar")
        } else {
          this.AllDeals = element
        }
        this.dealService.searchByCompanyName(title).subscribe(result => {
          if (result == null) {
          } else if (result.length == 0) {
            this.toastr.info("Er zijn geen deals van bedrijven met deze naam beschikbaar")
          } else {
            result.forEach(x => {
              var contains = false;
              this.AllDeals.forEach(y => {
                if (y.id == x.id) {
                  contains = true;
                }
              })
              if (contains == false) {
                this.AllDeals.push(x)
              }
            })
          }
        })
      })
    }
    this.DealTitle = ""
  }

  public FilterByCategory() {
    if (this.SelectedCategoryID == null) {
      this.dealService.getAllDeals()
        .subscribe(element => {
          if (element == null) {
            this.toastr.error("Er zijn geen deals gevonden")
          } else if (element.length == 0) {
            this.toastr.error("Er zijn geen deals beschikbaar met deze categorie")
          } else {
            this.AllDeals = element
          }
        })
    } else {
      this.dealService.getAllDealsByCategory(this.SelectedCategoryID).subscribe(element => {
        if (element == null) {
          this.toastr.error("Er zijn geen deals gevonden")
        } else if (element.length == 0) {
          this.toastr.error("Er zijn geen deals beschikbaar met deze categorie")
        } else {
          this.AllDeals = element
        }
      });
    }
  }
}
