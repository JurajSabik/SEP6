import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRootComponent } from './review-root.component';

describe('ReviewRootComponent', () => {
  let component: ReviewRootComponent;
  let fixture: ComponentFixture<ReviewRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewRootComponent]
    });
    fixture = TestBed.createComponent(ReviewRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
