import { FriendsComponent } from './friends.component';
import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {AppModule} from "../../app.module";


describe('FriendsComponent', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(FriendsComponent, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(FriendsComponent);
    expect(fixture.point.componentInstance).toBeDefined()
  });


});

