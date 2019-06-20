import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShipComponent } from './view-ship.component';

describe('ViewShipComponent', () => {
  let component: ViewShipComponent;
  let fixture: ComponentFixture<ViewShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
