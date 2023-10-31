import { TestBed } from '@angular/core/testing';

import { SchoolsDataService } from './schools-data.service';

describe('SchoolsDataService', () => {
  let service: SchoolsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
