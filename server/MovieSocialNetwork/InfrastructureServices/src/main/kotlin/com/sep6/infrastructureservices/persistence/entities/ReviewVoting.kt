package com.sep6.infrastructureservices.persistence.entities

import jakarta.persistence.*
import models.Vote
import java.sql.Timestamp
import java.util.*

@Entity
class ReviewVoting(
  @EmbeddedId
  val id: ReviewVotingKey,

  @ManyToOne
  @MapsId("reviewId")
  @JoinColumn(name = "review_id")
  val review: ReviewEntity,

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(name = "user_id")
  val user: UserEntity,

  @Column(name = "is_upvote")
  var isUpvote: Boolean,

  @Column(name = "timestamp", nullable = false)
  val timestamp: Timestamp
) {
  constructor(review: ReviewEntity, user: UserEntity, isUpvote: Boolean) : this(
    ReviewVotingKey(review.reviewId, user.userId),
    review,
    user,
    isUpvote,
    Timestamp(System.currentTimeMillis())
  )

  constructor(reviewId: UUID, userId: UUID, isUpvote: Boolean) : this(
    ReviewVotingKey(reviewId, userId),
    ReviewEntity(reviewId),
    UserEntity(userId),
    isUpvote,
    Timestamp(System.currentTimeMillis())
  )

  fun mapToDomain(): Vote {
    return Vote(
      id.reviewId,
      id.userId,
      isUpvote,
      timestamp
    )
  }
}