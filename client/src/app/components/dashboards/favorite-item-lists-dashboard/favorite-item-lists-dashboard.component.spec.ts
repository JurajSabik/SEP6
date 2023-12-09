import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteItemListsDashboardComponent } from './favorite-item-lists-dashboard.component';

describe('FavoriteItemListsDashboardComponent', () => {
  let component: FavoriteItemListsDashboardComponent;
  let fixture: ComponentFixture<FavoriteItemListsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteItemListsDashboardComponent]
    });
    fixture = TestBed.createComponent(FavoriteItemListsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
