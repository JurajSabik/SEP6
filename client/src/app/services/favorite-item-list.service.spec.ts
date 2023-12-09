import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {SignupComponent} from "@components/signup/signup.component";
import {AppModule} from "../app.module";
import {FavoriteItemListService} from "@services/favorite-item-list.service";

describe('FavoriteListsService', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(FavoriteItemListService, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(FavoriteItemListService);
    expect(fixture.point.componentInstance).toBeDefined()
  });
})


