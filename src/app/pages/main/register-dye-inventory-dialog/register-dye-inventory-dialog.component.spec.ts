import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDyeInventoryDialogComponent } from './register-dye-inventory-dialog.component';

describe('RegistroTinteDialogComponent', () => {
  let component: RegisterDyeInventoryDialogComponent;
  let fixture: ComponentFixture<RegisterDyeInventoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDyeInventoryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDyeInventoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
