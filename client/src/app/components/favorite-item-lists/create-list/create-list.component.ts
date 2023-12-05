// create-list.component.ts

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FavoriteItemList, ListType} from "../../../model/domain/favorite-item-list";
import {TmdbService} from "../../../services/tmdb.service";
import {Item} from "../../../model/domain/item";
import {FavoriteItemListService} from "../../../services/favorite-item-list.service";
import {SnackbarService} from "../../../services/snackbar.service";


@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
  newListName = '';
  newListType: ListType = ListType.MOVIE;
  listTypeArray: String[] = [ListType[ListType.MOVIE], ListType[ListType.STAR], ListType[ListType.TV_SERIES]]
  searchQuery = '';
  filteredItems: any[] = [];
  createdList: any[] = []
  userId: string  | undefined | null;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private itemService: TmdbService,
              private favoriteItemListService: FavoriteItemListService,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId');
    });
  }

  addItemToList(item: any): void {
    this.createdList.push(item)
  }

  async onSubmit(): Promise<void> {
    if(this.createdList.length === 0){
      this.snackbarService.open("Cannot create empty list");
      return ;
    }

    if(this.newListName === '') {
      this.snackbarService.open("Cannot create list with no name");
      return ;
    }
    const items: Item[] = this.createdList.map(item => ({ externalId: item.id}) as Item)
    const itemList: FavoriteItemList = {
      userId: this.userId as string,
      name: this.newListName,
      items: items,
      type: this.newListType,
      timestamp: new Date()
    }

    this.favoriteItemListService.createFavoriteItemList(itemList).subscribe(
      {
        next: async () => {
          this.snackbarService.open("List added successfully.")
          await this.router.navigate([`/favorite-item-list/${this.userId}`]);
        },
        error: (err) => {
          console.log(err)
          this.snackbarService.open("Error happened while adding list.")
        }
      }
    )
  }

  search() {
    let searchItemType: 'movie' | 'person' | 'tv' = 'movie'
    if (this.newListType === "STAR") {
      searchItemType = 'person'
    }
    if(this.newListType === 'TV_SERIES') {
      searchItemType = 'tv'
    }

    this.itemService.search(this.searchQuery, searchItemType).subscribe(results => {
      this.filteredItems = results.results;
    }, error => {
      console.error('Error during search:', error);
    });
  }

  removeItemFromList(item: any) {
    const indexToRemove = this.createdList.findIndex(createdItem => createdItem.id === item.id);

    if (indexToRemove !== -1) {
      this.createdList.splice(indexToRemove, 1);
    }
  }
}
