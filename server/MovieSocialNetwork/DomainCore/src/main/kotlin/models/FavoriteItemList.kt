package models

import org.jetbrains.annotations.NotNull
import java.sql.Timestamp
import java.util.UUID

data class FavoriteItemList(
  val listId: UUID = UUID.randomUUID(),
  @NotNull val userId: UUID,
  @NotNull val name: String,
  val items: List<Item> = listOf(),
  @NotNull val timestamp: Timestamp,
  var upVotes: Int = 0,
  var downVotes: Int = 0
)