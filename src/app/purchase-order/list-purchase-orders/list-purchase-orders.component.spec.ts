import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPurchaseOrdersComponent } from './list-purchase-orders.component';

describe('ListPurchaseOrdersComponent', () => {
  let component: ListPurchaseOrdersComponent;
  let fixture: ComponentFixture<ListPurchaseOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPurchaseOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPurchaseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
