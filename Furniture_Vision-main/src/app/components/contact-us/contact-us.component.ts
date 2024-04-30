import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  order: any = {};

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  });
  constructor(private http: HttpClient) {}

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.http.post('http://127.0.0.1:5000/contact_us', this.contactForm.value).subscribe(
        response => alert('Message sent successfully'),
        error => alert('Error occurred while sending message')
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
