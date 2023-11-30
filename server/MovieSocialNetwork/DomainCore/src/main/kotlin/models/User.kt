package models

import models.enums.UserRole
import org.jetbrains.annotations.NotNull
import java.util.UUID

data class User(
    val userId: UUID = UUID.randomUUID(),
    val externalId: String?,
    @NotNull val username: String,
    @NotNull val email: String,
    @NotNull val role: UserRole
)