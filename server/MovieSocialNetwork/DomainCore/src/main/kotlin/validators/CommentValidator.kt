package validators

import models.Comment
import validators.exceptions.ValidationException
import java.sql.Timestamp
import java.time.LocalDateTime

class CommentValidator : Validator<Comment> {

  override fun validate(entity: Comment) {
    val errors = mutableListOf<String>()
    val textLengthMax = 250

    if (entity.text.length > textLengthMax) errors.add(
      String.format(
        "Text has %s characters. Maximum is: %s.",
        entity.text.length,
        textLengthMax
      )
    )

    if (entity.timestamp.after(Timestamp.valueOf(LocalDateTime.now()))) errors.add("Timestamp cannot be in the future.")

    if (errors.isNotEmpty()) {
      throw ValidationException(errors, "CommentValidator")
    }
  }
}