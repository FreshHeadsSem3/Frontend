import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isTokenExpired()) {
      return this.authService.refreshToken().pipe(
        switchMap((tokenResponse) => {
          if (tokenResponse) {
            this.authService.setToken(tokenResponse.token);
            request = this.addTokenToRequest(request, tokenResponse.token);
            return next.handle(request);
          }
          // Handle the case where token refresh failed, e.g., logout the user
          // or redirect to the login page.
          return throwError('Token refresh failed.');
        }),
        catchError((error) => {
          // Handle token refresh error, e.g., logout or redirect to the login page.
          return throwError(error);
        })
      );
    }

    // If the token is not expired, add it to the request headers.
    const token = this.authService.getToken();
    request = this.addTokenToRequest(request, token);
    return next.handle(request);
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

}
