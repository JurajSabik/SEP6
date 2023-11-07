package models

import models.enums.UserRole
import org.jetbrains.annotations.NotNull
import java.time.LocalDate
import java.util.UUID

data class User(
    val userId: UUID = UUID.randomUUID(),
    @NotNull val username: String,
    @NotNull val email: String,
    @NotNull val birthday: LocalDate,
    @NotNull val role: UserRole
)