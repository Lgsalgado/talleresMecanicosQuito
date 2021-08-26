import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedComponent } from './rejected.component';

describe('RejectedComponent', () => {
  let component: RejectedComponent;
  let fixture: ComponentFixture<RejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
