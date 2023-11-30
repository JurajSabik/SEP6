import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteDialogComponentComponent } from './confirm-delete-dialog.component';

describe('ConfirmDeleteDialogComponentComponent', () => {
  let component: ConfirmDeleteDialogComponentComponent;
  let fixture: ComponentFixture<ConfirmDeleteDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteDialogComponentComponent]
    });
    fixture = TestBed.createComponent(ConfirmDeleteDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
