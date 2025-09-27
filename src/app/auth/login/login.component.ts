import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor() {}

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      console.log('Login submitted:', this.loginData);
      // Replace this with authentication service call
    } else {
      console.error('Invalid login data');
    }
  }

}
