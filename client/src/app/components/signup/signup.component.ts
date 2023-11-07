import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',  // assuming you have saved your html in this file
  styleUrls: ['./signup.component.css']    // assuming you have saved your css in this file
})
export class SignupComponent {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { 
    
  }

  onSubmit() {
    this.errorMessage = '';  // Resetting the error message

    // Basic validation logic
    if (!this.firstName) {
      this.errorMessage = 'First Name is required.';
      return;
    }

    if (!this.lastName) {
      this.errorMessage = 'Last Name is required.';
      return;
    }

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters long.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // If validations pass, handle Firebase signup logic
    this.handleFirebaseSignup();
  }

  async handleFirebaseSignup() {
    try {
      await this.authService.signUpWithEmail(this.email, this.password, this.firstName, this.lastName);
    } catch (error) {
      this.errorMessage = (error as any).message;
    }
  }
}
