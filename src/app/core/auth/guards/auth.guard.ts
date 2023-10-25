import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';
import { inject } from '@angular/core';

export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private accountService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const user = this.accountService.currentUser;
      console.log(user)
      if (user) {
          // authorised so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}
