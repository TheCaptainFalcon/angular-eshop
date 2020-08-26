import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // change to fireStore once complexity of site is required?
  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase) { 
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      email: user.email,
      // format later
      lastLoggedIn: new Date
    });
  };

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }

  // createNewUser(user) {
  //   return new Promise <any> ((resolve, reject) => {
  //     this.firestore
  //       .collection('users')
  //       .add(user)
  //       .then(res => {
  //         alert('User Added to DB');
  //         console.log(res);
  //       }, err => reject(err));
  //   });
  // }

  // createAndUpdateUser(user) {
  //   return this.firestore
  //     .collection('users')
  //     .doc(user.payload.doc.id)
  //     .set({ completed: true }, { merge: true })
  // }
}


