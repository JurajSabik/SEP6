import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {AppModule} from "../../../app.module";
import {AppUserCardComponent} from "@components/friends/app-user-card/app-user-card.component";

describe('AppUserCardComponent', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(AppUserCardComponent, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(AppUserCardComponent);
    expect(fixture.point.componentInstance).toBeDefined()
  });
});

