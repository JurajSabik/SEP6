import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFollowerDialogComponent } from './add-follower-dialog.component';

describe('AddFollowerDialogComponent', () => {
  let component: AddFollowerDialogComponent;
  let fixture: ComponentFixture<AddFollowerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFollowerDialogComponent]
    });
    fixture = TestBed.createComponent(AddFollowerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
