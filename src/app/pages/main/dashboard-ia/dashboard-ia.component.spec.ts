import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIaComponent } from './dashboard-ia.component';

describe('DashboardIaComponent', () => {
  let component: DashboardIaComponent;
  let fixture: ComponentFixture<DashboardIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardIaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
