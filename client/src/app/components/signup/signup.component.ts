import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {SnackbarService} from "../../services/snackbar.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',  // assuming you have saved your html in this file
  styleUrls: ['./signup.component.css']    // assuming you have saved your css in this file
})
export class SignupComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,
              private userService: UserService,
              private snackbarService: SnackbarService,
              private router: Router
  ) {

  }

  async onSubmit() {
    this.errorMessage = '';  // Resetting the error message

    // Basic validation logic
    if (!this.username) {
      this.errorMessage = 'Username is required.';
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

    this.userService.doesUserExistByEmail(this.email).subscribe((exists) => {
      if(exists) {
        this.errorMessage = 'User with that email already exists. Try logging in.';
        return;
      }
    });

    this.userService.doesUserExist(this.username).subscribe(async (exists) => {
      if(exists) {
        this.errorMessage = 'User with that username already exists. If you signed up previously, try logging in.';
        return;
      } else {
        await this.handleFirebaseSignup();
      }
    });
  }

  async handleFirebaseSignup() {
    try {
      await this.authService.signUpWithEmail(this.email, this.password, this.username);
      this.snackbarService.open(`Successfully created account with username ${this.username}.`)
      await this.router.navigate(['/home']);
    } catch (error) {
      this.errorMessage = (error as any).message;
    }
  }
}
