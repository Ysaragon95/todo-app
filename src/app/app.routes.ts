import { Routes } from '@angular/router';
import { SessionGuard } from './core/guards/session.guard';
import { GuestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    canActivate: [GuestGuard], // 👈 lo aplicas aquí
    loadComponent: () =>
      import('./modules/auth/pages/login-page/login-page').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'dashboard',
    canActivate: [SessionGuard], // 👈 Aplica el guard aquí
    loadComponent: () =>
      import('./modules/dashboard/pages/home-page/home-page').then(
        (m) => m.HomePage
      ),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
