package com.sep6.infrastructureservices.rest

import com.sep6.infrastructureservices.persistence.exceptions.ResourceNotFoundException
import com.sep6.infrastructureservices.persistence.services.UserPersistenceService
import dtos.FollowerDto
import models.User
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import services.UserService
import validators.exceptions.ValidationException
import java.util.*

@RestController
@RequestMapping("api/users")
class UserController(private val userRepo: UserPersistenceService) {
  private val userService: UserService = UserService(userRepo)

  @GetMapping("/{userId}")
  fun getUserById(@PathVariable userId: UUID): ResponseEntity<User> {
    try {
      val user = userRepo.getUserById(userId)
      return ResponseEntity.ok(user)
    } catch (e: ResourceNotFoundException) {
      throw ResponseStatusException(
        HttpStatus.NOT_FOUND, e.message
      )
    }
  }

  @PostMapping()
  fun createUser(@RequestBody user: User): ResponseEntity<User> {
    val createdUser = userService.createUser(user)
    return ResponseEntity(createdUser, HttpStatus.CREATED)
  }

  @PutMapping()
  fun updateUser(@RequestBody user: User): ResponseEntity<String> {
    try {
      userService.updateUser(user)
    } catch (e: ValidationException) {
      throw ResponseStatusException(
        HttpStatus.BAD_REQUEST, e.message
      )
    } catch (e: ResourceNotFoundException) {
      throw ResponseStatusException(
        HttpStatus.NOT_FOUND, e.message
      )
    }

    return ResponseEntity.ok().build()
  }

  @DeleteMapping("/{userId}")
  fun deleteUser(@PathVariable userId: UUID): ResponseEntity<Void> {
    try {
      userRepo.deleteUser(userId)
      return ResponseEntity.ok().build()
    } catch (e: ResourceNotFoundException) {
      throw ResponseStatusException(
        HttpStatus.NOT_FOUND, e.message
      )
    }
  }

  @PutMapping("follow/{userId}/{followerId}")
  fun addFollowerForUser(@PathVariable userId: UUID, @PathVariable followerId: UUID) {
    try {
      userService.followOtherUser(userId, followerId)
    } catch (e: ResourceNotFoundException) {
      throw ResponseStatusException(
        HttpStatus.NOT_FOUND, e.message
      )
    }
  }

  @GetMapping("followers/{userId}")
  fun getFollowers(@PathVariable userId: UUID): ResponseEntity<List<FollowerDto>> {
    try {
      return ResponseEntity(userService.getFollowers(userId), HttpStatus.OK)
    } catch (e: ResourceNotFoundException) {
      throw ResponseStatusException(
        HttpStatus.NOT_FOUND, e.message
      )
    }
  }

  @GetMapping("following/{userId}")
  fun getFollowing(@PathVariable userId: UUID): ResponseEntity<List<FollowerDto>> {
    try {
      return ResponseEntity(userService.getFollowing(userId), HttpStatus.OK)
    } catch (e: ResourceNotFoundException) {
      throw ResponseStatusException(
        HttpStatus.NOT_FOUND, e.message
      )
    }
  }
}