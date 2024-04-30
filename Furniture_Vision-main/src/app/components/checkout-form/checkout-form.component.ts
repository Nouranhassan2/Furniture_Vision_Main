import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent {
  order: any = {};

  constructor(private http: HttpClient) {}


  ngOnInit(): void {

  }


  onSubmit(checkoutForm: any): void {
    if (checkoutForm.valid) {
      this.http.post('http://localhost:5000/submit_order', this.order).subscribe(
        response => {
          console.log('Success:', response);
          alert('Order submitted successfully');
        },
        error => {
          console.error('Error:', error);
          alert('Error occurred while submitting order');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }

}