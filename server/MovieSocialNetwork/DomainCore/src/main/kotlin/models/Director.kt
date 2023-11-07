package models

import org.jetbrains.annotations.NotNull
import java.time.LocalDate
import java.util.UUID
data class Director(
  @NotNull val directorId: UUID = UUID.randomUUID(),
  @NotNull override val externalId: String, val name: String?,
  val birthday: LocalDate?
) : Item(directorId, externalId)