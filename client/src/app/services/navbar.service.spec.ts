import { TestBed } from '@angular/core/testing';
import { NavbarService } from './navbar.service';
import { take } from 'rxjs/operators';

describe('NavbarService', () => {
  let service: NavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavbarService],
    });

    service = TestBed.inject(NavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit search expanded status', () => {
    const mockIsExpanded = true;

    service.setSearchExpanded(mockIsExpanded);

    service.searchExpanded$.pipe(take(1)).subscribe((isExpanded) => {
      expect(isExpanded).toBe(mockIsExpanded);
    });
  });
});

