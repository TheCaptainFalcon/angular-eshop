import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  shipping = {}; 

  constructor() { }

  placeOrder() {
    console.log(this.shipping);
  }  

  ngOnInit(): void {
  }

}
