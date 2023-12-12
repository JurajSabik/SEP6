package com.sep6.infrastructureservices.rest.controllers

import com.sep6.infrastructureservices.persistence.services.FavoriteListPersistenceService
import com.sep6.infrastructureservices.rest.controllers.dtos.DashboardData
import org.springframework.web.bind.annotation.*
import services.FavoriteListStatsService
import java.util.UUID



@RestController
@CrossOrigin(origins = ["http://localhost:4200",  "http://localhost:42185/", "http://20.105.24.162"], allowCredentials = "true")
@RequestMapping("api/favorite-item-lists/stats")
class FavoriteItemListDashboardDataController(private val favoriteItemRepo: FavoriteListPersistenceService) {
  private val favoriteListStatsService: FavoriteListStatsService = FavoriteListStatsService(favoriteItemRepo)

  @GetMapping("/all/{userId}")
  suspend fun getAllStatisticsData(@PathVariable userId: UUID): DashboardData {
    return DashboardData(
      favoriteListStatsService.getListTypeBarChartData(userId),
      favoriteListStatsService.createTimeSeriesData(userId),
      favoriteListStatsService.createListItemCountChart(userId)
    )
  }

}