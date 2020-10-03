import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  appUser: AppUser;
  subscription: Subscription;
  shoppingCartItemCount: number;

  // no longer passed into a template, therefore marked as private
  constructor(private authService: AuthService, private cartService: ShoppingCartService) { 
  }

  async ngOnInit() {
    this.subscription = this.authService.appUserData$.subscribe(appUser => this.appUser = appUser);

    let cart$ = await (await this.cartService.getCart()).valueChanges();
    cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  SignOut() {
    this.authService.SignOut();
  }

}
