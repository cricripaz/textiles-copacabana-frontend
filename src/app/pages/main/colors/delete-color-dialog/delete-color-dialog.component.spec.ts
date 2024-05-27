import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteColorDialogComponent } from './delete-color-dialog.component';

describe('DeleteColorDialogComponent', () => {
  let component: DeleteColorDialogComponent;
  let fixture: ComponentFixture<DeleteColorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteColorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
