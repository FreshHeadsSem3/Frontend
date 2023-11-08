import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Deal} from "../model/deal/deal";
import {Category} from "../model/deal/category"
import {Guid} from "guid-typescript";
import {Createmodel} from "../model/deal/createmodel";

@Injectable({
  providedIn: 'root'
})
export class DealService {

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }
  constructor(private http: HttpClient) {}

  getAllDeals() : Observable<Deal[]>{
    return this.http.get<Deal[]>('https://localhost:5001/deal', this.httpOptions)
  }

  getDealByID(dealID: Guid) : Observable<Deal>{
    return this.http.get<Deal>('https://localhost:5001/deal/'+dealID.toString(), this.httpOptions)
  }

  postDeal(createDeal: Createmodel) : Observable<Deal>{
    console.log(createDeal)
    return this.http.post<Deal>('https://localhost:5001/deal/', JSON.stringify(createDeal), this.httpOptions)
  }

  getAllCategories() : Observable<Category[]>{
    return this.http.get<Category[]>('https://localhost:5001/dealCategory', this.httpOptions)
  }


}
