package com.sep6.infrastructureservices.persistence.entities

import jakarta.persistence.*
import java.sql.Timestamp
import java.util.*

@Entity
@Table(name = "REPLIES")
class ReplyEntity(
  @Id
  @Column(name = "reply_id")
  val commentId: UUID ,

  @ManyToOne(cascade = [CascadeType.ALL])
  @JoinColumn(name = "user_id", nullable = false)
  val user: UserEntity,

  @ManyToOne(cascade = [CascadeType.ALL])
  @JoinColumn(name = "to_user_id", nullable = false)
  val toUser: UserEntity,

  @ManyToOne(cascade = [CascadeType.ALL])
  @JoinColumn(name = "comment_id", nullable = false)
  val comment: CommentEntity,

  @Column(name = "text", nullable = false)
  val text: String,

  @Column(name = "timestamp", nullable = false)
  val timestamp: Timestamp,

  @Column(name = "up_votes")
  val upVotes: Int,

  @Column(name = "down_votes")
  val downVotes: Int
)