import {Injectable} from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from '@angular/fire/auth';
import {User} from 'firebase/auth';
import {BehaviorSubject} from 'rxjs';
import {UserService} from "./user.service";
import {DomainUser, UserRole} from "@models/domain/domain-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public user = this.currentUserSubject.asObservable();

  constructor(
    private auth: Auth,
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
    this.userService.getUserByExternalId(credential.user.uid).subscribe({
      error: async (err) => {
        if (err.status === 404) {
          await this.createUserOnServer(credential.user)
          return credential;
        } else {
          await signOut(this.auth)
          return ;
        }
      }
    });
  }

  async signUpWithEmail(email: string, password: string, username: string) {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await this.updateProfile(username);
    await this.createUserOnServer(credential.user);
    return credential;
  }

  async createUserOnServer(firebaseUser: User | null) {
    if (firebaseUser) {
      const userData: DomainUser = {
        username: firebaseUser.displayName!,
        externalId: firebaseUser.uid,
        email: firebaseUser.email!,
        role: UserRole.STANDARD_USER
      }

      this.userService.createUser(userData).subscribe({
        error: (error) => {
          console.error('Error creating user on server', error);
        }
      });
    }
  }

  async loginWithEmail(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async signOut(): Promise<void> {
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
      });
    }
  }

}
