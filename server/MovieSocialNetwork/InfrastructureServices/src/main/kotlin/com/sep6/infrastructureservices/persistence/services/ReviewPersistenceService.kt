package com.sep6.infrastructureservices.persistence.services

import com.sep6.infrastructureservices.persistence.entities.ReviewEntity
import com.sep6.infrastructureservices.persistence.entities.ReviewVoting
import com.sep6.infrastructureservices.persistence.entities.UserEntity
import com.sep6.infrastructureservices.persistence.exceptions.ResourceNotFoundException
import com.sep6.infrastructureservices.persistence.repositories.ReviewPersistenceRepository
import com.sep6.infrastructureservices.persistence.repositories.ReviewVotingPersistenceRepository
import com.sep6.infrastructureservices.persistence.repositories.UserPersistenceRepository
import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import models.Review
import models.Vote
import org.springframework.stereotype.Service
import org.springframework.transaction.support.TransactionTemplate
import repository_contracts.ReviewRepository
import java.util.*

@Service
class ReviewPersistenceService(
  val jpaReviewRepo: ReviewPersistenceRepository,
  val jpaUserRepo: UserPersistenceRepository,
  val jpaReviewVotingRepo: ReviewVotingPersistenceRepository,
  private val transactionTemplate: TransactionTemplate
) : ReviewRepository {

  @PersistenceContext
  private val entityManager: EntityManager? = null
  override suspend fun createReview(review: Review): Review = withContext(Dispatchers.IO) {
    val response = jpaReviewRepo.save(ReviewEntity(review))
    return@withContext response.mapToDomain()
  }

  override suspend fun updateReview(review: Review): Unit = withContext(Dispatchers.IO) {
    when (jpaReviewRepo.existsById(review.reviewId)) {
      true -> jpaReviewRepo.save(ReviewEntity(review))
      false -> throw ResourceNotFoundException("Review with id ${review.reviewId} not found")
    }
  }

  override suspend fun deleteReview(reviewId: UUID): Unit = withContext(Dispatchers.IO) {
    when (jpaReviewRepo.existsById(reviewId)) {
      true -> {
        deleteComments(reviewId)
        jpaReviewRepo.deleteById(reviewId)
      }
      false -> throw ResourceNotFoundException("Review with id $reviewId not found")
    }
  }

  override suspend fun getReviewById(reviewId: UUID): Review? = withContext(Dispatchers.IO) {
    return@withContext if (jpaReviewRepo.existsById(reviewId)) jpaReviewRepo.findById(reviewId).get()
      .mapToDomain() else throw ResourceNotFoundException("Review with id $reviewId not found")
  }

  override suspend fun getReviewsByMovieId(movieId: String): List<Review>? = withContext(Dispatchers.IO) {
    val reviews = jpaReviewRepo.findByMovieId(movieId)
    return@withContext reviews.map { reviewEntity -> reviewEntity.mapToDomain() }
  }

  override suspend fun getReviewsByUserId(userId: UUID): List<Review>? = withContext(Dispatchers.IO) {
    val reviews = jpaReviewRepo.findByUser(UserEntity(userId))
    return@withContext reviews.map { reviewEntity -> reviewEntity.mapToDomain() }
  }

  override suspend fun upVoteReview(reviewId: UUID, userId: UUID): Unit = withContext(Dispatchers.IO) {
    val (review: ReviewEntity?, user: UserEntity?) = getReviewAndUserEntityById(reviewId, userId)
    modifyVoteIfPresent(review!!, user!!, true)
    addReviewVoteIfVoteNotPresent(review, user, true)
  }

  suspend fun modifyVoteIfPresent(review: ReviewEntity, user: UserEntity, upvote: Boolean) {
    val reviewVote = ReviewVoting(review, user, upvote)
    if (review.votes!!.any { reviewVoting -> reviewVoting.id == reviewVote.id }) {
      val vote = review.votes.first { reviewVoting -> reviewVoting.id == reviewVote.id }
      vote.apply {
        isUpvote = upvote
      }
    }
    withContext(Dispatchers.IO) {
      jpaReviewRepo.save(review)
    }
  }

  override suspend fun downVoteReview(reviewId: UUID, userId: UUID): Unit = withContext(Dispatchers.IO) {
    val (review: ReviewEntity?, user: UserEntity?) = getReviewAndUserEntityById(reviewId, userId)
    modifyVoteIfPresent(review!!, user!!, false)
    addReviewVoteIfVoteNotPresent(review, user, false)
  }

  private fun getReviewAndUserEntityById(
    reviewId: UUID,
    userId: UUID
  ): Pair<ReviewEntity?, UserEntity?> {
    var review: ReviewEntity? = null
    var user: UserEntity? = null
    jpaReviewRepo.findById(reviewId)
      .ifPresentOrElse({ review = it }, { throw ResourceNotFoundException("Review with id $reviewId not found") })
    jpaUserRepo.findById(userId)
      .ifPresentOrElse({ user = it }, { throw ResourceNotFoundException("User with id $userId not found") })
    return Pair(review, user)
  }

  private suspend fun addReviewVoteIfVoteNotPresent(
    review: ReviewEntity?,
    user: UserEntity?,
    isUpvote: Boolean
  ) {
    if (review!!.votes!!.none { vote -> vote.user.userId == user?.userId }) {
      review.votes!!.add(ReviewVoting(review, user!!, isUpvote))
      withContext(Dispatchers.IO) {
        jpaReviewRepo.save(review)
      }
    }
  }

   fun deleteComments(reviewId: UUID): Unit {
    transactionTemplate.execute {
      entityManager?.createNativeQuery("DELETE FROM comments WHERE review_id = :reviewId")
        ?.setParameter("reviewId", reviewId)
        ?.executeUpdate()
      it.flush()
    }
  }

  override fun deleteVote(reviewId: UUID, userId: UUID): Unit {
    transactionTemplate.execute {
      entityManager?.createNativeQuery("DELETE FROM review_voting WHERE review_id = :reviewId AND user_id = :userId")
        ?.setParameter("userId", userId)
        ?.setParameter("reviewId", reviewId)
        ?.executeUpdate()
      it.flush()
    }
  }
  override suspend fun getVotesByReviewId(reviewId: UUID): List<Vote>? = withContext(Dispatchers.IO) {
    var review: ReviewEntity? = null
    jpaReviewRepo.findById(reviewId)
      .ifPresentOrElse({ review = it }, { throw ResourceNotFoundException("Review with id $reviewId not found") })
    return@withContext review!!.votes!!.map { vote -> vote.mapToDomain() }
  }

  override suspend fun getVotesByUserId(userId: UUID): List<Vote>? = withContext(Dispatchers.IO) {
    var user: UserEntity? = null
    jpaUserRepo.findById(userId)
      .ifPresentOrElse({ user = it }, { throw ResourceNotFoundException("User with id $userId not found") })
    return@withContext user!!.votes!!.map { vote -> vote.mapToDomain() }
  }

  override suspend fun getRatingForMovie(movieId: String): Double {
    val reviews: List<Review>? = getReviewsByMovieId(movieId)
    if(reviews != null) {
      return if (reviews.isEmpty()) {
        0.0;
      } else {
        var sumOfRatings = 0.0
        reviews.forEach {review: Review -> sumOfRatings += review.rating }
        sumOfRatings / reviews.size;
      }
    }
    throw ResourceNotFoundException("Reviews were not found for movie.");
  }
}