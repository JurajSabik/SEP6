package validators

import models.Reply
import validators.exceptions.ValidationException
import java.sql.Timestamp
import java.time.LocalDateTime

class ReplyValidator : Validator<Reply> {
  override fun validate(entity: Reply) {
    val errors = mutableListOf<String>()
    val textLengthMax = 200

    if (entity.text.length > textLengthMax) errors.add(
      String.format(
        "Text has %s characters. Maximum is: %s.",
        entity.text.length, textLengthMax
      )
    )

    if (entity.timestamp.after(Timestamp.valueOf(LocalDateTime.now()))) errors.add("Timestamp cannot be in the future.")
    if (errors.isNotEmpty()) {
      throw ValidationException(errors, "ReplyValidator")
    }
  }
}