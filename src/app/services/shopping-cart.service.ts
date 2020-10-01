import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '../models/product';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<any>('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
      let cartId = localStorage.getItem('cartId');
      if (cartId) return cartId;

      let result = await this.create();
      localStorage.setItem('cartId', result.key);
  
      // add product to cart
      return result.key;
    }

  async addToCart(product: Product, change: number) {
    this.UpdateItemQuantity(product, 1)
  };

  async removeFromCart(product: Product, change: number) {
    this.UpdateItemQuantity(product, -1);
  };

  private async UpdateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key)

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      item$.update({
        product: product, quantity: (item.payload.val().quantity || 0 ) + change })
    });
  };

}
