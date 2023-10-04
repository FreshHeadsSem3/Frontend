import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Deal} from "../model/deal/deal";
import {Guid} from "guid-typescript";

@Injectable({
  providedIn: 'root'
})
export class DealService {

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }
  constructor(private http: HttpClient) {}

  getAllDeals() : Observable<Deal[]>{
    return this.http.get<Deal[]>('https://localhost:51800/deal', this.httpOptions)
  }

  getDealByID(dealID: Guid) : Observable<Deal>{
    return this.http.get<Deal>('https://localhost:51800/deal/'+dealID.toString(), this.httpOptions)
  }
}
