import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.authService.userData$.pipe(map(user => {
      if (user) return true;

      // unable to retrieve queryParams after login. Need localStorage to obtain again for usage (even with email/pass auth method)
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }))
  }
}
