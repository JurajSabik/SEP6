import { Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public user = this.currentUserSubject.asObservable();

  constructor(
    private auth: Auth, // Use Auth from @angular/fire/auth

  ) {
    authState(this.auth).subscribe(user => {
      this.currentUserSubject.next(user);
    });
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    if (credential.user) { // Check if user is non-null
      console.log("user created");
      console.log(credential.user);
    //   await this.updateUserData(credential.user);
    }
    return credential;
  }

  async signInWithFacebook() {
    // const credential = await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    // return credential;
  }

  async signInWithTwitter() {
    // const credential = await this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    // return credential;
  }

  async signInWithGithub() {
    // const credential = await this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
    // return credential;
  }

  async signInWithLinkedIn() {
    // const credential = await this.afAuth.signInWithPopup(new firebase.auth.OAuthProvider('linkedin.com'));
    // return credential;
  }


  //create user with email, password, name, and photo
  async signUpWithEmail(email: string, password: string, name: string, lastName: string) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await this.updateProfile(name + " " + lastName);
    return credential;
  }


  async loginWithEmail(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    return credential;
  }


  async signOut(): Promise<void> {
    console.log('signing out');
    return await signOut(this.auth);
  }


  async isLogged() {
    return this.auth.currentUser;
  }


  async updateProfile(displayName: string) {
    const user = this.auth.currentUser;
    if (user) {
      await updateProfile(user, {
        displayName: displayName,
        // ... other profile updates
      });
      // ... rest of the code
    }
  }

}
