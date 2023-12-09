import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { DomainUser } from '@models/domain/domain-user';
import { Follower } from '@models/domain/follower-dto';
import { GeneralUserData } from '@models/stats-dtos/general-user-data';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by id', () => {
    const mockUserId = '123';
    const mockUser: DomainUser = {
    };

    service.getUserById(mockUserId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne(`${service['userBaseUrl']}/${mockUserId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockUser);

    httpTestingController.verify();
  });

  it('should get user by username', () => {
    const mockUsername = 'testUser';
    const mockUser: DomainUser = {
    };

    service.getUserByUsername(mockUsername).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne(`${service['userBaseUrl']}/username/${mockUsername}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockUser);

    httpTestingController.verify();
  });

  it('should check if user exists', () => {
    const mockUsername = 'testUser';
    const mockResponse = true;

    service.doesUserExist(mockUsername).subscribe((exists) => {
      expect(exists).toBe(mockResponse);
    });

    const req = httpTestingController.expectOne(`${service['userBaseUrl']}/exists/${mockUsername}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);

    httpTestingController.verify();
  });

});
