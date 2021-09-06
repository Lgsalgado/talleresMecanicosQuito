import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmechComponent } from './viewmech.component';

describe('ViewmechComponent', () => {
  let component: ViewmechComponent;
  let fixture: ComponentFixture<ViewmechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
