import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  // need interface for order
  async placeOrder(order) {
    let result = await this.db.list('/orders/').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders/').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders/', query => 
      query.orderByChild('userId').equalTo(userId)).valueChanges();
    }
  }
