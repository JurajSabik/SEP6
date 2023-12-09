import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchBarComponent} from './search-bar.component';
import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {AppModule} from "../../app.module";

describe('SearchBarComponent', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(SearchBarComponent, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(SearchBarComponent);
    expect(fixture.point.componentInstance).toBeDefined()
  });
})
