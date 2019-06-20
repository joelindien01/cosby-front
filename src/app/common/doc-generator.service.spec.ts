import { TestBed } from '@angular/core/testing';

import { DocGeneratorService } from './doc-generator.service';

describe('DocGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocGeneratorService = TestBed.get(DocGeneratorService);
    expect(service).toBeTruthy();
  });
});
