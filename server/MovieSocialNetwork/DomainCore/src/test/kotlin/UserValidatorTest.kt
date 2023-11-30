import kotlinx.coroutines.runBlocking
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
    Assertions.assertDoesNotThrow { runBlocking { userValidator.validate(user) } }
  }

  companion object {
    @JvmStatic
    fun getStreamOfUsers(): Stream<User> {
      return getStreamOfDomainModels("users.json")
    }
  }

  @Test
  fun testValidationExceptionMessage() {
    val invalidUserOne = User(
      username = "",
      externalId = "",
      email = "incorrect",
      role = UserRole.STANDARD_USER
    )
    val exception = Assertions.assertThrows(ValidationException::class.java) {
      runBlocking { userValidator.validate(invalidUserOne) }
    }

    Assertions.assertTrue(exception.message!!.contains("UserValidator"))
    Assertions.assertTrue(exception.message!!.contains("Username must not be blank."))
    Assertions.assertTrue(exception.message!!.contains("Invalid email format."))

    val invalidUserTwo = User(
      username = RandomStringUtils.randomAlphanumeric(21),
      externalId = "",
      email = "someth92asd2.com",
      role = UserRole.STANDARD_USER
    )
    val exceptionTwo = Assertions.assertThrows(ValidationException::class.java) {
      runBlocking { userValidator.validate(invalidUserTwo) }
    }

    Assertions.assertTrue(exceptionTwo.message!!.contains("UserValidator"))
    Assertions.assertTrue(exceptionTwo.message!!.contains("Username cannot have more than 20 characters."))
    Assertions.assertTrue(exceptionTwo.message!!.contains("Invalid email format."))
  }
}