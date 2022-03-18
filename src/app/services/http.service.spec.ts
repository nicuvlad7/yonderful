import { TestBed } from '@angular/core/testing';

import * as baseService from './base.service';

describe('BaseService', () => {
  let service: baseService.BaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(baseService.BaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
