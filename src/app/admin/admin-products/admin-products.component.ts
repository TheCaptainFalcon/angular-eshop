import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from  '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  // no longer an observable due to client filtering method, as needed within an array
  // client over server due to lower amount of types/data for UX
  products: Product[];
  filteredProd: any[];
  sub: Subscription;
  displayedColumns: string[] = ['index', 'title', 'category', 'price', 'key', 'delete'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  id;


  constructor(private productService: ProductService, private router: Router) { 
    // turns out snapShotChanges can provide Unique Id, but valueChanges cannot...
    this.sub = this.productService.getAll().subscribe(products => this.dataSource.data = products)
  }

  filter(query: string) {
    query = query.trim();
    query = query.toLowerCase();
    this.dataSource.filter = query;

    // this.filteredProd = (query) ?
    //   this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    //   this.products;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  // Added from product form comp. trying to see if it fits better on the data table
  delete() {
    if (confirm("Are you sure you want to delete this product?")) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    } else {
      return;
    }
  }

}
