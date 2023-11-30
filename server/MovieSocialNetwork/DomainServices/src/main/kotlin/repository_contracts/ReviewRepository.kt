package repository_contracts

import models.Review
import java.util.*

interface ReviewRepository {
  suspend fun createReview(review: Review)
  suspend fun updateReview(review: Review)
  suspend fun deleteReview(reviewId: UUID)
  suspend fun getReviewById(reviewId: UUID): Review?
}