package repository_contracts

import models.Review
import java.util.*

interface ReviewRepository {
  fun createReview(review: Review)
  fun updateReview(review: Review)
  fun deleteReview(reviewId: UUID)
  fun getReviewById(reviewId: UUID): Review?
}