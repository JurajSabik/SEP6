import { UserProfileComponent } from './user-profile.component';
import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {AppModule} from "../../app.module";
import {FavoriteListStatsService} from "@services/statistics/favorite-item-list-stats.service";

describe('UserProfileComponent', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(UserProfileComponent, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(UserProfileComponent);
    expect(fixture.point.componentInstance).toBeDefined()
  });
})

