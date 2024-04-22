import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeightInventoryComponent } from './add-weight-inventory.component';

describe('AddWeightInventoryComponent', () => {
  let component: AddWeightInventoryComponent;
  let fixture: ComponentFixture<AddWeightInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWeightInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWeightInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
