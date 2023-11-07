import models.Comment
import models.FavoriteItemList
import models.Reply
import org.apache.commons.lang3.RandomStringUtils
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import validators.ReplyValidator
import validators.exceptions.ValidationException
import java.sql.Timestamp
import java.time.LocalDateTime
import java.util.*
import java.util.stream.Stream

class ReplyValidatorTest {
  private lateinit var replyValidator: ReplyValidator

  @BeforeEach
  fun setup() {
    replyValidator = ReplyValidator()
  }

  @ParameterizedTest
  @MethodSource("getStreamOfFavoriteItemLists")
  fun shouldValidateWithoutThrowing(reply: Reply) {
    assertDoesNotThrow { replyValidator.validate(reply) }
  }

  companion object {
    @JvmStatic
    fun getStreamOfFavoriteItemLists(): Stream<Reply> {
      return getStreamOfDomainModels("replies.json")
    }
  }

  @Test
  fun testValidationExceptionMessage(): Unit {
    val invalidReply = Reply(
      text = RandomStringUtils.randomAlphanumeric(251),
      userId = UUID.randomUUID(),
      toUserId = UUID.randomUUID(),
      commentId = UUID.randomUUID(),
      timestamp = Timestamp.valueOf(LocalDateTime.now().plusDays(1))
    )
    val exception = assertThrows(ValidationException::class.java) {
      replyValidator.validate(invalidReply)
    }

    assertTrue(exception.message!!.contains("ReplyValidator"))
    assertTrue(exception.message!!.contains("Text has 251 characters. Maximum is: 200."))
    assertTrue(exception.message!!.contains("Timestamp cannot be in the future."))
  }
}