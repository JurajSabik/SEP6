package com.sep6.infrastructureservices.persistence.entities

import jakarta.persistence.*
import models.Comment
import java.sql.Timestamp
import java.util.*

@Entity
@Table(name = "COMMENTS")
class CommentEntity(
  @Id
  @Column(name = "comment_id")
  val commentId: UUID = UUID.randomUUID(),

  @ManyToOne(cascade = [CascadeType.ALL])
  @JoinColumn(name = "user_id", nullable = false)
  val user: UserEntity,

  @ManyToOne(cascade = [CascadeType.ALL])
  @JoinColumn(name = "review_id", nullable = false)
  val review: ReviewEntity,

  @Column(name = "text", nullable = false)
  val text: String,

  @Column(name = "timestamp", nullable = false)
  val timestamp: Timestamp,

){
  constructor(comment: Comment) : this(
    comment.commentId,
    UserEntity(comment.userId),
    ReviewEntity(comment.reviewId, comment.userId),
    comment.text,
    comment.timestamp,
  )

  fun mapToDomain(): Comment {
    return Comment(
      commentId,
      user.userId,
      review.reviewId,
      text,
      timestamp,
    )
  }
}
