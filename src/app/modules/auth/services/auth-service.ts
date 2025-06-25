import { ResponseBase } from './../../../core/models/common/response-base-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from '@models/security/login-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment.apiUrlBase;

  constructor(private http: HttpClient) {}

  sendCredentials(
    email: string,
    password: string
  ): Observable<ResponseBase<LoginResponse>> {
    return this.http.post<ResponseBase<LoginResponse>>(
      `${this.URL}/Security/login`,
      {
        email,
        password,
      }
    );
  }
}
