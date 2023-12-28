import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTableTintesComponent } from './inventory-table-tintes.component';

describe('InventoryTableTintesComponent', () => {
  let component: InventoryTableTintesComponent;
  let fixture: ComponentFixture<InventoryTableTintesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryTableTintesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryTableTintesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
