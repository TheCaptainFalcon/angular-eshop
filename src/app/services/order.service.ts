import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  // need interface for order
  storeOrder(order) {
    return this.db.list('/orders/').push(order);
  }
}
