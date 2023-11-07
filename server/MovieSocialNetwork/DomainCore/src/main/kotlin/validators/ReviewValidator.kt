package validators

import models.Review
import validators.exceptions.ValidationException
import java.sql.Timestamp
import java.time.LocalDateTime

class ReviewValidator : Validator<Review> {
  override fun validate(entity: Review) {
    val errors = mutableListOf<String>()
    val ratingMin = 0
    val ratingMax = 5
    val textLengthMax = 3000

    if (entity.text.length > textLengthMax) errors.add(
      String.format(
        "Text has %s characters. Maximum is: %s.",
        entity.text.length,
        textLengthMax
      )
    )
    if (entity.rating < ratingMin) errors.add(String.format("Rating cannot be lower than: %s.", ratingMin))
    if (entity.rating > ratingMax) errors.add(String.format("Rating cannot be higher than: %s.", ratingMax))
    if (entity.timestamp.after(Timestamp.valueOf(LocalDateTime.now()))) errors.add("Timestamp cannot be in the future.")

    if (errors.isNotEmpty()) {
      throw ValidationException(errors, "ReviewValidator")
    }
  }
}