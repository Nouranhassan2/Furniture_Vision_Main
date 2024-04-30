import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-show-case',
  templateUrl: './show-case.component.html',
  styleUrls: ['./show-case.component.css']
})
export class ShowCaseComponent {
  navbarOpen = false;

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Value', this.contactForm.value);
      // Here you can add the logic to send the form data to a server or email service.
    }
  }

  toggleNavbar() {
    console.log("toggleNavbar called");
    this.navbarOpen = !this.navbarOpen;
  }  }



