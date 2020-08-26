import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    // this user represents the user obj in auth, not the app database
    return this.authService.userData$
      // valueChanges() needed, as mapping is unavailable over an AngularFireObject, therefore must map the Observable
      .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()))
      .pipe(map(appUser => appUser.isAdmin));
  }

}
