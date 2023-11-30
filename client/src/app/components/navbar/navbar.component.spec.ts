import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavbarComponent} from './navbar.component';
import {AuthService} from 'src/app/services/auth.service';

const mockAuthService = {
  isLoggedIn: jasmine.createSpy('isLoggedIn')
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        {provide: AuthService, useValue: mockAuthService}
      ]
    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Here, add the new tests for the login states

  it('should display Login and Signup when not logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    // ... rest of the test
  });

  it('should display Logoff when logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    // ... rest of the test
  });
});
