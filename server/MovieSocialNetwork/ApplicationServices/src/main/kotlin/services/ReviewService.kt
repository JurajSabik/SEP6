package services

import models.Review
import repository_contracts.ReviewRepository
import org.jetbrains.annotations.NotNull
import validators.ReviewValidator

class ReviewService(
  @NotNull private val repository: ReviewRepository,
  private val validator: ReviewValidator = ReviewValidator()
) {
  suspend fun createReview(review: Review): Review {
    validator.validate(review)
    return repository.createReview(review)
  }

  suspend fun updateReview(review: Review) {
    validator.validate(review)
    return repository.updateReview(review)
  }
}