import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Deal} from "../model/deal/deal";
import {Category} from "../model/deal/category"
import {Guid} from "guid-typescript";
import {Createmodel} from "../model/deal/createmodel";
import {EmailModel} from "../model/email-model";
import {Company} from '../model/company/company';
import {RemoveParticipant} from "../model/remove-participant";

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private apiURL = 'https://localhost:51800/deal';
  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }
  constructor(private http: HttpClient) {}

  getAllDeals() : Observable<Deal[]>{
    return this.http.get<Deal[]>(this.apiURL, this.httpOptions)
  }

  getAllDealsByCatagory(catagory: string) : Observable<Deal[]>{
    return this.http.get<Deal[]>(this.apiURL+"/deals/category/"+catagory, this.httpOptions)
  }

  getDealByID(dealID: Guid) : Observable<Deal>{
    return this.http.get<Deal>(this.apiURL+"/"+dealID.toString(), this.httpOptions)
  }

  getDealByCompanyID(companyID: Guid) : Observable<Deal[]>{
    return this.http.get<Deal[]>(this.apiURL+"/company/"+companyID.toString(), this.httpOptions)
  }

  postDeal(createDeal: Createmodel) : Observable<Deal>{
    console.log(createDeal)
    return this.http.post<Deal>(this.apiURL, JSON.stringify(createDeal), this.httpOptions)
  }

  postMail(emailModel: EmailModel) : Observable<boolean>{
    return this.http.post<boolean>(this.apiURL+"/ClaimDeal", JSON.stringify(emailModel), this.httpOptions)
  }

  RemoveParticipant(removeModel : RemoveParticipant) : Observable<boolean> {
    return this.http.post<boolean>(this.apiURL+"/CancelDeal", JSON.stringify(removeModel), this.httpOptions)
  }

  getAllCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(this.apiURL+'Category', this.httpOptions)
  }
}
