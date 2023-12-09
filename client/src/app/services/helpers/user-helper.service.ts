import { Injectable } from '@angular/core';
import {AuthService} from "../auth.service";
import {UserService} from "../user.service";
import {DomainUser} from "@models/domain/domain-user";

@Injectable({
  providedIn: 'root'
})
export class UserHelperService {
  constructor(private authService: AuthService,
              private userService: UserService) {
  }

  public  async fetchDomainUser(): Promise<DomainUser> {
    return await new Promise<DomainUser>((resolve, reject) => {
      this.authService.user.subscribe({
        next: (user) => {
          if (user != null) {
            this.userService.getUserByExternalId(user.uid).subscribe({
              next: (domainUser) => {
                resolve(domainUser);
              },
              error: (error) => {
                reject(error);
              }
            });
          }
        }
      });
    });
  }
}
