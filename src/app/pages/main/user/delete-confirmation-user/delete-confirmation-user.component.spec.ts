import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationUserComponent } from './delete-confirmation-user.component';

describe('DeleteConfirmationUserComponent', () => {
  let component: DeleteConfirmationUserComponent;
  let fixture: ComponentFixture<DeleteConfirmationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmationUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
