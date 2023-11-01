import { Injectable } from '@angular/core';
import { TokenResponse } from '../model/token-response';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private tokenKey = 'jwtToken';
  private apiUrl = 'https://localhost:51800/login';

  login(username: string, password: string): Observable<TokenResponse> {
    // Implement your login logic and receive the token from the server

    const credentials = { username, password };
    return this.http.post<TokenResponse>(`${this.apiUrl}`, credentials).pipe(
      tap((tokenResponse) => {
        if (tokenResponse) {
          this.setToken(tokenResponse.token);
        }
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

