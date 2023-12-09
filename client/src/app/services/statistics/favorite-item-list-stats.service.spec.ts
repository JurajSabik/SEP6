import { TestBed } from '@angular/core/testing';
import {FavoriteListStatsService} from "@services/statistics/favorite-item-list-stats.service";
import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {AppModule} from "../../app.module";


describe('FavoriteListsStatsService', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(FavoriteListStatsService, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(FavoriteListStatsService);
    expect(fixture.point.componentInstance).toBeDefined()
  });
})

