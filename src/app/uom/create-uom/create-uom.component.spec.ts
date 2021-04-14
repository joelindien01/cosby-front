import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUomComponent } from './create-uom.component';

describe('CreateUomComponent', () => {
  let component: CreateUomComponent;
  let fixture: ComponentFixture<CreateUomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
