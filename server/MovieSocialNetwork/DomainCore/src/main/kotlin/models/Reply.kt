package models

import org.jetbrains.annotations.NotNull
import java.sql.Timestamp
import java.util.UUID

data class Reply(
  val replyId: UUID = UUID.randomUUID(),
  @NotNull val text: String,
  @NotNull val userId: UUID,
  @NotNull val toUserId: UUID,
  @NotNull val commentId: UUID,
  @NotNull val timestamp: Timestamp,
  val upVotes: Int = 0,
  val downVotes: Int = 0
)