import { Injectable } from '@angular/core';
import { TokenResponse } from '../model/token-response';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Loginmodel } from '../model/company/loginmodel';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly tokenKey = 'jwtToken';
  private apiUrl = 'https://localhost:51800/login';

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }
  
  constructor(private http: HttpClient) { }

  

  login(UserEmail: string, UserPassword: string): Observable<TokenResponse> {
    console.log(UserEmail, UserPassword)
    const credentials = { UserEmail, UserPassword };
    console.log('Before HTTP Request');
    // Implement your login logic and receive the token from the server
    return this.http.post<TokenResponse>(this.apiUrl, credentials, this.httpOptions).pipe(
      tap((tokenResponse) => {
        console.log(tokenResponse);
        if (tokenResponse) {
          this.setToken(tokenResponse.token);
        }
      }),
      catchError((error) => {
        console.error('Backend error:', error);
        // Forward the error to the calling code
        return throwError(error);
      })
    );
  }

  getToken(): any {
   
    return localStorage.getItem(this.tokenKey);

  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true; // Token is not present
    }
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(tokenData.exp * 1000);
    return expirationDate <= new Date();

  }

  refreshToken(): Observable<TokenResponse> {
    const token = this.getToken();

    return this.http.post<TokenResponse>(`${this.apiUrl}/refresh`, { token }).pipe(
      tap((tokenResponse) => {
        if (tokenResponse) {
          this.setToken(tokenResponse.token);
        }
      }));


    // Implement token refresh logic and make a request to the backend
  }
}

