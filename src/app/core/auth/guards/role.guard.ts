import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const userRole =  JSON.parse(localStorage.getItem('currentUser') || '{}');
  const router = inject(Router);
  if(userRole.is_staff === true) {
    return true;
  } else {
    router.navigate(['admin-dashboard']);
    return false;
  }
};