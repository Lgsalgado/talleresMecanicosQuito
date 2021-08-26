import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerlistComponent } from './tallerlist.component';

describe('TallerlistComponent', () => {
  let component: TallerlistComponent;
  let fixture: ComponentFixture<TallerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TallerlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TallerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
