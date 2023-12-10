package com.sep6.infrastructureservices.rest.controllers

import com.sep6.infrastructureservices.persistence.services.UserPersistenceService
import dtos.FollowerDto
import dtos.GeneralUserData
import io.github.oshai.kotlinlogging.KotlinLogging
import models.User
import models.Vote
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import services.UserService
import java.util.*

private val logger = KotlinLogging.logger {}
@RestController
@CrossOrigin(origins = ["http://localhost:4200",  "http://localhost:42185/", "http://20.67.134.65"], allowCredentials = "true")
@RequestMapping("api/users")
class UserController(private val userRepo: UserPersistenceService) {
  private val userService: UserService = UserService( userRepo)

  @GetMapping("/{userId}")
  suspend fun getUserById(@PathVariable userId: UUID): ResponseEntity<User> {
      val user = userRepo.getUserById(userId)
      return ResponseEntity.ok(user)
  }

  @PostMapping()
  suspend fun createUser(@RequestBody user: User): ResponseEntity<User> {
    val createdUser = userService.createUser(user)
    return ResponseEntity(createdUser, HttpStatus.CREATED)
  }

  @PutMapping()
  suspend fun updateUser(@RequestBody user: User): ResponseEntity<String> {
    userService.updateUser(user)
    return ResponseEntity.ok().build()
  }

  @DeleteMapping("/{userId}")
  suspend fun deleteUser(@PathVariable userId: UUID): ResponseEntity<Void> {
    userService.deleteUser(userId)
    return ResponseEntity.ok().build()
  }

  @PutMapping("/follow/{userId}/{otherUserId}")
  suspend fun followOtherUser(@PathVariable userId: UUID, @PathVariable otherUserId: UUID): ResponseEntity<Void> {
    logger.info { "User with id: $userId followed user with id: $otherUserId" }
    userService.followOtherUser(userId, otherUserId)
    return ResponseEntity.ok().build()
  }

  @PutMapping("/unfollow/{userId}/{otherUserId}")
  suspend fun unfollowOtherUser(@PathVariable userId: UUID, @PathVariable otherUserId: UUID): ResponseEntity<Void> {
    userService.unfollowOtherUser(userId, otherUserId)
    logger.info { "User with id: $userId unfollowed user with id: $otherUserId" }
    return ResponseEntity.ok().build()
  }

  @GetMapping("/followers/{userId}")
  suspend fun getFollowers(@PathVariable userId: UUID): ResponseEntity<List<FollowerDto>> {
    return ResponseEntity(userService.getFollowers(userId), HttpStatus.OK)
  }

  @GetMapping("/following/{userId}")
  suspend fun getFollowing(@PathVariable userId: UUID): ResponseEntity<List<FollowerDto>> {
    return ResponseEntity(userService.getFollowing(userId), HttpStatus.OK)
  }

  @GetMapping("votes/{userId}")
  suspend fun getVotes(@PathVariable userId: UUID): ResponseEntity<List<Vote>> {
    return ResponseEntity(userRepo.getVotes(userId), HttpStatus.OK)
  }


  @GetMapping("/exists/{username}")
  suspend fun getDoesExist(@PathVariable username: String): ResponseEntity<Boolean> {
    return ResponseEntity(userRepo.doesUserExist(username), HttpStatus.OK)
  }

  @GetMapping("/exists/email/{email}")
  suspend fun getDoesExistByEmail(@PathVariable email: String): ResponseEntity<Boolean> {
    return ResponseEntity(userRepo.doesUserExistByEmail(email), HttpStatus.OK)
  }

  @GetMapping("/external/{externalId}")
  suspend fun getByExternalId(@PathVariable externalId: String): ResponseEntity<User> {
    return ResponseEntity(userService.getUserByExternalId(externalId), HttpStatus.OK)
  }

  @GetMapping("/username/{username}")
  suspend fun getByUsername(@PathVariable username: String): ResponseEntity<User> {
    return ResponseEntity(userService.getUserByUsername(username), HttpStatus.OK)
  }

  @GetMapping("/general/{userId}")
  suspend fun getGeneralUserData(@PathVariable userId: UUID): ResponseEntity<GeneralUserData> {
    return ResponseEntity(userRepo.getGeneralUserData(userId), HttpStatus.OK)
  }
}