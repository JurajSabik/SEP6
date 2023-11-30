package validators

import models.User
import validators.exceptions.ValidationException

class UserValidator : Validator<User> {
  override suspend fun validate(entity: User) {
    val errors = mutableListOf<String>()
    val emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$".toRegex()
    val maxUsernameCharacters = 20

    if (entity.username.isBlank()) errors.add("Username must not be blank.")
    if (entity.username.length > maxUsernameCharacters) errors.add("Username cannot have more than $maxUsernameCharacters characters.")
    if (!entity.email.matches(emailRegex)) errors.add("Invalid email format.")
    if (errors.isNotEmpty()) {
      throw ValidationException(errors, "UserValidator")
    }
  }
}