import kotlinx.coroutines.runBlocking
import models.FavoriteItemList
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import validators.FavoriteItemListValidator
import validators.exceptions.ValidationException
import java.sql.Timestamp
import java.time.LocalDateTime
import java.util.*
import java.util.stream.Stream

class FavoriteItemListValidatorTest {
  private lateinit var favoriteItemListValidator: FavoriteItemListValidator

  @BeforeEach
  fun setup() {
    favoriteItemListValidator = FavoriteItemListValidator()
  }

  @ParameterizedTest
  @MethodSource("getStreamOfFavoriteItemLists")
  fun shouldValidateWithoutThrowing(favoriteItemList: FavoriteItemList) {
    assertDoesNotThrow { runBlocking {  favoriteItemListValidator.validate(favoriteItemList) }}
  }

  companion object {
    @JvmStatic
    fun getStreamOfFavoriteItemLists(): Stream<FavoriteItemList> {
      return getStreamOfDomainModels("favorite-item-lists.json")
    }
  }

  @Test
  fun testValidationExceptionMessage() {
    val invalidList = FavoriteItemList(
      name = "",
      userId = UUID.randomUUID(),
      items = listOf(),
      timestamp = Timestamp.valueOf(LocalDateTime.now().plusDays(1)),
      upVotes = -1,
      downVotes = -5
    )
    val exception = assertThrows(ValidationException::class.java) {
      runBlocking {  favoriteItemListValidator.validate(invalidList) }
    }

    assertTrue(exception.message!!.contains("FavoriteItemListValidator"))
    assertTrue(exception.message!!.contains("List name must not be blank."))
    assertTrue(exception.message!!.contains("The list must contain at least one item."))
    assertTrue(exception.message!!.contains("Upvotes and Downvotes cannot have a negative value."))
    assertTrue(exception.message!!.contains("Timestamp cannot be in the future."))
  }
}