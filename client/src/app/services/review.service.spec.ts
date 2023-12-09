import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {AppModule} from "../app.module";
import {ReviewService} from "@services/review.service";

describe('ReviewService', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(ReviewService, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(ReviewService);
    expect(fixture.point.componentInstance).toBeDefined()
  });
})

