import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static readonly USERNAME = 'sep6';
  private static readonly PASSWORD = '1234';

  private userBaseUrl = 'http://localhost:8080/api/users';
  private csrfTokenUrl = 'http://localhost:8080/api/csrf-token';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(`${UserService.USERNAME}:${UserService.PASSWORD}`)
  });

  constructor(private http: HttpClient) {}

  setCsrfToken(token: string): void {
    this.headers = this.headers.set('X-CSRF-TOKEN', token);
  }

  private getHeaders(): HttpHeaders {
    return this.headers;
  }

  getCsrfToken(): Observable<any> {
    return this.http.get(this.csrfTokenUrl, { headers: this.getHeaders() });
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.userBaseUrl}/${userId}`, { headers: this.getHeaders() });
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.userBaseUrl, user, { headers: this.getHeaders() });
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(this.userBaseUrl, user, { headers: this.getHeaders() });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.userBaseUrl}/${userId}`, { headers: this.getHeaders() });
  }

  followUser(userId: string, followerId: string): Observable<any> {
    return this.http.put(`${this.userBaseUrl}/follow/${userId}/${followerId}`, {}, { headers: this.getHeaders() });
  }

  getFollowers(userId: string): Observable<any> {
    return this.http.get(`${this.userBaseUrl}/followers/${userId}`, { headers: this.getHeaders() });
  }

  getFollowing(userId: string): Observable<any> {
    return this.http.get(`${this.userBaseUrl}/following/${userId}`, { headers: this.getHeaders() });
  }
}
