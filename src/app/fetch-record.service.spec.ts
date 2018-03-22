import { TestBed, inject } from '@angular/core/testing';

import { FetchRecordService } from './fetch-record.service';

describe('FetchRecordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchRecordService]
    });
  });

  it('should be created', inject([FetchRecordService], (service: FetchRecordService) => {
    expect(service).toBeTruthy();
  }));
});
