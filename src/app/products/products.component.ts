import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProd: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;
  
  constructor(
    productService: ProductService, 
    private route: ActivatedRoute,
    private cartService: ShoppingCartService) { 

    productService.getAll().subscribe(products => {
      this.products = products

      route.queryParamMap.subscribe(params => {
        this.category = params.get("category");
  
        this.filteredProd = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      })
    });
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())

      .subscribe(cart => this.cart = cart)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
