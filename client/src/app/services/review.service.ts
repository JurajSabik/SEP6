import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DomainReview} from "@models/domain/domain-review";
import {Vote} from "@models/domain/vote-dto";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewBaseUrl = 'http://localhost:8080/api/reviews';

  constructor(private http: HttpClient) { }

  getReviewById(reviewId: string): Observable<DomainReview> {
    return this.http.get(`${this.reviewBaseUrl}/${reviewId}`);
  }

  getReviewsByUserId(userId: string): Observable<DomainReview[]> {
    return this.http.get<DomainReview[]>(`${this.reviewBaseUrl}/user/${userId}`);
  }

  getReviewsByMovieId(movieId: string): Observable<DomainReview[]> {
    return this.http.get<DomainReview[]>(`${this.reviewBaseUrl}/movie/${movieId}`);
  }

  createReview(review: DomainReview): Observable<DomainReview> {
    return this.http.post(this.reviewBaseUrl, review);
  }

  updateReview(review: any): Observable<void> {
    return this.http.put<void>(this.reviewBaseUrl, review);
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.reviewBaseUrl}/${reviewId}`);
  }

  upvoteReview(reviewId?: string , userId?: string): Observable<any> {
    return this.http.put(`${this.reviewBaseUrl}/upvote/${reviewId}/${userId}`, {});
  }

  downvoteReview(reviewId?: string, userId?: string): Observable<any> {
    return this.http.put(`${this.reviewBaseUrl}/downvote/${reviewId}/${userId}`, {});
  }

  deleteVote(reviewId?: string, userId?: string): Observable<any> {
    return this.http.delete(`${this.reviewBaseUrl}/upvote/delete/${reviewId}/${userId}`);
  }

  getVotesByReviewId(reviewId?: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.reviewBaseUrl}/votes/review/${reviewId}`);
  }

  getVotesByUserId(userId?: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.reviewBaseUrl}/votes/user/${userId}`);
  }
}
