import { TestBed } from '@angular/core/testing';

import { DeliveryNoteService } from './delivery-note.service';

describe('DeliveryNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliveryNoteService = TestBed.get(DeliveryNoteService);
    expect(service).toBeTruthy();
  });
});
