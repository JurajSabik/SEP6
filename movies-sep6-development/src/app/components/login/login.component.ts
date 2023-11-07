import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 

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
    private router: Router 
  ) {}

  async signInWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
      alert('Error with Google sign-in: ' + (error as any).message);
    }
  }

  async signInWithFacebook() {
    try {
      await this.authService.signInWithFacebook();
      this.router.navigate(['/home']);
    } catch (error) {
      alert('Error with Facebook sign-in: ' + (error as any).message);
    }
  }

  async signInWithGithub() {
    try {
      await this.authService.signInWithGithub();
      this.router.navigate(['/home']);
    } catch (error) {
      alert('Error with Github sign-in: ' + (error as any).message);
    }
  }

  async signInWithLinkedin() {
    try {
      await this.authService.signInWithLinkedIn();
      this.router.navigate(['/home']);
    } catch (error) {
      alert('Error with LinkedIn sign-in: ' + (error as any).message);
    }
  }

  async loginWithEmail() {
    try {
      await this.authService.loginWithEmail(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error) {
      alert('Error with email login: ' + (error as any).message);
    }
  }


  async signInWithTwitter() {
    try {
      await this.authService.signInWithTwitter();
      this.router.navigate(['/home']);
    } catch (error) {
      alert('Error with Twitter sign-in: ' + (error as any).message);
    }
  }
  
}
