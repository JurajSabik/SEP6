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
  suspend fun getUserById(@PathVariable userId: UUID): ResponseEntity<User> {
    return try {
      val user = userRepo.getUserById(userId)
      ResponseEntity.ok(user)
    } catch (e: ResourceNotFoundException) {
      ResponseEntity.notFound().build()
    }
  }

  @PostMapping()
  suspend fun createUser(@RequestBody user: User): ResponseEntity<User> {
    val createdUser = userService.createUser(user)
    return ResponseEntity(createdUser, HttpStatus.CREATED)
  }

  @PutMapping()
  suspend fun updateUser(@RequestBody user: User): ResponseEntity<String> {
    return try {
      userService.updateUser(user)
      ResponseEntity.ok().build()
    } catch (e: ValidationException) {
      ResponseEntity.badRequest().build()
    } catch (e: ResourceNotFoundException) {
      ResponseEntity.notFound().build()
    }
  }

  @DeleteMapping("/{userId}")
  suspend fun deleteUser(@PathVariable userId: UUID): ResponseEntity<Void> {
    return try {
      userRepo.deleteUser(userId)
      ResponseEntity.ok().build()
    } catch (e: ResourceNotFoundException) {
      ResponseEntity.notFound().build()
    }
  }

  @PutMapping("follow/{userId}/{followerId}")
  suspend fun addFollowerForUser(@PathVariable userId: UUID, @PathVariable followerId: UUID): ResponseEntity<Void> {
    return try {
      userService.followOtherUser(userId, followerId)
      ResponseEntity.ok().build()
    } catch (e: ResourceNotFoundException) {
      ResponseEntity.notFound().build()
    }
  }

  @GetMapping("followers/{userId}")
  suspend fun getFollowers(@PathVariable userId: UUID): ResponseEntity<List<FollowerDto>> {
    return try {
      ResponseEntity(userService.getFollowers(userId), HttpStatus.OK)
    } catch (e: ResourceNotFoundException) {
      ResponseEntity.notFound().build()
    }
  }

  @GetMapping("following/{userId}")
  suspend fun getFollowing(@PathVariable userId: UUID): ResponseEntity<List<FollowerDto>> {
    return try {
      ResponseEntity(userService.getFollowing(userId), HttpStatus.OK)
    } catch (e: ResourceNotFoundException) {
      ResponseEntity.notFound().build()
    }
  }
}