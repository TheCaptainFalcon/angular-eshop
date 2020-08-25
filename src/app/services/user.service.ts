import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // change to fireStore once complexity of site is required?
  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase) { 
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      email: user.email
    });
  };

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


