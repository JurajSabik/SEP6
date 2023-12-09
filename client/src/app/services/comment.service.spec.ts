import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {ReviewService} from "@services/review.service";
import {AppModule} from "../app.module";

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

