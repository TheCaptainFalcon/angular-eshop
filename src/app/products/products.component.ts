import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProd: Product[] = [];
  categories$;
  category: string;
  
  constructor(productService: ProductService, categoryService: CategoryService, private route: ActivatedRoute) { 
    productService.getAll().subscribe(products => {
      this.products = products
      
      route.queryParamMap.subscribe(params => {
        this.category = params.get("category");
  
        this.filteredProd = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      })
    });

    this.categories$ = categoryService.getAll();
  }
    
}
