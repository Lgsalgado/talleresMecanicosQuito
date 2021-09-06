import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionlistComponent } from './promocionlist.component';

describe('PromocionlistComponent', () => {
  let component: PromocionlistComponent;
  let fixture: ComponentFixture<PromocionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromocionlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
