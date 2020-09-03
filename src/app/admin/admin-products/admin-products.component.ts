import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;

  constructor(private productService: ProductService) { 
    // turns out snapShotChanges can provide Unique Id, but valueChanges cannot...
    this.products$ = this.productService.getAll().snapshotChanges();
  }

  ngOnInit(): void {
  }

}
