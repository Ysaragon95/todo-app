import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '@models/security/login-model';
import { ResponseBase } from '@models/common/response-base-model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment.apiUrlBase;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  sendCredentials(
    email: string,
    password: string
  ): Observable<ResponseBase<LoginResponse>> {
    return this.http
      .post<ResponseBase<LoginResponse>>(`${this.URL}/Security/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response && response.data) {
            localStorage.setItem('userName', response.data.userName);
            this.cookieService.set('token', response.data.token, { expires: 4, path: '/' });
          }
        })
      );
  }

  logout(): void {
    this.cookieService.delete('token', '/');
    localStorage.removeItem('userName');
    this.router.navigate(['/auth/login']);
  }
}
