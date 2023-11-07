package models

import org.jetbrains.annotations.NotNull
import java.time.Duration
import java.time.LocalDate
import java.util.*

data class Movie (
  @NotNull val movieId: UUID = UUID.randomUUID(),
  @NotNull override val externalId: String,
  val title: String? = null,
  val genre: String? = null,
  val releaseDate: LocalDate? = null,
  val duration: Duration? = null,
) : Item(movieId, externalId)