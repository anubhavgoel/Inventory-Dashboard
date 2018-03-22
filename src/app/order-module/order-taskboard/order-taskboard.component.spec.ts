import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTaskboardComponent } from './order-taskboard.component';

describe('OrderTaskboardComponent', () => {
  let component: OrderTaskboardComponent;
  let fixture: ComponentFixture<OrderTaskboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTaskboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTaskboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
