import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const GuestGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('token');

  if (token) {
    router.navigate(['/dashboard']); // Redirige al dashboard si ya tiene token
    return false;
  }

  return true; // Permite el acceso si NO hay token
};
