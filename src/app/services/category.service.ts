import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/Categories', ref => ref.orderByChild("name"))
      .snapshotChanges()
      .pipe(map(metadata => {
        return metadata.map(item => {
          let key = item.payload.key;
          let data = { key, ...item.payload.val() as {} };
          
          return data;
        })
      }))


  }

}
