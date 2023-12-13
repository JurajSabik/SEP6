import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomainComment} from "@models/domain/domain-comment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentBaseUrl = 'http://20.67.134.54:8080/api/comments';

  constructor(private http: HttpClient) { }

  getCommentById(commentId: string): Observable<DomainComment> {
    return this.http.get<DomainComment>(`${this.commentBaseUrl}/${commentId}`);
  }

  createComment(comment: DomainComment): Observable<DomainComment> {
    return this.http.post<DomainComment>(`${this.commentBaseUrl}`, comment);
  }

  updateComment(comment: DomainComment): Observable<any> {
    return this.http.put(`${this.commentBaseUrl}`, comment);
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.commentBaseUrl}/${commentId}`);
  }

  getCommentsByReviewId(reviewId: string): Observable<DomainComment[]> {
    return this.http.get<DomainComment[]>(`${this.commentBaseUrl}/review/${reviewId}`);
  }

  getCommentsByUserId(userId: string): Observable<DomainComment[]> {
    return this.http.get<DomainComment[]>(`${this.commentBaseUrl}/user/${userId}`);
  }
}
