import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DomainUser} from "@models/domain/domain-user";
import {Follower} from "@models/domain/follower-dto";
import {GeneralUserData} from "@models/stats-dtos/general-user-data";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userBaseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
  }

  getUserById(userId: string): Observable<DomainUser> {
    return this.http.get<DomainUser>(`${this.userBaseUrl}/${userId}`);
  }

  getUserByUsername(username: string): Observable<DomainUser> {
    return this.http.get<DomainUser>(`${this.userBaseUrl}/username/${username}`)
  }

  getUserByExternalId(externalId: string): Observable<DomainUser> {
    return this.http.get<DomainUser>(`${this.userBaseUrl}/external/${externalId}`)
  }

  doesUserExist(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.userBaseUrl}/exists/${username}`)
  }

  doesUserExistByEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.userBaseUrl}/exists/email/${email}`)
  }

  createUser(user: DomainUser): Observable<DomainUser> {
    return this.http.post<DomainUser>(this.userBaseUrl, user);
  }

  updateUser(user: any): Observable<void> {
    return this.http.put<void>(this.userBaseUrl, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.userBaseUrl}/${userId}`);
  }

  followUser(userId: string, otherUserId: string): Observable<any> {
    return this.http.put(`${this.userBaseUrl}/follow/${userId}/${otherUserId}`,{});
  }

  unfollowUser(userId: string, otherUserId: string): Observable<any> {
    return this.http.put(`${this.userBaseUrl}/unfollow/${userId}/${otherUserId}`,{});
  }

  getFollowers(userId: string): Observable<Follower[]> {
    return this.http.get<Follower[]>(`${this.userBaseUrl}/followers/${userId}`);
  }

  getFollowing(userId: string): Observable<Follower[]> {
    return this.http.get<Follower[]>(`${this.userBaseUrl}/following/${userId}`);
  }

  getGeneralUserData(userId: string): Observable<GeneralUserData> {
    return this.http.get<GeneralUserData>(`${this.userBaseUrl}/general/${userId}`);
  }
}
