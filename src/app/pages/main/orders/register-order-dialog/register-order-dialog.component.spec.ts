import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOrderDialogComponent } from './register-order-dialog.component';

describe('RegisterOrderDialogComponent', () => {
  let component: RegisterOrderDialogComponent;
  let fixture: ComponentFixture<RegisterOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterOrderDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
