import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-popup',
  templateUrl: './review-popup.component.html',
  styleUrls: ['./review-popup.component.css']
})
export class ReviewPopupComponent {
  @Input() movieId: string | undefined;
  userId: string = "pVi07F9GKmVqiZcfQTUCVUn42L83"; // Example user ID
  reviewText: string = '';
  rating: number = 0;
  @Output() submitReview = new EventEmitter<{ reviewText: string, rating: number }>();
  @Output() closePopup = new EventEmitter<void>();

  constructor(private reviewService: ReviewService) {}

  saveReview(): void {
    // Here you would handle the review submission logic
    console.log('Review submitted:', { movieId: this.movieId, userId: this.userId, reviewText: this.reviewText, rating: this.rating });
    this.submitReview.emit({ reviewText: this.reviewText, rating: this.rating });
    this.close();
  }

  rate(star: number): void {
    this.rating = star;
  }

  close(): void {
    this.closePopup.emit();
  }
}
