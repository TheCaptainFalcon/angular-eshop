import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  // by default in 2 way binding, first inits as null, therefore obj addresses this and for adding new products
  product:any={};

  constructor(
    private router: Router, 
    // to read route params
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) { 
      this.categories$ = categoryService.getCategories().valueChanges();

      let id = this.route.snapshot.paramMap.get('id');
      // use take to quickly take one item or value from observable and automatically complete, making unsubscribe not needed bc the obs will no longer emit any values
      if (id) this.productService.get(id).valueChanges().pipe(take(1)).subscribe(p => this.product = p)
      console.log(this.product)
      
  }
    
  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
