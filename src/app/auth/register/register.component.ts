import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  get passwordsDoNotMatch(): boolean {
    return (
      !!this.registerData.password &&
      !!this.registerData.confirmPassword &&
      this.registerData.password !== this.registerData.confirmPassword
    );
  }

  constructor() {}

  onSubmit() {
    if (!this.passwordsDoNotMatch) {
      console.log('Registration submitted:', this.registerData);
      // Replace with real registration API call
    } else {
      console.error('Passwords do not match');
    }
  }

}
