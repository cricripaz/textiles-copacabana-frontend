import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsOrdersComponent } from './cards-orders.component';

describe('CardsOrdersComponent', () => {
  let component: CardsOrdersComponent;
  let fixture: ComponentFixture<CardsOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
