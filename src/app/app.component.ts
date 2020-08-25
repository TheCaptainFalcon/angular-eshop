import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-eshop';
  constructor(private auth: AuthService, router: Router, private userService: UserService) {
    // single instance of this in DOM; in root is fine. If in other routes, need to implement onDestroy to handle memory leaks.
    auth.userData$.subscribe(user => {
      if (user) {
        // can be swapped into signUp method, but this ensures that updates made to user credientials outside of the app scope 
        // (more so future proof features) are linked to correct db info
        userService.save(user)
        // userService.createAndUpdateUser(user);
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    })
  } 
}
