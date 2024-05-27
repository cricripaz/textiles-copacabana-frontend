import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterColorDialogComponent } from './register-color-dialog.component';

describe('RegisterColorDialogComponent', () => {
  let component: RegisterColorDialogComponent;
  let fixture: ComponentFixture<RegisterColorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterColorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
