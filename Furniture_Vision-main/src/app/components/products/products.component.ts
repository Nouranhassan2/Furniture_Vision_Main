import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/api-response';
import { Product } from 'src/app/product';
import { ProductsSService } from 'src/app/products-s.service';
import { NgZone } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

products: Product[] = [];
filteredProducts: any[] = [];
selectedCategory: string = '';
filterVisible = false;  // Controls the visibility of the filter select
selectedProduct?: Product;
 modalVisible = false;


constructor(private productService: ProductsSService) {}


selectCategory(category: string): void {

  this.selectedCategory = category;
  this.filterVisible = true;
  this.productService.getProductsByCategory(category).subscribe({
    next: (response: ApiResponse) => {
      this.products = response.products;  // Correctly accessing the products array
      console.log(response.products);
      
      this.filteredProducts = [];  // Clearing filtered products
    },
    error: (error) => console.error('Error fetching data: ', error)
  });
}

applyFilter(filter: string): void {
  if (this.selectedCategory && filter) {
    this.productService.getFilteredProducts(this.selectedCategory, filter).subscribe({
      next: (response: ApiResponse) => {
        this.filteredProducts = response.products;  // Correctly accessing the filtered products
      },
      error: (error) => console.error('Error fetching filtered data: ', error)
    });
  }
}
showProductModal(product: Product): void {
  this.selectedProduct = product;
  this.modalVisible = true;
}
handleModalClose(): void {
  this.modalVisible = false;  // Reset the modal visibility
  this.selectedProduct = undefined;  // Optional: Clear the selected product
}
}