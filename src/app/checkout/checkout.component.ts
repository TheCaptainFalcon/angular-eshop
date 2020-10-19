import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  shipping: any={}; 
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription
  userId: string;

  constructor(private cartService: ShoppingCartService, private orderService: OrderService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.userData$.subscribe(user => this.userId = user.uid)
  }

 async placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            description: i.description,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    }
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
