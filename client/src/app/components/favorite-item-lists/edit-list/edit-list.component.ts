// edit-list.component.ts

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FavoriteItemList, ListType} from '../../../model/domain/favorite-item-list';
import {FavoriteItemListService} from '../../../services/favorite-item-list.service';
import {SnackbarService} from '../../../services/snackbar.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css'],
})
export class EditListComponent implements OnInit {
  listId = '';
  list: FavoriteItemList | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private favoriteListService: FavoriteItemListService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.listId = params.get('listId') as string;
      this.refreshList();
    });
  }

  private refreshList(): void {
    if (this.listId !== undefined) {
      this.favoriteListService.getFavoriteItemListById(this.listId).subscribe({
        next: (list) => (this.list = list),
        error: (err) => {
          this.snackbarService.open('Error fetching list details.');
          console.error(err);
        },
      });
    }
  }

  removeItemFromList(item: any): void {
    if(this.list?.items.length as number > 1) {
      const indexToRemove = this.list?.items.findIndex(listItem => listItem.externalId === item.externalId);
      if (indexToRemove !== -1) {
        this.list?.items.splice(indexToRemove as number, 1);
      }
    } else {
      this.snackbarService.open("You cannot create/update an empty list.")
    }
  }

  async updateList(): Promise<void> {
    if(this.list !== null) {
      this.favoriteListService.updateFavoriteItemList(this.list).subscribe({
        next: () => {
          this.snackbarService.open("List updated successfully")
          this.router.navigate([`/favorite-item-list/${this.list?.userId}`])
        }
      })
    }
  }

  getIconForType(): string | undefined{
    switch (this.list?.type) {
      case ListType.TV_SERIES: return 'tv';
      case ListType.MOVIE: return 'movie';
      case ListType.STAR: return 'star';
    }
    return undefined;
  }
}

