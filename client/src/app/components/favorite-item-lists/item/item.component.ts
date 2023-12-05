
import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../model/domain/item";
import {TmdbService} from "../../../services/tmdb.service";
import {ListType} from "../../../model/domain/favorite-item-list";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{

  @Input() item: Item | undefined;
  @Input() type: ListType | undefined;
  itemFromTmdb: any | undefined;
  constructor(private itemService: TmdbService) {
  }

  ngOnInit(): void {
    if(this.item !== undefined && this.type !== undefined){
      if(this.type === "STAR"){
        this.itemService.getActorDetails(this.item.externalId).subscribe({
           next: (tmdbItem) => this.itemFromTmdb = tmdbItem,
           error: (err) => console.error(err)
        })
      }
       else if(this.type === "MOVIE"){
        this.itemService.getDetails('movie',this.item.externalId).subscribe({
          next: (tmdbItem) => this.itemFromTmdb = tmdbItem,
          error: (err) => console.error(err)
        })
      }  else if(this.type === "TV_SERIES"){
        this.itemService.getDetails('tv',this.item.externalId).subscribe({
          next: (tmdbItem) => this.itemFromTmdb = tmdbItem,
          error: (err) => console.error(err)
        })
      }
    }

  }

  protected readonly ListType = ListType;
}
