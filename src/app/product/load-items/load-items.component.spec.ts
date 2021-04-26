import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadItemsComponent } from './load-items.component';

describe('LoadItemsComponent', () => {
  let component: LoadItemsComponent;
  let fixture: ComponentFixture<LoadItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
