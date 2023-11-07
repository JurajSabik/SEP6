package com.sep6.infrastructureservices.persistence.entities

import jakarta.persistence.*
import java.sql.Timestamp
import java.util.*

@Entity
@Table(name = "REVIEWS")
class ReviewEntity(
  @Id
  @Column(name = "review_id")
  val reviewId: UUID,

  @ManyToOne(cascade = [CascadeType.REMOVE])
  @JoinColumn(name = "user_id", nullable = false)
  val user: UserEntity,

  @Column(name = "movie_id", nullable = false)
  val movieId: String,

  @Column(name = "text", nullable = false)
  val text: String,

  @Column(name = "rating", nullable = false)
  val rating: Int,

  @Column(name = "timestamp", nullable = false)
  val timestamp: Timestamp
)