import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaxmiComponent } from './laxmi.component';

describe('LaxmiComponent', () => {
  let component: LaxmiComponent;
  let fixture: ComponentFixture<LaxmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaxmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaxmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
