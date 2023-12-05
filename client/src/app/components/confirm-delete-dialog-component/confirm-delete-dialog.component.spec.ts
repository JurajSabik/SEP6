import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

describe('ConfirmDeleteDialogComponentComponent', () => {
  let component: ConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
