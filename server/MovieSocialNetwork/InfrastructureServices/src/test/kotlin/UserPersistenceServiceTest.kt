import com.sep6.infrastructureservices.persistence.entities.UserEntity
import com.sep6.infrastructureservices.persistence.repositories.UserPersistenceRepository
import com.sep6.infrastructureservices.persistence.services.UserPersistenceService
import io.mockk.coEvery
import io.mockk.mockk
import kotlinx.coroutines.runBlocking
import models.User
import models.enums.UserRole
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.springframework.transaction.support.TransactionTemplate
import java.time.LocalDate
import java.util.*

class UserPersistenceServiceTest {
    private val jpaUserRepo: UserPersistenceRepository = mockk()
    private val transactionTemplate: TransactionTemplate = mockk()
    private val userPersistenceService = UserPersistenceService(jpaUserRepo, transactionTemplate)
    private val expectedUser = User(userId = UUID.randomUUID(), externalId = "external ID", username = "testUsername",
        email = "test@email.com", role = UserRole.STANDARD_USER)
    private val expectedFollower = User(userId = UUID.randomUUID(), externalId = "external ID", username = "testFollowername",
        email = "follower@email.com", role = UserRole.STANDARD_USER)


    @Test
    fun `createUser returns user`() = runBlocking {
        coEvery { jpaUserRepo.save(any()) } returns UserEntity(expectedUser)
        val response: User = userPersistenceService.createUser(expectedUser)
        assertEquals(expectedUser, response)
    }

    @Test
    fun `updateUser returns ok`() = runBlocking {
        coEvery { jpaUserRepo.existsById(expectedUser.userId) } returns true
        coEvery { jpaUserRepo.save(any()) } returns UserEntity(expectedUser)
        assertDoesNotThrow { userPersistenceService.updateUser(expectedUser) }
    }

    @Test
    fun `deleteUser returns ok`() = runBlocking {
        coEvery { jpaUserRepo.existsById(expectedUser.userId) } returns true
        coEvery { jpaUserRepo.deleteById(expectedUser.userId) } returns Unit
        assertDoesNotThrow { userPersistenceService.deleteUser(expectedUser.userId) }
    }

    @Test
    fun `getUserById returns user`() = runBlocking {
        coEvery { jpaUserRepo.existsById(expectedUser.userId) } returns true
        coEvery { jpaUserRepo.findById(expectedUser.userId) } returns Optional.of(UserEntity(expectedUser))
        val response: User? = userPersistenceService.getUserById(expectedUser.userId)
        assertEquals(expectedUser, response)
    }

    @Test
    fun `addFollower returns ok`() = runBlocking {
        coEvery { jpaUserRepo.findById(expectedUser.userId) } returns Optional.of(UserEntity(expectedUser))
        coEvery { jpaUserRepo.findById(expectedFollower.userId) } returns Optional.of(UserEntity(expectedFollower))
        coEvery { jpaUserRepo.save(any()) } returns UserEntity(expectedUser)
        assertDoesNotThrow { userPersistenceService.addFollower(expectedUser.userId, expectedFollower.userId) }
    }

    @Test
    fun `removeFollower returns ok`() = runBlocking {
        coEvery { jpaUserRepo.findById(expectedUser.userId) } returns Optional.of(UserEntity(expectedUser))
        coEvery { jpaUserRepo.findById(expectedFollower.userId) } returns Optional.of(UserEntity(expectedFollower))
        coEvery { jpaUserRepo.save(any())} returns UserEntity(expectedUser)
        assertDoesNotThrow { userPersistenceService.removeFollower(expectedUser.userId, expectedFollower.userId) }
    }

    @Test
    fun `doesUserExist returns true`() = runBlocking {
        coEvery { jpaUserRepo.existsByUsername(expectedUser.username) } returns true
        val response: Boolean = userPersistenceService.doesUserExist(expectedUser.username)
        assertEquals(true, response)
    }

    @Test
    fun `doesUserExistByEmail returns true`() = runBlocking {
        coEvery { jpaUserRepo.existsByEmail(expectedUser.email) } returns true
        val response: Boolean = userPersistenceService.doesUserExistByEmail(expectedUser.email)
        assertEquals(true, response)
    }

    @Test
    fun `getUserByExternalId returns user`() = runBlocking {
        coEvery { expectedUser.externalId?.let { jpaUserRepo.existsByExternalId(it) } } returns true
        coEvery { expectedUser.externalId?.let { jpaUserRepo.findByExternalId(it) } } returns UserEntity(expectedUser)
        val response: User? = expectedUser.externalId?.let { userPersistenceService.getUserByExternalId(it) }
        assertEquals(expectedUser, response)
    }
    @Test
    fun `getUserByUsername returns user`() = runBlocking {
        coEvery { expectedUser.username?.let { jpaUserRepo.existsByUsername(it) } } returns true
        coEvery { expectedUser.username?.let { jpaUserRepo.findByUsername(it) } } returns UserEntity(expectedUser)
        val response: User? = expectedUser.username?.let { userPersistenceService.getUserByUsername(it) }
        assertEquals(expectedUser, response)

    }


}

