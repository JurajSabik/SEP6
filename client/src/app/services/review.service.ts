import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review, Vote } from '../model/reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:8080/api/reviews'; // Replace with your actual server URL

  constructor(private http: HttpClient) {}

  getReviewById(reviewId: string): Observable<Review> {
    return this.http.get<Review>(`${this.baseUrl}/${reviewId}`);
  }

  getReviewsByMovieId(movieId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/movie/${movieId}`);
  }

  getReviewsByUserId(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/user/${userId}`);
  }

  createReview(review: {
    rating: number;
    movieId: string | undefined;
    text: string;
    userId: string | undefined;
    timestamp: string
  }): Observable<Review> {
    return this.http.post<Review>(this.baseUrl, review);
  }

  updateReview(review: Review): Observable<any> {
    return this.http.put(`${this.baseUrl}`, review);
  }

  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${reviewId}`);
  }

  upvoteReview(reviewId: string, userId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/upvote/${reviewId}/${userId}`, {});
  }

  downvoteReview(reviewId: string, userId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/downvote/${reviewId}/${userId}`, {});
  }

  deleteVote(reviewId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/vote/${reviewId}/${userId}`);
  }

  getVotesByReviewId(reviewId: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.baseUrl}/votes/review/${reviewId}`);
  }

  getVotesByUserId(userId: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.baseUrl}/votes/user/${userId}`);
  }
}
