import com.sep6.infrastructureservices.persistence.services.UserPersistenceService
import com.sep6.infrastructureservices.rest.controllers.UserController
import dtos.FollowerDto
import io.mockk.coEvery
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import io.mockk.mockk
import kotlinx.coroutines.runBlocking
import models.User
import models.enums.UserRole
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import services.UserService
import java.time.LocalDate
import java.util.*

class UserControllerTest {
    private val userRepo = mockk<UserPersistenceService>()
    private val userService = mockk<UserService>()
    private val userController = UserController(userRepo)
    private val userId = UUID.randomUUID()
    private val followerID = UUID.randomUUID()
    private val expectedUser = User(userId = UUID.randomUUID(), externalId = "external id", username = "test",
        email = "test@email.com", role = UserRole.STANDARD_USER)

    @Test
    fun `getUserById returns user`() = runBlocking {
        coEvery { userRepo.getUserById(userId) } returns expectedUser
        val responseEntity: ResponseEntity<User> = userController.getUserById(userId)
        assertEquals(HttpStatus.OK, responseEntity.statusCode)
        assertEquals(expectedUser, responseEntity.body)
    }

    @Test
    fun `createUser returns created user`() = runBlocking {
        coEvery { userRepo.createUser(expectedUser) } returns expectedUser
        coEvery { userService.createUser(expectedUser) } returns expectedUser
        val responseEntity: ResponseEntity<User> = userController.createUser(expectedUser)
        assertEquals(HttpStatus.CREATED, responseEntity.statusCode)
        assertEquals(expectedUser, responseEntity.body)
    }

    @Test
    fun `updateUser returns ok`() = runBlocking {
        coEvery { userRepo.updateUser(expectedUser) } returns Unit
        coEvery { userService.updateUser(expectedUser) } returns Unit
        val responseEntity: ResponseEntity<String> = userController.updateUser(expectedUser)
        assertEquals(HttpStatus.OK, responseEntity.statusCode)
    }

    @Test
    fun `deleteUser returns ok`() = runBlocking {
        coEvery { userRepo.deleteUser(userId) } returns Unit
        val responseEntity: ResponseEntity<Void> = userController.deleteUser(userId)
        assertEquals(HttpStatus.OK, responseEntity.statusCode)
    }

    @Test
    fun `followOtherUser returns ok`() = runBlocking {
        coEvery { userRepo.addFollower(userId, followerID) } returns Unit
        val responseEntity: ResponseEntity<Void> = userController.followOtherUser(userId, followerID)
        assertEquals(HttpStatus.OK, responseEntity.statusCode)
    }

    @Test
    fun `unfollowOtherUser returns ok`() = runBlocking {
        coEvery { userRepo.removeFollower(userId, followerID) } returns Unit
        val responseEntity: ResponseEntity<Void> = userController.unfollowOtherUser(userId, followerID)
        assertEquals(HttpStatus.OK, responseEntity.statusCode)
    }

    @Test
    fun `getFollowers returns followers`() = runBlocking {
        val userList = listOf(expectedUser)
        val followerDtoList = userList.map { user -> FollowerDto(user.userId, user.username) }
        coEvery { userRepo.getFollowers(userId) } returns userList
        coEvery { userService.getFollowers(userId) } returns followerDtoList
        val responseEntity: ResponseEntity<List<FollowerDto>> = userController.getFollowers(userId)
        assertEquals(HttpStatus.OK, responseEntity.statusCode)
        assertEquals(followerDtoList, responseEntity.body)
    }

    @Test
    fun `getFollowing returns following`() = runBlocking {
        val userList = listOf(expectedUser)
        val followingDtoList = userList.map { user -> FollowerDto(user.userId, user.username) }
        coEvery { userRepo.getFollowing(userId) } returns userList
        coEvery { userService.getFollowing(userId) } returns followingDtoList
        val responseEntity: ResponseEntity<List<FollowerDto>> = userController.getFollowing(userId)
        assertEquals(HttpStatus.OK, responseEntity.statusCode)
        assertEquals(followingDtoList, responseEntity.body)
    }

    @Test
    fun `getDoesExist returns true`() = runBlocking {
        coEvery { userRepo.doesUserExist(expectedUser.username) } returns true
        val responseEntity: ResponseEntity<Boolean> = userController.getDoesExist(expectedUser.username)
        assertEquals(HttpStatus.OK, responseEntity.statusCode)
        assertEquals(true, responseEntity.body)
    }

    @Test
    fun `getDoesExistByEmail returns true`() = runBlocking {
        coEvery { userRepo.doesUserExistByEmail(expectedUser.email) } returns true
        val responseEntity: ResponseEntity<Boolean> = userController.getDoesExistByEmail(expectedUser.email)
        assertEquals(HttpStatus.OK, responseEntity.statusCode)
        assertEquals(true, responseEntity.body)
    }

    @Test
    fun `getByExternalId returns user`() = runBlocking {
        coEvery { expectedUser.externalId?.let { userRepo.getUserByExternalId(it) } } returns expectedUser
        val responseEntity: ResponseEntity<User>? = expectedUser.externalId?.let { userController.getByExternalId(it) }
        if (responseEntity != null) {
            assertEquals(HttpStatus.OK, responseEntity.statusCode)
        }
        if (responseEntity != null) {
            assertEquals(expectedUser, responseEntity.body)
        }
    }
}