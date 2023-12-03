import { TestBed } from '@angular/core/testing';

import { DynamiccomponentserviceService } from './dynamiccomponentservice.service';

describe('DynamiccomponentserviceService', () => {
  let service: DynamiccomponentserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamiccomponentserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
