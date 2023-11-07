package validators

import models.User
import validators.exceptions.ValidationException

import java.time.LocalDate

class UserValidator : Validator<User> {
  override fun validate(entity: User) {
    val errors = mutableListOf<String>()
    val emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$".toRegex()
    val maxUsernameCharacters = 20

    if (entity.username.isBlank()) errors.add("Username must not be blank.")
    if (entity.username.length > maxUsernameCharacters) errors.add("Username cannot have more than $maxUsernameCharacters characters.")
    if (!entity.email.matches(emailRegex)) errors.add("Invalid email format.")
    if (entity.birthday.isAfter(LocalDate.now())) errors.add("Birthday cannot be in the future.")
    if (entity.birthday.isBefore(
        LocalDate.of(
          1909,
          1,
          1
        )
      )
    ) errors.add("Birthday cannot be before 1909. The user cannot physically be that old.")

    if (errors.isNotEmpty()) {
      throw ValidationException(errors, "UserValidator")
    }
  }
}