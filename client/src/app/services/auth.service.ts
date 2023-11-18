import { Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { UserService} from "./user.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public user = this.currentUserSubject.asObservable();

  constructor(
    private auth: Auth, // Use Auth from @angular/fire/auth
    private userService: UserService

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

    // create user in your own defined API
    this.createOrUpdateUserLocal(credential.user);


    return credential;
  }

  //create user in your own defined API
  async createOrUpdateUserLocal(firebaseUser: User | null) {
    console.log("createOrUpdateUserLocal");
    if (firebaseUser) {
      // Retrieve CSRF token if needed
      this.userService.getCsrfToken().subscribe(token => {
        this.userService.setCsrfToken(token);

        // Prepare user data to be sent to your API
        const userData = {
          // map the Firebase user data to the format expected by your API
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          // ... other user data
        };

        // Call your API to create/update the user
        this.userService.createUser(userData).subscribe({
          next: (response) => {
            console.log('User created/updated in your API', response);
          },
          error: (error) => {
            console.error('Error creating/updating user in your API', error);
          }
        });
      });
    }
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
