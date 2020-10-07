import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(map(x => new ShoppingCart(x.payload.exportVal().items)))
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

  async addToCart(product: Product) {
    this.UpdateItem(product, 1)
  };

  async removeFromCart(product: Product) {
    this.UpdateItem(product, -1);
  };

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private async UpdateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key)

    item$.valueChanges().pipe(take(1)).subscribe((item:any) => {
      if (!item) {
        item$.update({
          title: product.title,
          description: product.description,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1
        })
      } else {
        let quantity = item.quantity + change

        if (quantity === 0) {
        item$.remove();
        } else {
          item$.update({ quantity }) 
        }
      }
    })
  }
}
     

      
  

