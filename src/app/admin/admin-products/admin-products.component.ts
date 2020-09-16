import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  // no longer an observable due to client filtering method, as needed within an array
  // client over server due to lower amount of types/data for UX
  products: Product[];
  filteredProd: any[];
  sub: Subscription;
  displayedColumns: string[] = ['title', 'price', 'key'];


  constructor(private productService: ProductService) { 
    // turns out snapShotChanges can provide Unique Id, but valueChanges cannot...
    this.sub = this.productService.getAll().subscribe(products => this.filteredProd = this.products = products)
  }

  filter(query: string) {
    this.filteredProd = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
  }

}
