package models

import org.jetbrains.annotations.NotNull
import java.sql.Timestamp
import java.util.UUID

data class FavoriteItemList(
  val listId: UUID = UUID.randomUUID(),
  @NotNull val userId: UUID,
  @NotNull val name: String,
  @NotNull val type: ItemType,
  var items: MutableSet<Item> = HashSet(),
  @NotNull val timestamp: Timestamp,
)