package models

import org.jetbrains.annotations.NotNull
import java.sql.Timestamp
import java.util.*

class Vote (
  @NotNull val reviewId: UUID,
  @NotNull val userId: UUID,
  @NotNull val isUpvote: Boolean,
  @NotNull val timestamp: Timestamp = Timestamp(System.currentTimeMillis())
)