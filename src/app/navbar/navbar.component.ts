import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userData$: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) { 
    this.userData$ = angularFireAuth.authState;
  }

  signOut() {
    this.angularFireAuth.signOut();
  }
}
