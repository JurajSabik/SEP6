import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FavoriteItemList} from "@models/domain/favorite-item-list";

@Injectable({
  providedIn: 'root'
})
export class FavoriteItemListService {

  private apiUrl = 'http://localhost:8080/api/favorite-item-lists'; // Replace with your backend API URL

  constructor(private httpClient: HttpClient) {}

  getFavoriteItemListById(listId: string): Observable<FavoriteItemList> {
    return this.httpClient.get<FavoriteItemList>(`${this.apiUrl}/${listId}`);
  }

  createFavoriteItemList(favoriteItemList: FavoriteItemList): Observable<string> {
    return this.httpClient.post<string>(`${this.apiUrl}`, favoriteItemList);
  }

  deleteFavoriteItemList(listId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${listId}`);
  }

  getAllByUserId(userId: string): Observable<FavoriteItemList[]> {
    return this.httpClient.get<FavoriteItemList[]>(`${this.apiUrl}/user/${userId}`);
  }

  updateFavoriteItemList(favoriteItemList: FavoriteItemList): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}`, favoriteItemList);
  }
}
