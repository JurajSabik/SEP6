import models.User
import models.enums.UserRole
import org.apache.commons.lang3.RandomStringUtils
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import validators.UserValidator
import validators.exceptions.ValidationException
import java.time.LocalDate
import java.util.stream.Stream

class UserValidatorTest {
  private lateinit var userValidator: UserValidator

  @BeforeEach
  fun setup() {
    userValidator = UserValidator()
  }

  @ParameterizedTest
  @MethodSource("getStreamOfUsers")
  fun shouldValidateWithoutThrowing(user: User) {
    Assertions.assertDoesNotThrow { userValidator.validate(user) }
  }

  companion object {
    @JvmStatic
    fun getStreamOfUsers(): Stream<User> {
      return getStreamOfDomainModels("users.json")
    }
  }

  @Test
  fun testValidationExceptionMessage(): Unit {
    val invalidUserOne = User(
      username = "",
      email = "incorrect",
      birthday = LocalDate.now().plusDays(1),
      role = UserRole.STANDARD_USER
    )
    val exception = Assertions.assertThrows(ValidationException::class.java) {
      userValidator.validate(invalidUserOne)
    }

    Assertions.assertTrue(exception.message!!.contains("UserValidator"))
    Assertions.assertTrue(exception.message!!.contains("Username must not be blank."))
    Assertions.assertTrue(exception.message!!.contains("Birthday cannot be in the future."))
    Assertions.assertTrue(exception.message!!.contains("Invalid email format."))

    val invalidUserTwo = User(
      username = RandomStringUtils.randomAlphanumeric(21),
      email = "someth92asd2.com",
      birthday = LocalDate.of(1908, 1, 1),
      role = UserRole.STANDARD_USER
    )
    val exceptionTwo = Assertions.assertThrows(ValidationException::class.java) {
      userValidator.validate(invalidUserTwo)
    }

    Assertions.assertTrue(exceptionTwo.message!!.contains("UserValidator"))
    Assertions.assertTrue(exceptionTwo.message!!.contains("Username cannot have more than 20 characters."))
    Assertions.assertTrue(exceptionTwo.message!!.contains("Birthday cannot be before 1909. The user cannot physically be that old."))
    Assertions.assertTrue(exceptionTwo.message!!.contains("Invalid email format."))
  }
}