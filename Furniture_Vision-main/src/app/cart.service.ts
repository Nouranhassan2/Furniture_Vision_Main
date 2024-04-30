import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://127.0.0.1:5000/add_to_cart';
  private itemsSubject = new BehaviorSubject<Product[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {
    const initialItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.itemsSubject.next(initialItems);
  }

  addToCart(product: Product) {
    return this.http.post<{ imageUrl: string }>(this.apiUrl, { productID: product.productID }).pipe(
      tap(response => {
        const currentItems = this.itemsSubject.value;
        const updatedItems = [...currentItems, {...product, imageUrl: response.imageUrl}];
        this.itemsSubject.next(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      }),
      catchError(error => {
        console.error('Failed to add to cart', error);
        return throwError(error);
      })
    );
  }

  removeFromCart(product: Product): void {
    const currentItems = this.itemsSubject.value;
    const filteredItems = currentItems.filter(item => item.productID !== product.productID);
    this.itemsSubject.next(filteredItems);
    localStorage.setItem('cartItems', JSON.stringify(filteredItems));
  }
}



  // addToCart(product: Product): Observable<any> {
  //   return new Observable(observer => {
  //     this.http.post(this.apiUrl, { productID: product.productID }, {
  //       headers: { 'Content-Type': 'application/json' }
  //     }).subscribe({
  //       next: (response) => {
  //         const currentItems = this.itemsSubject.value;
  //         this.itemsSubject.next([...currentItems, product]);
  //         observer.next(response);
  //         observer.complete();
  //       },
  //       error: error => {
  //         observer.error(error);
  //         observer.complete();
  //       }
  //     });
  //   });
  // }