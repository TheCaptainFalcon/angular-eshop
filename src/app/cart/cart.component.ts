import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart$;

  constructor(private cartService: ShoppingCartService) { }

  
  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

}
