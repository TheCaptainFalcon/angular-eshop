import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProd: Product[] = [];
  category: string;

  
  constructor(productService: ProductService, private route: ActivatedRoute, private cartService: ShoppingCartService) { 
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

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
