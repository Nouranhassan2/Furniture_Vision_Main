import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { ApiResponse } from './api-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsSService {
  private baseUrl = 'http://127.0.0.1:5000/products';

  constructor(private http: HttpClient) {}

  getProductsByCategory(category: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${category}`);
  }

  getFilteredProducts(category: string, filter: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${category}/${filter}`);
  }
}



