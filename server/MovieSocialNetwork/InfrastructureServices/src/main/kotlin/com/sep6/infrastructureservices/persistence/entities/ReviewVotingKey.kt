package com.sep6.infrastructureservices.persistence.entities

import jakarta.persistence.Column
import jakarta.persistence.Embeddable
import java.io.Serializable
import java.util.UUID

@Embeddable
class ReviewVotingKey(
  @Column(name = "review_id")
  val reviewId: UUID,

  @Column(name = "user_id")
  val userId: UUID
) : Serializable {
  constructor() : this(UUID.randomUUID(), UUID.randomUUID())

  override fun equals(other: Any?): Boolean {
    if (this === other) return true
    if (other !is ReviewVotingKey) return false

    if (reviewId != other.reviewId) return false
    if (userId != other.userId) return false

    return true
  }

  override fun hashCode(): Int {
    var result = reviewId.hashCode()
    result = 31 * result + userId.hashCode()
    return result
  }
}