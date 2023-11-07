package models

import org.jetbrains.annotations.NotNull
import java.util.UUID

open class Item (
  @NotNull val itemId: UUID,
  @NotNull open val externalId: String
)