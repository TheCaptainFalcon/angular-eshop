import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-eshop';
  constructor(private auth: AuthService, router: Router) {
    // single instance of this in DOM; in root is fine. If in other routes, need to implement onDestroy to handle memory leaks.
    auth.userData$.subscribe(user => {
      if (user) {
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    })
  } 
}
