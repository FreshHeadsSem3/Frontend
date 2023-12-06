import { Injectable } from '@angular/core';
import { TokenResponse } from '../model/token-response';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Loginmodel } from '../model/company/loginmodel';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private readonly jwtTokenKey = 'jwtToken';
  private apiUrl = 'https://localhost:51800/login/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'text' as 'json',
  };

  constructor(private http: HttpClient) { }

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
        catchError((error) => {
          console.error('HTTP request error:', error);
          return throwError('An error occurred during the login process.');
        }));
  }

  getToken(): string | null {
    // Retrieve the token from local storage
    return localStorage.getItem(this.jwtTokenKey);
  }

  setToken(companyResponse: string): void {
    // Manually set the token in local storage
    localStorage.setItem(this.jwtTokenKey, companyResponse);
  }

}

