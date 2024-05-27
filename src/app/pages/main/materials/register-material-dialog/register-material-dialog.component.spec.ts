import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMaterialDialogComponent } from './register-material-dialog.component';

describe('RegisterMaterialDialogComponent', () => {
  let component: RegisterMaterialDialogComponent;
  let fixture: ComponentFixture<RegisterMaterialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterMaterialDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
