package repository_contracts

import models.Review
import models.Vote
import java.util.*

interface ReviewRepository {
  suspend fun createReview(review: Review): Review
  suspend fun updateReview(review: Review)
  suspend fun deleteReview(reviewId: UUID)
  suspend fun getReviewById(reviewId: UUID): Review?
  suspend fun getReviewsByMovieId(movieId: String): List<Review>?
  suspend fun getReviewsByUserId(userId: UUID): List<Review>?
  suspend fun upVoteReview(reviewId: UUID, userId: UUID)
  suspend fun downVoteReview(reviewId: UUID, userId: UUID)
  suspend fun deleteVote(reviewId: UUID, userId: UUID)
  suspend fun getVotesByReviewId(reviewId: UUID): List<Vote>?
  suspend fun getVotesByUserId(userId: UUID): List<Vote>?
}