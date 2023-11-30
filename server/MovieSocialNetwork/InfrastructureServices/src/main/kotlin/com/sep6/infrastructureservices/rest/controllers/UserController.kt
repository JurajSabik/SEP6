package com.sep6.infrastructureservices.rest.controllers

import com.sep6.infrastructureservices.persistence.services.UserPersistenceService
import dtos.FollowerDto
import models.User
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import services.UserService
import java.util.*

@RestController
@RequestMapping("api/users")
class UserController(private val userRepo: UserPersistenceService) {
  private val userService: UserService = UserService(userRepo)

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
    userRepo.deleteUser(userId)
    return ResponseEntity.ok().build()
  }

  @PutMapping("follow/{userId}/{followerId}")
  suspend fun addFollowerForUser(@PathVariable userId: UUID, @PathVariable followerId: UUID): ResponseEntity<Void> {
    userService.followOtherUser(userId, followerId)
    return ResponseEntity.ok().build()
  }

  @GetMapping("followers/{userId}")
  suspend fun getFollowers(@PathVariable userId: UUID): ResponseEntity<List<FollowerDto>> {
    return ResponseEntity(userService.getFollowers(userId), HttpStatus.OK)
  }

  @GetMapping("following/{userId}")
  suspend fun getFollowing(@PathVariable userId: UUID): ResponseEntity<List<FollowerDto>> {
    return ResponseEntity(userService.getFollowing(userId), HttpStatus.OK)
  }
}