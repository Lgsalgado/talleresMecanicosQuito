import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingQuejaComponent } from './pending-queja.component';

describe('PendingQuejaComponent', () => {
  let component: PendingQuejaComponent;
  let fixture: ComponentFixture<PendingQuejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingQuejaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
