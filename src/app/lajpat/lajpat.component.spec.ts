import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LajpatComponent } from './lajpat.component';

describe('LajpatComponent', () => {
  let component: LajpatComponent;
  let fixture: ComponentFixture<LajpatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LajpatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LajpatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
