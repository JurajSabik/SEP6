import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ReviewService } from '@services/review.service';
import {DomainReview} from "@models/domain/domain-review";

@Component({
  selector: 'app-review-popup',
  templateUrl: './review-popup.component.html',
  styleUrls: ['./review-popup.component.css']
})
export class ReviewPopupComponent {
  @Input() movieId: string | undefined;
  @Input() userId: string | undefined;
  reviewText: string = '';
  rating: number = 0;
  @Output() submitReview = new EventEmitter<DomainReview>();
  @Output() closePopup = new EventEmitter<void>();
  constructor(private reviewService: ReviewService) {}
  saveReview(): void {
    const domainReview: DomainReview = {
      userId: this.userId,
      movieId: this.movieId,
      timestamp: new Date(),
      text: this.reviewText,
      rating: this.rating
    }
    this.reviewService.createReview(domainReview).subscribe();
    this.submitReview.emit(domainReview)
    this.close();
  }

  rate(star: number): void {
    this.rating = star;
  }

  close(): void {
    this.closePopup.emit();
  }
}
