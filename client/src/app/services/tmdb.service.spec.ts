import {TmdbService} from './tmdb.service';
import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {AppModule} from "../app.module";

describe('TMDB', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(TmdbService, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(TmdbService);
    expect(fixture.point.componentInstance).toBeDefined()
  });
})

