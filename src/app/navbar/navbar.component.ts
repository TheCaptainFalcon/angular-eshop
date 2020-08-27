import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  appUser: AppUser;

  // no longer passed into a template, therefore marked as private
  constructor(private authService: AuthService) { 
    // there are no multiple instances of this component in the DOM, there are no memory leaks - (unsubscribe is optional)
    authService.appUserData$.subscribe(appUser => this.appUser = appUser)
  }

  SignOut() {
    this.authService.SignOut();
  }

}
