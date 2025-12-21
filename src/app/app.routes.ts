import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { registerGuard } from './register-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () => import('./layout/auth-layout/auth-layout').then((c) => c.AuthLayout),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then((c) => c.Register),
        canDeactivate: [registerGuard],
      },
      { path: 'login', loadComponent: () => import('./pages/login/login').then((c) => c.Login) },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./layout/user-layout/user-layout').then((c) => c.UserLayout),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./pages/home/home').then((c) => c.Home) },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products').then((c) => c.Products),
        canActivate: [authGuard],
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart').then((c) => c.Cart),
        canActivate: [authGuard],
      },
    ],
  },
  { path: '**', redirectTo: 'auth/login' }, // Catch-all route for 404s
];
