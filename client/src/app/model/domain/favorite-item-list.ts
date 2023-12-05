import { Item } from "./item"

export interface FavoriteItemList {
  listId?: string,
  userId?: string,
  name?: string,
  type?: ListType,
  items: Item[],
  timestamp: Date
}

export enum ListType {
  MOVIE= 'MOVIE',
  STAR = 'STAR',
  TV_SERIES = 'TV_SERIES'
}
