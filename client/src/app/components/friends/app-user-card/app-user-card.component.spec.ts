import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserCardComponent } from './app-user-card.component';

describe('AppUserCardComponent', () => {
  let component: AppUserCardComponent;
  let fixture: ComponentFixture<AppUserCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppUserCardComponent]
    });
    fixture = TestBed.createComponent(AppUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
