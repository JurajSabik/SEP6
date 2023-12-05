package com.sep6.infrastructureservices.rest.controllers

import com.sep6.infrastructureservices.persistence.services.FavoriteListPersistenceService
import io.github.oshai.kotlinlogging.KotlinLogging
import models.FavoriteItemList
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import services.FavoriteListService
import java.util.UUID


private val logger = KotlinLogging.logger {}
@RestController
@CrossOrigin(origins = ["http://localhost:4200",  "http://localhost:42185/"], allowCredentials = "true")
@RequestMapping("api/favorite-item-lists")
class FavoriteItemListController (private val favoriteItemRepo: FavoriteListPersistenceService) {
  private val favoriteItemListService: FavoriteListService = FavoriteListService(favoriteItemRepo)

  @GetMapping("/{listId}")
  suspend fun getFavoriteItemListById (@PathVariable listId: UUID) : ResponseEntity<FavoriteItemList> {
    return ResponseEntity(favoriteItemListService.getFavoriteItemListById(listId), HttpStatus.OK)
  }
  @PostMapping()
  suspend fun createFavoriteItemList (@RequestBody favoriteItemList: FavoriteItemList ) : ResponseEntity<UUID> {
    return ResponseEntity(favoriteItemListService.createFavoriteItemList(favoriteItemList),HttpStatus.CREATED)
  }

  @DeleteMapping("/{listId}")
  suspend fun deleteFavoriteItemList (@PathVariable listId: UUID) {
    favoriteItemListService.deleteFavoriteItemListById(listId)
  }

  @GetMapping("/user/{userId}")
  suspend fun getAllByUserId (@PathVariable userId: UUID): ResponseEntity<List<FavoriteItemList>> {
    return ResponseEntity(favoriteItemListService.getAllFavoriteItemListsByUserId(userId), HttpStatus.OK)
  }

  @PutMapping()
  suspend fun updateFavoriteItemList(@RequestBody favoriteItemList: FavoriteItemList) {
    favoriteItemListService.updateFavoriteItemList(favoriteItemList)
  }
}