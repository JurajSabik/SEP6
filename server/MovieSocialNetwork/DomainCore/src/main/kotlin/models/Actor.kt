package models

import org.jetbrains.annotations.NotNull
import java.time.LocalDate
import java.util.*

data class Actor(
  @NotNull val actorId: UUID = UUID.randomUUID(),
  @NotNull override val externalId: String, val name: String? = null,
  val birthday: LocalDate? = null
) : Item(actorId, externalId)