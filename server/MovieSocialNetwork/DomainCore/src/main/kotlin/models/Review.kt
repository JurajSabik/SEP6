package models

import org.jetbrains.annotations.NotNull
import java.sql.Timestamp
import java.util.UUID

data class Review(
  val reviewId: UUID = UUID.randomUUID(),
  @NotNull val userId: UUID,
  @NotNull val movieId: String,
  @NotNull val text: String,
  @NotNull val rating: Int,
  @NotNull val timestamp: Timestamp
)