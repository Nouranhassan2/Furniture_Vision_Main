import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowCaseComponent } from './components/show-case/show-case.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path:'',component:ShowCaseComponent},
  { path: 'checkout', component: CheckoutFormComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
