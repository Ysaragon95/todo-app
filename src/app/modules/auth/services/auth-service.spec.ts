import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ResponseBase } from '@models/common/response-base-model';
import { LoginResponse } from '@models/security/login-model';
import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const cookieSpy = jasmine.createSpyObj('CookieService', ['set', 'delete']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: CookieService, useValue: cookieSpy },
        { provide: Router, useValue: routerSpyObj }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send credentials and store token and userName', () => {
    const mockResponse: ResponseBase<LoginResponse> = {
      success: true,
      statusCode: 200,
      message: 'Login successful',
      data: {
        token: 'mock-token',
        userName: 'TestUser',
        idUser: 1,
        expiration: '2025-06-30'
      }
    };

    service.sendCredentials('test@example.com', 'password123').subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('userName')).toBe('TestUser');
      expect(cookieServiceSpy.set).toHaveBeenCalledWith('token', 'mock-token', { expires: 4, path: '/' });
    });

    const req = httpMock.expectOne(`${service['URL']}/Security/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com', password: 'password123' });
    req.flush(mockResponse);
  });

  it('should clear session and navigate to login on logout', () => {
    localStorage.setItem('userName', 'TestUser');

    service.logout();

    expect(cookieServiceSpy.delete).toHaveBeenCalledWith('token', '/');
    expect(localStorage.getItem('userName')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});
