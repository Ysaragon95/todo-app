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

  sendCredentials(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.URL}/Security/login`, {
      email,
      password,
    });
  }
}
