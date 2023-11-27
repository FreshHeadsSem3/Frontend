import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../model/company/company";
import {Guid} from "guid-typescript";
import {Createmodel} from "../model/company/createmodel";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }
  constructor(private http: HttpClient) {}

  getCompanyByID(companyID: Guid) : Observable<Company>{
    return this.http.get<Company>('https://localhost:51800/company/'+companyID.toString(), this.httpOptions)
  }

  getCompanies() : Observable<Company[]>{
    return this.http.get<Company[]>('https://localhost:51800/company/', this.httpOptions)
  }

  postCompany(createCompany: Createmodel) : Observable<Company>{
    console.log(createCompany)
    return this.http.post<Company>('https://localhost:51800/company/', JSON.stringify(createCompany), this.httpOptions)
  }

  getCompanyByDealID(dealID: Guid) : Observable<Company>{
    return this.http.get<Company>('https://localhost:51800/company/deal/'+dealID.toString(), this.httpOptions)
  }
}
