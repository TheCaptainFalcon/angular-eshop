import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth, private route: ActivatedRoute) { 
    this.userData$ = angularFireAuth.authState;
  }

  SignUp(email: string, password: any) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Sign up success!', res);
    })
    .catch(err => {
      console.log('Error signing up:', err.message);
    });
  }

  SignIn(email: string, password: any) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Login Success!', res);
    })
    .catch(err => {
      console.log('Error logging in:', err.message);
    });
  }

  SignOut() {
    this.angularFireAuth.signOut();
  }

  // sendEmailVerification() {
  //   firebase.auth().currentUser.sendEmailVerification();
  // }

}