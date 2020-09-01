import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;

  constructor(
    private router: Router, 
    private categoryService: CategoryService, 
    private productService: ProductService) { 
      this.categories$ = categoryService.getCategories().valueChanges();
  }
    
  save(product) {
    this.productService.create(product)
    this.router.navigate(['/admin/products']);
  }

}
