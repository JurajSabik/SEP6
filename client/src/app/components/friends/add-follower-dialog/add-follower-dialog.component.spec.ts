import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {AddFollowerDialogComponent} from "@components/friends/add-follower-dialog/add-follower-dialog.component";
import {AppModule} from "../../../app.module";
import {AppUserCardComponent} from "@components/friends/app-user-card/app-user-card.component";

describe('AddFollowerDialogComponent', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(AddFollowerDialogComponent, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(AppUserCardComponent);
    expect(fixture.point.componentInstance).toBeDefined()
  });
})

