import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteListsComponent } from './favorite-item-lists.component';

describe('FavoriteItemListsComponent', () => {
  let component: FavoriteListsComponent;
  let fixture: ComponentFixture<FavoriteListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteListsComponent]
    });
    fixture = TestBed.createComponent(FavoriteListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
