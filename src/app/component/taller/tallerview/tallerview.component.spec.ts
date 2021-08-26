import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerviewComponent } from './tallerview.component';

describe('TallerviewComponent', () => {
  let component: TallerviewComponent;
  let fixture: ComponentFixture<TallerviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TallerviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TallerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
