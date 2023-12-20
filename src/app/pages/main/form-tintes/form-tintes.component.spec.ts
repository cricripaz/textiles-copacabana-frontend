import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTintesComponent } from './form-tintes.component';

describe('FormTintesComponent', () => {
  let component: FormTintesComponent;
  let fixture: ComponentFixture<FormTintesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTintesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTintesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
