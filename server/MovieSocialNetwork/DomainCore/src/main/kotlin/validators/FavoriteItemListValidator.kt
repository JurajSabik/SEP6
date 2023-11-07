package validators

import models.FavoriteItemList
import validators.exceptions.ValidationException
import java.sql.Timestamp
import java.time.LocalDateTime

class FavoriteItemListValidator : Validator<FavoriteItemList> {
  override fun validate(entity: FavoriteItemList) {
    val errors = mutableListOf<String>()
    if (entity.name.isBlank()) errors.add("List name must not be blank.")
    if (entity.items.isEmpty()) errors.add("The list must contain at least one item.")
    if (entity.timestamp.after(Timestamp.valueOf(LocalDateTime.now()))) errors.add("Timestamp cannot be in the future.")
    if (errors.isNotEmpty()) {
      throw ValidationException(errors, "FavoriteItemListValidator")
    }
  }
}