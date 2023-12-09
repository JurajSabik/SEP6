import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListDashboardData} from "@models/stats-dtos/favorite-item-lists/list-dashboard-data";


@Injectable({
  providedIn: 'root',
})
export class FavoriteListStatsService {
  private baseUrl = 'http://localhost:8080'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getAllStatisticsData(userId: string): Observable<ListDashboardData> {
    const url = `${this.baseUrl}/api/favorite-item-lists/stats/all/${userId}`;
    return this.http.get<ListDashboardData>(url);
  }
}
