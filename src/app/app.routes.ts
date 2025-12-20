import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () => import('./layout/auth-layout/auth-layout').then((c) => c.AuthLayout),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then((c) => c.Register),
      },
      { path: 'login', loadComponent: () => import('./pages/login/login').then((c) => c.Login) },
    ],
  },
  {
    path: 'user',
    loadComponent: () => import('./layout/user-layout/user-layout').then((c) => c.UserLayout),
    // children: [
    //   { path: '', redirectTo: 'login', pathMatch: 'full' },
    //   { path: 'register', loadComponent: () => import('./pages/register/register').then((c) => c.Register) },
    //   { path: 'login', loadComponent: () => import('./pages/login/login').then((c) => c.Login) },
    // ],
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'auth/login' }, // Catch-all route for 404s
];
