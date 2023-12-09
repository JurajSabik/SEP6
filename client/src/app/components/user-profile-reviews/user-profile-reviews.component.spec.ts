import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {UserProfileComponent} from "@components/user-profile/user-profile.component";
import {AppModule} from "../../app.module";
import {UserProfileReviewsComponent} from "@components/user-profile-reviews/user-profile-reviews.component";
describe('UserProfileReviewsComponent', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(UserProfileReviewsComponent, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(UserProfileComponent);
    expect(fixture.point.componentInstance).toBeDefined()
  });
})

