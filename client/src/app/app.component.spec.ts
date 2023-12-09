import {AppComponent} from './app.component';
import {AppModule} from "./app.module";
import {MockBuilder, MockInstance, MockRender} from "ng-mocks";

describe('TMDB', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(AppComponent, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(AppComponent);
    expect(fixture.point.componentInstance).toBeDefined()
  });
})

