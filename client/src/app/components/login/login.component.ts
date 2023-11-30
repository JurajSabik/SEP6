import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
  }

  async signInWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      this.snackbarService.open(`Successfully logged in: ${this.authService.getCurrentUser()?.displayName}`)
      await this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
      alert('Error with Google sign-in: ' + (error as any).message);
    }
  }

  async loginWithEmail() {
    try {
      await this.authService.loginWithEmail(this.email, this.password);
      this.snackbarService.open(`Successfully logged in: ${this.authService.getCurrentUser()?.displayName}`)
      await this.router.navigate(['/home']);
    } catch (error) {
      alert('Error with email login: ' + (error as any).message);
    }
  }
}
