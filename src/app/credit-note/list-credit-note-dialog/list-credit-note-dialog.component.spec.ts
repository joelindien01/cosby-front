import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreditNoteDialogComponent } from './list-credit-note-dialog.component';

describe('ListCreditNoteDialogComponent', () => {
  let component: ListCreditNoteDialogComponent;
  let fixture: ComponentFixture<ListCreditNoteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCreditNoteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreditNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
