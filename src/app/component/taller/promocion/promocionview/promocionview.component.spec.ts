import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionviewComponent } from './promocionview.component';

describe('PromocionviewComponent', () => {
  let component: PromocionviewComponent;
  let fixture: ComponentFixture<PromocionviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromocionviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
