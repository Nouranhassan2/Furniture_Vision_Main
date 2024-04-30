import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  imageUrl:string=''
  data:any[]=[]
  @Input() isVisible: boolean = false;
  @Input() selectedProduct?: Product;  // Make sure the type matches what you expect.
  @Output() closeEvent = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  close(): void {
    this.isVisible = false;
    this.closeEvent.emit();  // Emit an event when the modal is closed

  }

  // addToCart(): void {
  //   if (this.selectedProduct && this.selectedProduct.productID != null) {
  //     this.cartService.addToCart(this.selectedProduct).subscribe({
  //       next: response => {
  //         console.log('Product added to cart:', response.cart
          
  //       );
  //       this.imageUrl = response.imageUrl;

  //         this.close();
  //       },
  //       error: error => {
  //         console.error('Error adding product to cart:', error);
  //       }
  //     });
  //   } else {
  //     console.error('Error: Selected product is undefined or product ID is missing.');
  //   }
  // }
  addToCart(): void {
    if (this.selectedProduct && this.selectedProduct.productID != null) {
      this.cartService.addToCart(this.selectedProduct).subscribe({
        next: (response: any) => {  // Temporarily use 'any' to avoid type issues during debugging
          console.log('Full API response:', response);
          if (response.cart && response.message) {
            this.data = response.cart;
            console.log('Product added to cart:', response.message, 'Cart:', response.cart);
            this.close();
                    this.imageUrl = response.imageUrl;

          } else {
            console.error('Invalid response structure:', response);
          }
        },
        error: error => {
          console.error('Error adding product to cart:', error);
        }
      });
    } else {
      console.error('Error: Selected product is undefined or product ID is missing.');
    }
  }
}