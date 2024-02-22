import { TestBed } from '@angular/core/testing';

import { CompartirDataService } from './compartir-data.service';

describe('CompartirDataService', () => {
  let service: CompartirDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompartirDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
