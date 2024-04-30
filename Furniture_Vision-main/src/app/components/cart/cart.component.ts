import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/cart.service';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items$: Observable<Product[]>;

  constructor(private cartService: CartService  ) {
    this.items$ = this.cartService.items$;
  }
  ngOnInit(): void {
   
  }
  removeFromCart(item: Product): void {
    this.cartService.removeFromCart(item);
  }
}