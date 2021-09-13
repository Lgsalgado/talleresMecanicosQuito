import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProinactiveComponent } from './proinactive.component';

describe('ProinactiveComponent', () => {
  let component: ProinactiveComponent;
  let fixture: ComponentFixture<ProinactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProinactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProinactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
