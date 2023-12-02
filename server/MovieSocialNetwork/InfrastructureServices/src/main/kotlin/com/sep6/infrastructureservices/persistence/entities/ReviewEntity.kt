package com.sep6.infrastructureservices.persistence.entities

import jakarta.persistence.*
import models.Review
import java.sql.Timestamp
import java.util.*
import kotlin.collections.HashSet

@Entity
@NoArgConstructor
@Table(name = "REVIEWS")
class ReviewEntity(
  @Id
  @Column(name = "review_id")
  val reviewId: UUID,

//  @ManyToOne(cascade = [CascadeType.REMOVE])
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  val user: UserEntity,

  @Column(name = "movie_id", nullable = false)
  val movieId: String,

  @Column(name = "text", nullable = false)
  val text: String,

  @Column(name = "rating", nullable = false)
  val rating: Int,

  @OneToMany(mappedBy = "review", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
  val votes: MutableSet<ReviewVoting>? = HashSet(),

  @Column(name = "timestamp", nullable = false)
  val timestamp: Timestamp
) {
  constructor(review: Review) : this(
    review.reviewId,
    UserEntity(review.userId),
    review.movieId,
    review.text,
    review.rating,
    HashSet<ReviewVoting>(),
    review.timestamp
  )

  constructor(reviewId: UUID) : this(
    reviewId,
    UserEntity(UUID.randomUUID()),
    "",
    "",
    0,
    HashSet<ReviewVoting>(),
    Timestamp(System.currentTimeMillis())
  )

  fun mapToDomain(): Review {
    return Review(
      reviewId,
      user.userId,
      movieId,
      text,
      rating,
      timestamp
    )
  }
}