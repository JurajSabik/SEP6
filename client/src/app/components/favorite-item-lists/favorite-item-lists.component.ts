import {Component, HostListener, OnInit} from '@angular/core';
import {FavoriteItemList, ListType} from "@models/domain/favorite-item-list";
import {FavoriteItemListService} from "@services/favorite-item-list.service";
import {UserHelperService} from "@services/helpers/user-helper.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {SnackbarService} from "@services/snackbar.service";
import {Item} from "@models/domain/item";
import {DomainUser} from "@models/domain/domain-user";
import {UserService} from "@services/user.service";

@Component({
  selector: 'app-favorite-lists',
  templateUrl: './favorite-item-lists.component.html',
  styleUrls: ['./favorite-item-lists.component.css']
})
export class FavoriteListsComponent implements OnInit {
  currentUserId = '';
  currentUserUsername = '';
  selectedList: FavoriteItemList | null = null;
  favoriteListsSubject = new BehaviorSubject<FavoriteItemList[]>([]);
  favoriteLists$: Observable<FavoriteItemList[]> = this.favoriteListsSubject.asObservable();
  contextMenuPosition: { x: number, y: number } | null = null;
  selectedContextMenuList: FavoriteItemList | null = null;
  currentDomainUser: DomainUser | undefined;
  constructor(private favoriteListService: FavoriteItemListService,
              private router: Router,
              private route: ActivatedRoute,
              private snackbarService: SnackbarService,
              private userHelperService: UserHelperService,
              private userService: UserService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.currentUserId = params.get('userId') as string;
    });
    this.currentDomainUser  = await this.userHelperService.fetchDomainUser()
    this.userService.getUserById(this.currentUserId).subscribe( {
      next: user => {
        this.currentUserUsername = user.username as string
      }
    });
    this.refreshLists();
  }

  selectList(list: FavoriteItemList | null): void {
    this.selectedList = list;
  }

  protected readonly ListType = ListType;

  async selectItem(item: Item) {
    let itemTypeRoute: 'actor' | 'movie' | 'tv' = 'movie'
    switch (this.selectedList?.type){
      case ListType.STAR:itemTypeRoute = 'actor'; break;
      case ListType.MOVIE: itemTypeRoute = 'movie'; break;
      case ListType.TV_SERIES: itemTypeRoute = 'tv'; break;
    }
    await this.router.navigate([`${itemTypeRoute}/${item.externalId}`])
  }

  private refreshLists(): void {
    if (this.currentUserId !== undefined) {
      this.favoriteListService.getAllByUserId(this.currentUserId).subscribe({
        next: (list) => {
          this.favoriteListsSubject.next(list);
          this.checkIfEmpty(list);
        },
        error: (err) => {
          this.snackbarService.open("Something went wrong when fetching your lists. Try refreshing.")
          console.error(err)
        }
      })
    }

  }

  private checkIfEmpty(list: FavoriteItemList[]) {
    if (list.length === 0) {
      this.snackbarService.open(`There are no lists to be displayed.`, 8000)
    }
  }

  async goToCreateLists() {
    await this.router.navigate([`/create-list/${this.currentUserId}`])
  }

  onContextMenu(event: MouseEvent, list: FavoriteItemList): void {
    event.preventDefault();
    this.selectedList?.timestamp.getTime()
    this.contextMenuPosition = {x: event.clientX, y: event.clientY};
    this.selectedContextMenuList = list;
  }

  deleteList(list: FavoriteItemList | null): void {
    this.favoriteListService.deleteFavoriteItemList(list?.listId as string).subscribe({
      next: () => {
        this.refreshLists();
        this.snackbarService.open('List deleted successfully.');
      },
      error: (err) => {
        console.error(err);
        this.snackbarService.open('Error deleting list.');
      }
    })
    this.contextMenuPosition = null;
    this.selectedContextMenuList = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(): void {
    this.contextMenuPosition = null;
    this.selectedContextMenuList = null;
  }

  async goToEditList(selectedContextMenuList: FavoriteItemList | null) {
    if(selectedContextMenuList !== null){
        await this.router.navigate([`/edit-list/${selectedContextMenuList.listId}`])
    }
  }

  isCurrentDomainUser(): boolean {
    return this.currentDomainUser?.userId === this.currentUserId;
  }
}
