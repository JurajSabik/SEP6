package dtos

import org.jetbrains.annotations.NotNull
import java.util.*

data class FollowerDto(
  @NotNull val userId: UUID,
  @NotNull val username: String
)