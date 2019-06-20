import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeliveryNoteComponent } from './view-delivery-note.component';

describe('ViewDeliveryNoteComponent', () => {
  let component: ViewDeliveryNoteComponent;
  let fixture: ComponentFixture<ViewDeliveryNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDeliveryNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeliveryNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
