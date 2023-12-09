import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {AppModule} from "../../app.module";
import {UserHelperService} from "@services/helpers/user-helper.service";


describe('UserHelperService', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(UserHelperService, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(UserHelperService);
    expect(fixture.point.componentInstance).toBeDefined()
  });
})

