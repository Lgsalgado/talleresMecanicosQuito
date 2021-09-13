import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuejaComponent } from './view-queja.component';

describe('ViewQuejaComponent', () => {
  let component: ViewQuejaComponent;
  let fixture: ComponentFixture<ViewQuejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuejaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
