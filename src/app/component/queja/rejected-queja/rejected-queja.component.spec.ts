import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedQuejaComponent } from './rejected-queja.component';

describe('RejectedQuejaComponent', () => {
  let component: RejectedQuejaComponent;
  let fixture: ComponentFixture<RejectedQuejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedQuejaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
