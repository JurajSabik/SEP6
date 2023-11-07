import models.Review
import org.apache.commons.lang3.RandomStringUtils
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import validators.ReviewValidator
import validators.exceptions.ValidationException
import java.sql.Timestamp
import java.time.LocalDateTime
import java.util.*
import java.util.stream.Stream

class ReviewValidatorTest {
  private lateinit var reviewValidator: ReviewValidator

  @BeforeEach
  fun setup() {
    reviewValidator = ReviewValidator()
  }

  @ParameterizedTest
  @MethodSource("getStreamOfReviews")
  fun shouldValidateWithoutThrowing(review: Review) {
    Assertions.assertDoesNotThrow { reviewValidator.validate(review) }
  }

  companion object {
    @JvmStatic
    fun getStreamOfReviews(): Stream<Review> {
      return getStreamOfDomainModels("reviews.json")
    }
  }

  @Test
  fun testValidationExceptionMessage(): Unit {
    val invalidReview = Review(
      userId = UUID.randomUUID(),
      movieId = RandomStringUtils.randomAlphanumeric(20),
      text = RandomStringUtils.randomAlphanumeric(3001),
      rating = 7,
      timestamp = Timestamp.valueOf(LocalDateTime.now().plusDays(1))
    )
    val exception = Assertions.assertThrows(ValidationException::class.java) {
      reviewValidator.validate(invalidReview)
    }

    Assertions.assertTrue(exception.message!!.contains("ReviewValidator"))
    Assertions.assertTrue(exception.message!!.contains("Text has 3001 characters. Maximum is: 3000."))
    Assertions.assertTrue(exception.message!!.contains("Rating cannot be higher than: 5."))
    Assertions.assertTrue(exception.message!!.contains("Timestamp cannot be in the future."))
  }
}