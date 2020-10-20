import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { FillerComponent } from './filler/filler.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
},

{
  path: 'error', 
  component: FillerComponent,
},

{
  path: 'products', 
  component: ProductsComponent,
},

{
  path: 'cart',
  component: CartComponent,
},

// Add signUp later to differentiate forms
{
  path: 'login',
  component: LoginComponent,
},

{
  path: 'checkout',
  component: CheckoutComponent,
  canActivate: [AuthGuardService],
},

{
  path: 'order-success/:id',
  component: OrderSuccessComponent,
  canActivate: [AuthGuardService],
},

{
  path: 'my/orders', 
  component: MyOrdersComponent,
  canActivate: [AuthGuardService],
},

{
  path: 'admin/products/new',
  component: ProductFormComponent,
  canActivate: [AuthGuardService, AdminAuthGuardService],
},

{
  path: 'admin/products/:id',
  component: ProductFormComponent,
  canActivate: [AuthGuardService, AdminAuthGuardService],
},

{
  path: 'admin/products',
  component: AdminProductsComponent,
  canActivate: [AuthGuardService, AdminAuthGuardService],
},

{
  path: 'admin/orders',
  component: AdminOrdersComponent,
  canActivate: [AuthGuardService, AdminAuthGuardService],
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
