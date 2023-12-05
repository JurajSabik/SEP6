import { TestBed } from '@angular/core/testing';

import { FavoriteItemListService } from './favorite-item-list.service';

describe('FavoriteItemListService', () => {
  let service: FavoriteItemListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteItemListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
