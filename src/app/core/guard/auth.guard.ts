import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  // Skip guard on server-side to prevent redirecting before localStorage is accessible
  if (isPlatformServer(platformId)) {
    return true;
  }

  if (authService.isAuthenticated) {
    return true;
  }

  // If not authenticated, redirect to login
  return router.createUrlTree(['/auth/login']);
};
