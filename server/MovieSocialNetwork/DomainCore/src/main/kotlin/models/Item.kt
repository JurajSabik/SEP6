package models

import org.jetbrains.annotations.NotNull
import java.util.UUID

open class Item (
  val itemId: UUID = UUID.randomUUID(),
  @NotNull open val externalId: String
)