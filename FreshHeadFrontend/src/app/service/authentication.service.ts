import { Injectable } from '@angular/core';
import { TokenResponse } from '../model/token-response';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs';
import { Loginmodel } from '../model/company/loginmodel';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private tokenKey = 'jwtToken';
  private apiUrl = 'https://localhost:51800/login';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'text' as 'json',
  };

  login(loginData: Loginmodel) {
    console.log(loginData)
    return this.http.post<any>(`${this.apiUrl}`, loginData, this.httpOptions)
      .pipe(map((companyResponse) => {
        console.log('token response:', companyResponse);
        // login successful if there's a jwt token in the response
        if (typeof companyResponse === 'string') {
          this.setToken(companyResponse);
          console.log('Token stored in local storage:', companyResponse);
        } else {
          // Handle other types of responses if needed
          console.error('Unexpected response type:', typeof companyResponse);
        }

        return companyResponse;

      }),
        );
  }

  getToken(): any {

    return localStorage.getItem(this.tokenKey);

  }

  setToken(companyResponse: string): void {
    // Manually set the token in local storage
    localStorage.setItem(this.tokenKey, companyResponse);
  }

  deleteToken() {
    localStorage.removeItem(this.tokenKey)
  }
}

