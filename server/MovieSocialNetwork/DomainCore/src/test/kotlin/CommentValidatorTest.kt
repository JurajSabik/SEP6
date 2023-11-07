import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import models.Comment
import org.apache.commons.lang3.RandomStringUtils
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import validators.CommentValidator
import validators.exceptions.ValidationException
import java.sql.Timestamp
import java.time.LocalDateTime
import java.util.*
import java.util.stream.Stream

class CommentValidatorTest {
  private lateinit var commentValidator: CommentValidator
  private lateinit var objectMapper: ObjectMapper

  @BeforeEach
  fun setup() {
    commentValidator = CommentValidator()
    objectMapper = jacksonObjectMapper()
  }

  @ParameterizedTest
  @MethodSource("getStreamOfComments")
  fun shouldValidateWithoutThrowing(comment: Comment) {
    assertDoesNotThrow { commentValidator.validate(comment) }
  }

  companion object {
    @JvmStatic
    fun getStreamOfComments(): Stream<Comment> {
      return getStreamOfDomainModels("comments.json")
    }
  }

  @Test
  fun testValidationExceptionMessage(): Unit {
    val invalidTextLength = 251
    val invalidComment = Comment(
      userId = UUID.randomUUID(),
      reviewId = UUID.randomUUID(),
      text = RandomStringUtils.randomAlphanumeric(invalidTextLength),
      timestamp = Timestamp.valueOf(LocalDateTime.now().plusDays(1))
    )
    val validator = CommentValidator()
    val exception = assertThrows(ValidationException::class.java) {
      validator.validate(invalidComment)
    }

    assertTrue(exception.message!!.contains("CommentValidator"))
    assertTrue(exception.message!!.contains("Text has 251 characters. Maximum is: 250."))
    assertTrue(exception.message!!.contains("Timestamp cannot be in the future."))
  }
}