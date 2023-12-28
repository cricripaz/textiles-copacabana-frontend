import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTinteDialogComponent } from './registro-tinte-dialog.component';

describe('RegistroTinteDialogComponent', () => {
  let component: RegistroTinteDialogComponent;
  let fixture: ComponentFixture<RegistroTinteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroTinteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroTinteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
