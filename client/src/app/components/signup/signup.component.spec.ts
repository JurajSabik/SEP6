import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignupComponent} from './signup.component';
import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {AppModule} from "../../app.module";

describe('SignupComponent', () => {
  MockInstance.scope();

  beforeEach(() => {
    return MockBuilder(SignupComponent, AppModule);
  });

  it('should create', () => {
    const fixture = MockRender(SignupComponent);
    expect(fixture.point.componentInstance).toBeDefined()
  });
})

