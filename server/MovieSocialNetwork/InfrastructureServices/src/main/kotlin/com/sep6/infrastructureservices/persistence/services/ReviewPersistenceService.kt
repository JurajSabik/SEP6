package com.sep6.infrastructureservices.persistence.services

import com.sep6.infrastructureservices.persistence.entities.ReviewEntity
import com.sep6.infrastructureservices.persistence.entities.ReviewVoting
import com.sep6.infrastructureservices.persistence.entities.UserEntity
import com.sep6.infrastructureservices.persistence.exceptions.ResourceNotFoundException
import com.sep6.infrastructureservices.persistence.repositories.ReviewPersistenceRepository
import com.sep6.infrastructureservices.persistence.repositories.ReviewVotingPersistenceRepository
import com.sep6.infrastructureservices.persistence.repositories.UserPersistenceRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import models.Review
import models.Vote
import org.springframework.stereotype.Service
import repository_contracts.ReviewRepository
import java.util.*

@Service
class ReviewPersistenceService(
  val jpaReviewRepo: ReviewPersistenceRepository,
  val jpaUserRepo: UserPersistenceRepository,
  val jpaReviewVotingRepo: ReviewVotingPersistenceRepository
) : ReviewRepository {
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
      true -> jpaReviewRepo.deleteById(reviewId)
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
    var review: ReviewEntity? = null
    var user: UserEntity? = null

    jpaReviewRepo.findById(reviewId)
      .ifPresentOrElse({ review = it }, { throw ResourceNotFoundException("Review with id $reviewId not found") })
    jpaUserRepo.findById(userId)
      .ifPresentOrElse({ user = it }, { throw ResourceNotFoundException("User with id $userId not found") })

    //add vote to review if user has not voted yet on this review
    if (review!!.votes!!.none { vote -> vote.user.userId == userId }) {
      review!!.votes!!.add(ReviewVoting(review!!, user!!, true))
      jpaReviewRepo.save(review!!)
    }
  }

  override suspend fun downVoteReview(reviewId: UUID, userId: UUID): Unit = withContext(Dispatchers.IO) {
    var review: ReviewEntity? = null
    var user: UserEntity? = null
    jpaReviewRepo.findById(reviewId)
      .ifPresentOrElse({ review = it }, { throw ResourceNotFoundException("Review with id $reviewId not found") })
    jpaUserRepo.findById(userId)
      .ifPresentOrElse({ user = it }, { throw ResourceNotFoundException("User with id $userId not found") })

    //add vote to review if user has not voted yet on this review
    if (review!!.votes!!.none { vote -> vote.user.userId == userId }) {
      review!!.votes!!.add(ReviewVoting(review!!, user!!, false))
      jpaReviewRepo.save(review!!)
    }
  }

  override suspend fun deleteVote(reviewId: UUID, userId: UUID): Unit = withContext(Dispatchers.IO) {
    var review: ReviewEntity? = null
    var user: UserEntity? = null
    jpaReviewRepo.findById(reviewId)
      .ifPresentOrElse({ review = it }, { throw ResourceNotFoundException("Review with id $reviewId not found") })
    jpaUserRepo.findById(userId)
      .ifPresentOrElse({ user = it }, { throw ResourceNotFoundException("User with id $userId not found") })

    //remove vote from review and user
    review!!.votes!!.removeIf({ vote -> vote.user.userId == userId})
    user!!.votes!!.removeIf({ vote -> vote.review.reviewId == reviewId})

    jpaReviewRepo.save(review!!)
    jpaUserRepo.save(user!!)
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
}