import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaterialDialogComponent } from './edit-material-dialog.component';

describe('EditMaterialDialogComponent', () => {
  let component: EditMaterialDialogComponent;
  let fixture: ComponentFixture<EditMaterialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMaterialDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
