import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(private orderService: OrderService, private authService: AuthService) { 
  }

  ngOnInit() {
    this.orders$ = this.authService.userData$.pipe(switchMap(u => this.orderService.getOrdersByUser(u.uid)));
  }

}
