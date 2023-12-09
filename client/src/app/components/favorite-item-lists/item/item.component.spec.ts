import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { TmdbService } from '../../../services/tmdb.service';
import { ListType } from '../../../model/domain/favorite-item-list';
import { of } from 'rxjs';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TmdbService>;

  beforeEach(() => {
    tmdbServiceSpy = jasmine.createSpyObj('TmdbService', ['getActorDetails', 'getDetails']);

    TestBed.configureTestingModule({
      declarations: [ItemComponent],
      providers: [
        { provide: TmdbService, useValue: tmdbServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

