import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColorDialogComponent } from './edit-color-dialog.component';

describe('EditColorDialogComponent', () => {
  let component: EditColorDialogComponent;
  let fixture: ComponentFixture<EditColorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditColorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
