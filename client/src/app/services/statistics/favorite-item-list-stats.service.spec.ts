import { TestBed } from '@angular/core/testing';

import { FavoriteItemListStatsService } from './favorite-item-list-stats.service';

describe('FavoriteItemListStatsService', () => {
  let service: FavoriteItemListStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteItemListStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
