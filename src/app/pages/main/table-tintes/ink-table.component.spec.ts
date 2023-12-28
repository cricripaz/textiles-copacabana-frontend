import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InkTableComponent } from './ink-table.component';

describe('InkTableComponent', () => {
  let component: InkTableComponent;
  let fixture: ComponentFixture<InkTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InkTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
