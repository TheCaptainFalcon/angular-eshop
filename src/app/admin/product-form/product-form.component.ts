import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;

  constructor(categoryService: CategoryService) { 
    this.categories$ = categoryService.getCategories().valueChanges();
  }
    
  

}
