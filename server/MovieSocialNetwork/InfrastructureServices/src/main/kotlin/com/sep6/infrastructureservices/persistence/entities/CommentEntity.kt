package com.sep6.infrastructureservices.persistence.entities

import jakarta.persistence.*
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

  @Column(name = "up_votes")
  val upVotes: Int = 0,

  @Column(name = "down_votes")
  val downVotes: Int = 0
)