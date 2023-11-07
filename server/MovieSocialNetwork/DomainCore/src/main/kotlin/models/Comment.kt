package models

import org.jetbrains.annotations.NotNull
import java.sql.Timestamp
import java.util.UUID

data class Comment(
  val commentId: UUID = UUID.randomUUID(),
  @NotNull val userId: UUID,
  @NotNull val reviewId: UUID,
  @NotNull val text: String,
  @NotNull val timestamp: Timestamp,
  val upVotes: Int = 0,
  val downVotes: Int = 0
)