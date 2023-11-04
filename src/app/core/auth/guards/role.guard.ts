import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
    const userRole =  JSON.parse(localStorage.getItem('currentUserObj') || '{}');
    const router = inject(Router);
  console.log('role guard', userRole.is_staf);
  if(userRole.is_staff === true) {
    return true;
  } else {
    router.navigate(['dashboard']);
    return false;
  }
  return true;
};