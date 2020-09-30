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

  // private getCart(cartId: string) {
  //   return this.db.object('/shopping-carts/' + cartId);
  // }

  private getItem(cartId: string, productId: string) {
    return this.db.object<any>('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
      let cartId = localStorage.getItem('cartId');
      if (cartId) return cartId;

      let result = await this.create();
      localStorage.setItem('cartId', result.key);
  
      // add product to cart
      return result.key;
    }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key)

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      item$.update({
        product: product, quantity: (item.quantity || 0 ) + 1 })
    })
  }
}
