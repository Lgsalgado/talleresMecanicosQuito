import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedQuejaComponent } from './approved-queja.component';

describe('ApprovedQuejaComponent', () => {
  let component: ApprovedQuejaComponent;
  let fixture: ComponentFixture<ApprovedQuejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedQuejaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
