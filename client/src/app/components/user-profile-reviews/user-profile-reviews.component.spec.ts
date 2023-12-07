import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileReviewsComponent } from './user-profile-reviews.component';

describe('UserProfileReviewsComponent', () => {
  let component: UserProfileReviewsComponent;
  let fixture: ComponentFixture<UserProfileReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileReviewsComponent]
    });
    fixture = TestBed.createComponent(UserProfileReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
