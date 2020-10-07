import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart$;
  shoppingCartItemCount: number;


  constructor(private cartService: ShoppingCartService) { }

  
  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    let cartCount$ = await this.cartService.getCart()
    cartCount$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity
      }

    })
  }
  

  clearCart() {
    this.cartService.clearCart();
  }

}
